import React, { useState, useRef } from 'react';
import { Upload, DollarSign, TrendingUp, PieChart, Target, Plus, FileText, BarChart3, Edit3, Check, X, Trash2 } from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Pie } from 'recharts';
import Papa from 'papaparse';
// Claude API service integrated directly
const analyzeExpenses = async (expenses) => {
  console.log('🚀 Calling proxy server...');
  
  try {
    const response = await fetch("http://localhost:3001/api/analyze-expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expenses })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Proxy request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Got response from proxy!');
    return data;
    
  } catch (error) {
    console.error('Error calling proxy:', error);
    throw error;
  }
};

const PersonalFinanceAdvisor = () => {
  const [expenses, setExpenses] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('input');
  const [manualExpense, setManualExpense] = useState({ description: '', amount: '', category: '', date: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempCategory, setTempCategory] = useState('');
  const [processingFile, setProcessingFile] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, index: null, expense: null });
  const fileInputRef = useRef(null);

  // Sample data for demo
  const sampleExpenses = [
    { description: 'Grocery Store', amount: 85.50, category: 'Food & Dining', date: '2025-08-25' },
    { description: 'Gas Station', amount: 45.00, category: 'Transportation', date: '2025-08-24' },
    { description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', date: '2025-08-20' },
    { description: 'Electricity Bill', amount: 120.00, category: 'Utilities', date: '2025-08-22' },
    { description: 'Coffee Shop', amount: 12.50, category: 'Food & Dining', date: '2025-08-26' },
    { description: 'Amazon Purchase', amount: 67.89, category: 'Shopping', date: '2025-08-23' },
  ];

  const availableCategories = [
    'Food & Dining',
    'Transportation', 
    'Entertainment',
    'Utilities',
    'Shopping',
    'Healthcare',
    'Banking Fees',
    'Education',
    'Housing',
    'Insurance',
    'Other'
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #e1bee7 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    maxWidth: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1.2rem'
    },
    tabContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px'
    },
    tabNav: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '4px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
    },
    tab: {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '4px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s',
      backgroundColor: 'transparent',
      color: '#6b7280'
    },
    activeTab: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      padding: '30px',
      marginBottom: '20px'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    uploadArea: {
      border: '2px dashed #cbd5e1',
      borderRadius: '12px',
      padding: '40px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s',
      backgroundColor: '#f8fafc'
    },
    button: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.3s',
      fontSize: '16px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '16px',
      marginBottom: '15px',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '20px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px',
      marginBottom: '30px'
    },
    statCard: {
      padding: '20px',
      borderRadius: '12px',
      textAlign: 'center',
      border: '2px solid'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginTop: '5px'
    },
    analysisButton: {
      width: '100%',
      padding: '15px',
      fontSize: '18px',
      fontWeight: '600',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      color: 'white'
    },
    analysisButtonDisabled: {
      background: '#9ca3af',
      cursor: 'not-allowed'
    },
    aiAdvice: {
      background: 'linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%)',
      padding: '30px',
      borderRadius: '12px',
      borderLeft: '4px solid #3b82f6'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px'
    },
    th: {
      padding: '15px 12px',
      textAlign: 'left',
      borderBottom: '2px solid #e5e7eb',
      fontWeight: '600',
      backgroundColor: '#f9fafb',
      color: '#374151'
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #f3f4f6'
    },
    badge: {
      padding: '6px 12px',
      backgroundColor: '#f3f4f6',
      borderRadius: '20px',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px'
    },
    editableBadge: {
      cursor: 'pointer',
      backgroundColor: '#e0f2fe',
      border: '1px solid #0369a1'
    },
    editInput: {
      padding: '4px 8px',
      fontSize: '0.875rem',
      border: '1px solid #3b82f6',
      borderRadius: '4px',
      width: '150px'
    },
    editButtons: {
      display: 'flex',
      gap: '5px',
      marginLeft: '5px'
    },
    editButton: {
      padding: '2px 6px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px'
    },
    processingOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    processingCard: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '16px',
      textAlign: 'center',
      maxWidth: '400px'
    },
    confirmationOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    confirmationCard: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '16px',
      textAlign: 'center',
      maxWidth: '450px',
      margin: '20px'
    },
    confirmationTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#dc2626',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    },
    confirmationText: {
      color: '#6b7280',
      marginBottom: '20px',
      lineHeight: '1.6'
    },
    expenseDetails: {
      backgroundColor: '#f9fafb',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '20px',
      textAlign: 'left'
    },
    confirmationButtons: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center'
    },
    confirmButton: {
      backgroundColor: '#dc2626',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '16px'
    },
    cancelButton: {
      backgroundColor: '#6b7280',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '16px'
    },
    deleteButton: {
      backgroundColor: '#dc2626',
      color: 'white',
      padding: '6px 10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }
  };

  // Smart categorization function
  const categorizeMerchant = (description) => {
    const desc = description.toLowerCase();
    
    if (desc.includes('falabella') || desc.includes('paris') || desc.includes('ripley')) return 'Shopping';
    if (desc.includes('mercadopago') || desc.includes('merpago')) return 'Shopping';
    if (desc.includes('cinepolis') || desc.includes('cine')) return 'Entertainment';
    if (desc.includes('saba') || desc.includes('parking') || desc.includes('uber') || desc.includes('taxi')) return 'Transportation';
    if (desc.includes('verde') || desc.includes('totem') || desc.includes('auto') || desc.includes('bencinera')) return 'Transportation';
    if (desc.includes('pronto') || desc.includes('restaurant') || desc.includes('cafe') || desc.includes('food')) return 'Food & Dining';
    if (desc.includes('salcobrand') || desc.includes('farmacia') || desc.includes('clinica') || desc.includes('hospital')) return 'Healthcare';
    if (desc.includes('movistar') || desc.includes('entel') || desc.includes('claro') || desc.includes('wom')) return 'Utilities';
    if (desc.includes('comision') || desc.includes('cargo') || desc.includes('impuesto') || desc.includes('interes')) return 'Banking Fees';
    if (desc.includes('seguros') || desc.includes('seguro')) return 'Insurance';
    if (desc.includes('universidad') || desc.includes('instituto') || desc.includes('curso')) return 'Education';
    if (desc.includes('arriendo') || desc.includes('rent') || desc.includes('condominio')) return 'Housing';
    
    return 'Other';
  };

  // Process Excel file
  const processExcelFile = async (file) => {
    setProcessingFile(true);
    
    try {
      // Dynamically import xlsx
      const XLSX = await import('xlsx');
      
      const fileContent = await file.arrayBuffer();
      const workbook = XLSX.read(fileContent, {
        cellStyles: true,
        cellFormulas: true,
        cellDates: true
      });
      
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Find transaction data (starts around row 18 for Banco de Chile format)
      const transactions = [];
      
      for (let i = 17; i < jsonData.length; i++) {
        const row = jsonData[i];
        
        if (row && row.length >= 7 && row[2] && row[3] && row[7]) {
          let date = row[2];
          
          // Convert date format
          if (typeof date === 'string' && date.includes('/')) {
            const [day, month, year] = date.split('/');
            date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
          }
          
          const transaction = {
            description: row[3],
            amount: parseFloat(row[7]) || 0,
            category: categorizeMerchant(row[3]),
            date: date,
            originalCategory: row[1] || 'N/A'
          };
          
          if (transaction.amount > 0) {
            transactions.push(transaction);
          }
        }
      }
      
      setExpenses(transactions);
      setActiveTab('review');
      
    } catch (error) {
      console.error('Error processing Excel file:', error);
      alert('Error processing Excel file. Please make sure it\'s a valid Banco de Chile statement.');
    } finally {
      setProcessingFile(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (fileExtension === 'csv') {
      // Handle CSV files
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          const processedExpenses = results.data.map(row => ({
            description: row.description || row.Description || '',
            amount: parseFloat(row.amount || row.Amount || 0),
            category: row.category || row.Category || 'Uncategorized',
            date: row.date || row.Date || new Date().toISOString().split('T')[0]
          })).filter(expense => expense.amount > 0);
          
          setExpenses(processedExpenses);
          setActiveTab('analysis');
        },
        error: (error) => {
          alert('Error parsing CSV file: ' + error.message);
        }
      });
    } else if (fileExtension === 'xls' || fileExtension === 'xlsx') {
      // Handle Excel files
      processExcelFile(file);
    } else {
      alert('Please upload a CSV or Excel file (.csv, .xls, .xlsx)');
    }
  };

  const addManualExpense = () => {
    if (manualExpense.description && manualExpense.amount && manualExpense.date) {
      const newExpense = {
        ...manualExpense,
        amount: parseFloat(manualExpense.amount)
      };
      setExpenses([...expenses, newExpense]);
      setManualExpense({ description: '', amount: '', category: '', date: '' });
    }
  };

  const loadSampleData = () => {
    setExpenses(sampleExpenses);
    setActiveTab('analysis');
  };

  const analyzeFinances = async () => {
    if (expenses.length === 0) return;
    
    setLoading(true);
    try {
      const analysisResult = await analyzeExpenses(expenses);
      setAnalysis(analysisResult);
    } catch (error) {
      console.error('Error analyzing finances:', error);
      
      if (error.message.includes('API key')) {
        alert('Please add your Claude API key to the .env file');
      } else if (error.message.includes('429')) {
        alert('Rate limit exceeded. Please try again in a moment.');
      } else {
        alert('Error analyzing your finances. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (index, currentCategory) => {
    setEditingIndex(index);
    setTempCategory(currentCategory);
  };

  const saveCategory = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index].category = tempCategory;
    setExpenses(updatedExpenses);
    setEditingIndex(null);
    setTempCategory('');
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setTempCategory('');
  };

  const showDeleteConfirmation = (index) => {
    setDeleteConfirmation({
      show: true,
      index,
      expense: expenses[index]
    });
  };

  const hideDeleteConfirmation = () => {
    setDeleteConfirmation({ show: false, index: null, expense: null });
  };

  const confirmDelete = () => {
    const updatedExpenses = expenses.filter((_, index) => index !== deleteConfirmation.index);
    setExpenses(updatedExpenses);
    hideDeleteConfirmation();
    
    // If no expenses left, go back to input tab
    if (updatedExpenses.length === 0) {
      setActiveTab('input');
      setAnalysis(null);
    }
  };

  const categoryColors = {
    'Food & Dining': '#ef4444',
    'Transportation': '#06b6d4',
    'Entertainment': '#3b82f6',
    'Utilities': '#10b981',
    'Shopping': '#f59e0b',
    'Healthcare': '#8b5cf6',
    'Banking Fees': '#dc2626',
    'Education': '#059669',
    'Housing': '#7c3aed',
    'Insurance': '#db2777',
    'Other': '#6b7280'
  };

  const pieChartData = analysis ? Object.entries(analysis.categoryBreakdown).map(([category, amount]) => ({
    name: category,
    value: amount,
    color: categoryColors[category] || '#6b7280'
  })) : [];

  const barChartData = analysis ? analysis.topCategories.map(([category, amount]) => ({
    category,
    amount,
    percentage: ((amount / analysis.totalSpending) * 100).toFixed(1)
  })) : [];

  return (
    <div style={styles.container}>
       <a 
      href="http://localhost:3000"
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        background: 'rgba(59, 130, 246, 0.2)',
        color: '#60a5fa',
        padding: '10px 20px',
        borderRadius: '8px',
        textDecoration: 'none',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        zIndex: 1000,
        fontSize: '14px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s ease'
      }}
    >
      ← Back to Portfolio
    </a>
      {processingFile && (
        <div style={styles.processingOverlay}>
          <div style={styles.processingCard}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              border: '4px solid #f3f3f3', 
              borderTop: '4px solid #3b82f6', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <h3 style={{ color: '#1f2937', marginBottom: '10px' }}>Processing Excel File</h3>
            <p style={{ color: '#6b7280' }}>Extracting and categorizing your transactions...</p>
          </div>
        </div>
      )}

      {deleteConfirmation.show && (
        <div style={styles.confirmationOverlay}>
          <div style={styles.confirmationCard}>
            <h3 style={styles.confirmationTitle}>
              <Trash2 size={24} />
              Delete Transaction
            </h3>
            <p style={styles.confirmationText}>
              Are you sure you want to delete this transaction? This action cannot be undone.
            </p>
            {deleteConfirmation.expense && (
              <div style={styles.expenseDetails}>
                <p><strong>Date:</strong> {deleteConfirmation.expense.date}</p>
                <p><strong>Description:</strong> {deleteConfirmation.expense.description}</p>
                <p><strong>Amount:</strong> ${deleteConfirmation.expense.amount.toLocaleString()}</p>
                <p><strong>Category:</strong> {deleteConfirmation.expense.category}</p>
              </div>
            )}
            <div style={styles.confirmationButtons}>
              <button
                onClick={confirmDelete}
                style={styles.confirmButton}
              >
                <Trash2 size={16} style={{ marginRight: '8px' }} />
                Delete
              </button>
              <button
                onClick={hideDeleteConfirmation}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            <DollarSign color="#10b981" size={40} />
            AI Personal Finance Advisor
          </h1>
          <p style={styles.subtitle}>Upload your bank statement and get personalized financial insights</p>
        </div>

        {/* Tab Navigation */}
        <div style={styles.tabContainer}>
          <div style={styles.tabNav}>
            <button
              onClick={() => setActiveTab('input')}
              style={{
                ...styles.tab,
                ...(activeTab === 'input' ? styles.activeTab : {})
              }}
            >
              Input Data
            </button>
            <button
              onClick={() => setActiveTab('review')}
              style={{
                ...styles.tab,
                ...(activeTab === 'review' ? styles.activeTab : {}),
                ...(expenses.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {})
              }}
              disabled={expenses.length === 0}
            >
              Review & Edit
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              style={{
                ...styles.tab,
                ...(activeTab === 'analysis' ? styles.activeTab : {}),
                ...(expenses.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {})
              }}
              disabled={expenses.length === 0}
            >
              Analysis
            </button>
          </div>
        </div>

        {/* Input Tab */}
        {activeTab === 'input' && (
          <div style={styles.grid}>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>
                <Upload color="#3b82f6" size={24} />
                Upload Bank Statement
              </h2>
              <div 
                style={styles.uploadArea}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xls,.xlsx"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <FileText size={48} color="#94a3b8" style={{ marginBottom: '15px' }} />
                <p style={{ color: '#64748b', marginBottom: '15px', fontWeight: '600' }}>
                  Upload Excel (.xls, .xlsx) or CSV file
                </p>
                <p style={{ color: '#64748b', marginBottom: '15px', fontSize: '14px' }}>
                  Supports Banco de Chile statements and CSV exports
                </p>
                <span style={styles.button}>Choose File</span>
              </div>
              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <button
                  onClick={loadSampleData}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#3b82f6', 
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Or try with sample data
                </button>
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>
                <Plus color="#10b981" size={24} />
                Add Expense Manually
              </h2>
              <div>
                <input
                  type="text"
                  placeholder="Description"
                  value={manualExpense.description}
                  onChange={(e) => setManualExpense({...manualExpense, description: e.target.value})}
                  style={styles.input}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={manualExpense.amount}
                  onChange={(e) => setManualExpense({...manualExpense, amount: e.target.value})}
                  style={styles.input}
                />
                <select
                  value={manualExpense.category}
                  onChange={(e) => setManualExpense({...manualExpense, category: e.target.value})}
                  style={styles.input}
                >
                  <option value="">Select Category</option>
                  {availableCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={manualExpense.date}
                  onChange={(e) => setManualExpense({...manualExpense, date: e.target.value})}
                  style={styles.input}
                />
                <button
                  onClick={addManualExpense}
                  style={{ ...styles.button, backgroundColor: '#10b981', width: '100%' }}
                >
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Review & Edit Tab */}
        {activeTab === 'review' && expenses.length > 0 && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <Edit3 color="#f59e0b" size={24} />
              Review Transactions & Edit Categories
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              Review the auto-categorized transactions and click on any category to edit it.
            </p>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Description</th>
                    <th style={styles.th}>Category</th>
                    <th style={{ ...styles.th, textAlign: 'right' }}>Amount</th>
                    <th style={{ ...styles.th, textAlign: 'center', width: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                      <td style={styles.td}>{expense.date}</td>
                      <td style={{ ...styles.td, fontWeight: '500' }}>{expense.description}</td>
                      <td style={styles.td}>
                        {editingIndex === index ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <select
                              value={tempCategory}
                              onChange={(e) => setTempCategory(e.target.value)}
                              style={styles.editInput}
                            >
                              {availableCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                            <div style={styles.editButtons}>
                              <button
                                onClick={() => saveCategory(index)}
                                style={{ 
                                  ...styles.editButton, 
                                  backgroundColor: '#10b981', 
                                  color: 'white' 
                                }}
                              >
                                <Check size={12} />
                              </button>
                              <button
                                onClick={cancelEditing}
                                style={{ 
                                  ...styles.editButton, 
                                  backgroundColor: '#ef4444', 
                                  color: 'white' 
                                }}
                              >
                                <X size={12} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span 
                            style={{
                              ...styles.badge,
                              ...styles.editableBadge
                            }}
                            onClick={() => startEditing(index, expense.category)}
                          >
                            {expense.category}
                            <Edit3 size={12} />
                          </span>
                        )}
                      </td>
                      <td style={{ ...styles.td, textAlign: 'right', fontWeight: 'bold', color: '#1f2937' }}>
                        ${expense.amount.toLocaleString()}
                      </td>
                      <td style={{ ...styles.td, textAlign: 'center' }}>
                        <button
                          onClick={() => showDeleteConfirmation(index)}
                          style={styles.deleteButton}
                          title="Delete transaction"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button
                onClick={() => setActiveTab('analysis')}
                style={{
                  ...styles.button,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  fontSize: '16px',
                  padding: '15px 30px'
                }}
              >
                Proceed to Analysis →
              </button>
            </div>
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <div>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>
                <BarChart3 color="#8b5cf6" size={24} />
                Current Expenses ({expenses.length} transactions)
              </h2>
              <div style={styles.statsGrid}>
                <div style={{ 
                  ...styles.statCard, 
                  backgroundColor: '#dbeafe', 
                  borderColor: '#3b82f6' 
                }}>
                  <p style={{ color: '#1d4ed8', fontWeight: '600' }}>Total Spending</p>
                  <p style={{ ...styles.statValue, color: '#1e40af' }}>
                    ${expenses.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString()}
                  </p>
                </div>
                <div style={{ 
                  ...styles.statCard, 
                  backgroundColor: '#dcfce7', 
                  borderColor: '#10b981' 
                }}>
                  <p style={{ color: '#059669', fontWeight: '600' }}>Average Transaction</p>
                  <p style={{ ...styles.statValue, color: '#047857' }}>
                    ${expenses.length > 0 ? (expenses.reduce((sum, expense) => sum + expense.amount, 0) / expenses.length).toLocaleString() : '0'}
                  </p>
                </div>
                <div style={{ 
                  ...styles.statCard, 
                  backgroundColor: '#f3e8ff', 
                  borderColor: '#8b5cf6' 
                }}>
                  <p style={{ color: '#7c3aed', fontWeight: '600' }}>Categories</p>
                  <p style={{ ...styles.statValue, color: '#6d28d9' }}>
                    {[...new Set(expenses.map(e => e.category))].length}
                  </p>
                </div>
              </div>
              
              <button
                onClick={analyzeFinances}
                disabled={loading || expenses.length === 0}
                style={{
                  ...styles.analysisButton,
                  ...(loading || expenses.length === 0 ? styles.analysisButtonDisabled : {})
                }}
              >
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      border: '2px solid #ffffff30', 
                      borderTop: '2px solid #ffffff', 
                      borderRadius: '50%', 
                      animation: 'spin 1s linear infinite' 
                    }}></div>
                    Analyzing with AI...
                  </div>
                ) : 'Get AI Financial Analysis'}
              </button>
            </div>

            {/* Charts and AI Analysis */}
            {analysis && (
              <>
                <div style={styles.grid}>
                  <div style={styles.card}>
                    <h3 style={styles.cardTitle}>
                      <PieChart color="#f97316" size={20} />
                      Spending by Category
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({name, value}) => `${name}: $${value.toLocaleString()}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value.toLocaleString()}`, 'Amount']} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>

                  <div style={styles.card}>
                    <h3 style={styles.cardTitle}>
                      <TrendingUp color="#10b981" size={20} />
                      Top Spending Categories
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="category" 
                          angle={-45} 
                          textAnchor="end" 
                          height={80}
                          fontSize={12}
                        />
                        <YAxis formatter={(value) => `${value.toLocaleString()}`} />
                        <Tooltip formatter={(value) => [`${value.toLocaleString()}`, 'Amount']} />
                        <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>
                    <Target color="#dc2626" size={20} />
                    AI Financial Insights & Recommendations
                  </h3>
                  <div style={styles.aiAdvice}>
                    {analysis.aiAdvice.split('\n').map((paragraph, index) => (
                      paragraph.trim() && (
                        <p key={index} style={{ 
                          color: '#374151', 
                          marginBottom: '12px', 
                          lineHeight: '1.6',
                          fontSize: '16px'
                        }}>
                          {paragraph.includes('**') ? (
                            paragraph.split('**').map((part, i) => 
                              i % 2 === 1 ? <strong key={i} style={{ color: '#1f2937' }}>{part}</strong> : part
                            )
                          ) : paragraph}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Transaction Summary Table */}
        {expenses.length > 0 && (activeTab === 'analysis' || activeTab === 'review') && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Transaction Summary</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Description</th>
                    <th style={styles.th}>Category</th>
                    <th style={{ ...styles.th, textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.slice(-15).map((expense, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                      <td style={styles.td}>{expense.date}</td>
                      <td style={{ ...styles.td, fontWeight: '500' }}>{expense.description}</td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.badge,
                          backgroundColor: categoryColors[expense.category] + '20',
                          color: categoryColors[expense.category],
                          border: `1px solid ${categoryColors[expense.category]}40`
                        }}>
                          {expense.category}
                        </span>
                      </td>
                      <td style={{ ...styles.td, textAlign: 'right', fontWeight: 'bold', color: '#1f2937' }}>
                        ${expense.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {expenses.length > 15 && (
              <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '15px' }}>
                Showing last 15 transactions of {expenses.length} total
              </p>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PersonalFinanceAdvisor;