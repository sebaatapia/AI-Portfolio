const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3002;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.post('/api/analyze-expenses', async (req, res) => {
  try {
    console.log('📝 Received request:', req.body);
    
    const { expenses } = req.body;
    
    if (!expenses || !Array.isArray(expenses)) {
      return res.status(400).json({ error: 'Invalid expenses data' });
    }
    
    const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const categoryBreakdown = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    // Detect if amounts are in Chilean Pesos (large numbers) or USD/other currency
    const avgAmount = totalSpending / expenses.length;
    const isCLP = avgAmount > 1000; // If average transaction > 1000, likely CLP
    const currencySymbol = isCLP ? 'CLP $' : '$';
    const currencyCode = isCLP ? 'CLP' : 'USD';

    const prompt = `Analyze these personal expenses and provide financial advice:

Currency: ${currencyCode}
Total Spending: ${currencySymbol}${totalSpending.toLocaleString('es-CL')}
Number of Transactions: ${expenses.length}
Average Transaction: ${currencySymbol}${(totalSpending / expenses.length).toLocaleString('es-CL')}

Expense Breakdown by Category:
${Object.entries(categoryBreakdown)
  .sort(([,a], [,b]) => b - a)
  .map(([category, amount]) => 
    `- ${category}: ${currencySymbol}${amount.toLocaleString('es-CL')} (${((amount/totalSpending)*100).toFixed(1)}%)`
  ).join('\n')}

Recent Transactions (last 10):
${expenses.slice(-10).map(expense => 
  `${expense.date}: ${expense.description} - ${currencySymbol}${expense.amount.toLocaleString('es-CL')} (${expense.category})`
).join('\n')}

${isCLP ? `
Note: These appear to be Chilean Peso (CLP) amounts. Please provide advice relevant to Chilean financial practices and costs of living.
` : ''}

Please provide:
1. **Spending Pattern Analysis**: What do these patterns reveal about the user's financial habits?
2. **Category Insights**: Analysis of each major spending category and what it suggests
3. **Optimization Opportunities**: Specific areas where the user could reduce expenses
4. **Budget Recommendations**: Practical budgeting advice based on their spending patterns
5. **Financial Goals**: Actionable steps to improve their financial health

Keep the advice practical, actionable, and specific to their spending patterns. Format the response with clear sections using **bold headers**.`;

    console.log('🔑 API Key present:', !!process.env.CLAUDE_API_KEY);
    console.log('🚀 Making request to Claude API...');

    const requestBody = {
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }]
    };

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(requestBody)
    });

    console.log('📥 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Claude API error response:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Claude API success!');
    
    const analysisResult = {
      aiAdvice: data.content[0].text,
      totalSpending,
      categoryBreakdown,
      avgTransaction: totalSpending / expenses.length,
      topCategories: Object.entries(categoryBreakdown)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5),
      currency: currencyCode,
      currencySymbol
    };

    res.json(analysisResult);
    
  } catch (error) {
    console.error('💥 Server error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running!', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
  console.log(`✅ Ready to proxy requests to Claude API`);
  console.log(`💰 Enhanced support for Chilean Peso (CLP) transactions`);
});