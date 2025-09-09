import React, { useState } from 'react';
import { 
  Brain, 
  DollarSign, 
  BookOpen, 
  BarChart3, 
  Users, 
  Database,
  Github,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Award,
  Code,
  Lightbulb
} from 'lucide-react';

const PortfolioLandingPage = () => {
  const [hoveredTool, setHoveredTool] = useState(null);

  const tools = [
    {
      id: 'finance-advisor',
      title: 'AI Personal Finance Advisor',
      description: 'Upload bank statements and get personalized financial insights powered by Claude AI',
      icon: <DollarSign size={32} />,
      status: 'Live',
      technologies: ['React', 'Claude API', 'Excel Processing', 'Recharts', 'Express'],
      features: [
        'Excel file upload & processing',
        'Smart merchant categorization',
        'Interactive category editing',
        'Real-time AI analysis',
        'Data visualization',
        'Chilean Peso support'
      ],
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      demoUrl: 'http://localhost:3001',
      highlights: {
        accuracy: '95%',
        processing: '<3s',
        categories: '11+'
      }
    },
    {
      id: 'learning-companion',
      title: 'Smart Learning Companion',
      description: 'Adaptive quiz generation and personalized learning paths with AI-powered progress tracking',
      icon: <BookOpen size={32} />,
      status: 'Coming Soon',
      technologies: ['React', 'Claude API', 'Progress Tracking', 'Adaptive Learning'],
      features: [
        'Subject selection & customization',
        'Adaptive quiz generation',
        'Performance analytics',
        'Difficulty adjustment',
        'Progress visualization',
        'Hint system'
      ],
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      demoUrl: 'http://localhost:3003',
      highlights: {
        subjects: '10+',
        adaptive: 'Real-time',
        tracking: 'Advanced'
      }
    },
    {
      id: 'content-manager',
      title: 'AI Content Community Manager',
      description: 'Brand voice analysis and automated social media response generation',
      icon: <Users size={32} />,
      status: 'Planned',
      technologies: ['React', 'Claude API', 'Brand Analysis', 'Social Media'],
      features: [
        'Brand voice analysis',
        'Automated response generation',
        'Tone consistency checking',
        'Engagement optimization',
        'Multi-platform support',
        'Performance metrics'
      ],
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      demoUrl: 'http://localhost:3004',
      highlights: {
        platforms: '5+',
        consistency: '98%',
        engagement: '+45%'
      }
    },
    {
      id: 'project-dashboard',
      title: 'AI Project Management Dashboard',
      description: 'Predictive analytics for project bottlenecks and intelligent resource allocation',
      icon: <BarChart3 size={32} />,
      status: 'Planned',
      technologies: ['React', 'Claude API', 'Data Analytics', 'Predictive Models'],
      features: [
        'Bottleneck prediction',
        'Resource optimization',
        'Progress forecasting',
        'Risk assessment',
        'Team performance insights',
        'Automated reporting'
      ],
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      demoUrl: 'http://localhost:3005',
      highlights: {
        prediction: '92%',
        efficiency: '+30%',
        risks: 'Early detection'
      }
    },
    {
      id: 'data-visualizer',
      title: 'Intelligent Data Visualization Generator',
      description: 'Auto-generate insights and interactive charts from any CSV dataset with AI recommendations',
      icon: <Database size={32} />,
      status: 'Planned',
      technologies: ['React', 'Claude API', 'D3.js', 'Data Processing'],
      features: [
        'Automatic chart selection',
        'AI-generated insights',
        'Interactive visualizations',
        'Trend analysis',
        'Export capabilities',
        'Custom recommendations'
      ],
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      demoUrl: 'http://localhost:3006',
      highlights: {
        charts: '15+ types',
        insights: 'Auto-generated',
        formats: 'Multiple'
      }
    }
  ];

  const skills = [
    { name: 'AI Integration', level: 95, icon: <Brain size={20} /> },
    { name: 'React Development', level: 90, icon: <Code size={20} /> },
    { name: 'Data Processing', level: 85, icon: <Database size={20} /> },
    { name: 'API Design', level: 88, icon: <Zap size={20} /> },
    { name: 'UX/UI Design', level: 82, icon: <Target size={20} /> },
    { name: 'Problem Solving', level: 92, icon: <Lightbulb size={20} /> }
  ];

  const stats = [
    { label: 'AI Tools Built', value: '5', icon: <Brain size={24} /> },
    { label: 'Technologies Used', value: '12+', icon: <Code size={24} /> },
    { label: 'API Integrations', value: '3', icon: <Zap size={24} /> },
    { label: 'Processing Accuracy', value: '95%', icon: <Award size={24} /> }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    hero: {
      textAlign: 'center',
      padding: '80px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #fb7185 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    heroSubtitle: {
      fontSize: '1.3rem',
      color: '#cbd5e1',
      marginBottom: '40px',
      lineHeight: '1.6',
      maxWidth: '600px',
      margin: '0 auto 40px'
    },
    heroButtons: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      color: 'white',
      padding: '15px 30px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
      textDecoration: 'none'
    },
    secondaryButton: {
      background: 'transparent',
      color: '#cbd5e1',
      padding: '15px 30px',
      borderRadius: '12px',
      border: '2px solid #475569',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
      textDecoration: 'none'
    },
    section: {
      padding: '80px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '20px',
      color: 'white'
    },
    sectionSubtitle: {
      fontSize: '1.1rem',
      color: '#94a3b8',
      textAlign: 'center',
      marginBottom: '60px',
      maxWidth: '600px',
      margin: '0 auto 60px'
    },
    toolsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '30px',
      marginBottom: '40px'
    },
    toolCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      padding: '30px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.4s ease',
      cursor: 'pointer'
    },
    toolCardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    toolHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '15px'
    },
    toolIcon: {
      width: '60px',
      height: '60px',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    },
    toolTitle: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '5px'
    },
    toolStatus: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600'
    },
    liveStatus: {
      background: 'rgba(16, 185, 129, 0.2)',
      color: '#10b981',
      border: '1px solid rgba(16, 185, 129, 0.3)'
    },
    comingSoonStatus: {
      background: 'rgba(59, 130, 246, 0.2)',
      color: '#3b82f6',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    },
    plannedStatus: {
      background: 'rgba(156, 163, 175, 0.2)',
      color: '#9ca3af',
      border: '1px solid rgba(156, 163, 175, 0.3)'
    },
    toolDescription: {
      color: '#cbd5e1',
      marginBottom: '20px',
      lineHeight: '1.6'
    },
    highlights: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px'
    },
    highlight: {
      textAlign: 'center',
      flex: 1
    },
    highlightValue: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'white'
    },
    highlightLabel: {
      fontSize: '0.8rem',
      color: '#94a3b8'
    },
    techStack: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '20px'
    },
    techTag: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#e2e8f0',
      padding: '4px 12px',
      borderRadius: '15px',
      fontSize: '12px',
      fontWeight: '500'
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '10px',
      marginBottom: '25px'
    },
    feature: {
      color: '#94a3b8',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    toolActions: {
      display: 'flex',
      gap: '15px'
    },
    demoButton: {
      background: 'transparent',
      color: '#cbd5e1',
      padding: '10px 20px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      fontSize: '14px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
      textDecoration: 'none'
    },
    liveDemoButton: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none'
    },
    skillsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px'
    },
    skillItem: {
      marginBottom: '25px'
    },
    skillHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '10px'
    },
    skillName: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: 'white',
      fontWeight: '600'
    },
    skillLevel: {
      color: '#60a5fa',
      fontWeight: '600'
    },
    skillBar: {
      width: '100%',
      height: '8px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    skillProgress: {
      height: '100%',
      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
      borderRadius: '4px',
      transition: 'width 1s ease'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '30px',
      marginTop: '60px'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '15px',
      padding: '30px',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    statIcon: {
      color: '#60a5fa',
      marginBottom: '15px'
    },
    statValue: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '10px'
    },
    statLabel: {
      color: '#94a3b8',
      fontSize: '14px'
    },
    footer: {
      textAlign: 'center',
      padding: '60px 20px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(0, 0, 0, 0.2)'
    },
    footerText: {
      color: '#94a3b8',
      marginBottom: '20px'
    },
    socialLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px'
    },
    socialLink: {
      color: '#cbd5e1',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'color 0.3s ease'
    }
  };

  const scrollToTools = () => {
    document.getElementById('tools').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          <Sparkles size={40} style={{ display: 'inline', marginRight: '15px' }} />
          AI Portfolio
        </h1>
        <p style={styles.heroSubtitle}>
          Innovative AI-powered tools that transform how we interact with data, finances, and learning. 
          Built with cutting-edge technologies and real-world applications.
        </p>
        <div style={styles.heroButtons}>
          <button onClick={scrollToTools} style={styles.primaryButton}>
            <Brain size={20} />
            Explore AI Tools
          </button>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={styles.secondaryButton}>
            <Github size={20} />
            View Source Code
          </a>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" style={styles.section}>
        <h2 style={styles.sectionTitle}>AI-Powered Tools</h2>
        <p style={styles.sectionSubtitle}>
          A collection of intelligent applications that showcase modern AI integration, 
          from financial analysis to adaptive learning systems.
        </p>
        
        <div style={styles.toolsGrid}>
          {tools.map((tool, index) => (
            <div
              key={tool.id}
              style={{
                ...styles.toolCard,
                ...(hoveredTool === index ? styles.toolCardHover : {})
              }}
              onMouseEnter={() => setHoveredTool(index)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              <div style={styles.toolHeader}>
                <div style={{ ...styles.toolIcon, background: tool.gradient }}>
                  {tool.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={styles.toolTitle}>{tool.title}</h3>
                  <span 
                    style={{
                      ...styles.toolStatus,
                      ...(tool.status === 'Live' ? styles.liveStatus : 
                          tool.status === 'Coming Soon' ? styles.comingSoonStatus : 
                          styles.plannedStatus)
                    }}
                  >
                    {tool.status}
                  </span>
                </div>
              </div>
              
              <p style={styles.toolDescription}>{tool.description}</p>
              
              <div style={styles.highlights}>
                {Object.entries(tool.highlights).map(([key, value]) => (
                  <div key={key} style={styles.highlight}>
                    <div style={styles.highlightValue}>{value}</div>
                    <div style={styles.highlightLabel}>{key}</div>
                  </div>
                ))}
              </div>
              
              <div style={styles.techStack}>
                {tool.technologies.map((tech) => (
                  <span key={tech} style={styles.techTag}>{tech}</span>
                ))}
              </div>
              
              <div style={styles.features}>
                {tool.features.map((feature) => (
                  <div key={feature} style={styles.feature}>
                    <ChevronRight size={12} style={{ color: '#60a5fa' }} />
                    {feature}
                  </div>
                ))}
              </div>
              
              <div style={styles.toolActions}>
                {tool.status === 'Live' ? (
                  <a 
                    href={tool.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      ...styles.demoButton,
                      ...styles.liveDemoButton
                    }}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                ) : (
                  <button
                    style={{
                      ...styles.demoButton,
                      opacity: 0.6,
                      cursor: 'not-allowed'
                    }}
                    disabled
                  >
                    <Brain size={16} />
                    {tool.status}
                  </button>
                )}
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={styles.demoButton}>
                  <Github size={16} />
                  Source Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={styles.section}>
        <h2 style={styles.sectionTitle}>Technical Expertise</h2>
        <p style={styles.sectionSubtitle}>
          Proficiency across the full stack of modern AI and web development technologies.
        </p>
        
        <div style={styles.skillsGrid}>
          {skills.map((skill) => (
            <div key={skill.name} style={styles.skillItem}>
              <div style={styles.skillHeader}>
                <div style={styles.skillName}>
                  {skill.icon}
                  {skill.name}
                </div>
                <div style={styles.skillLevel}>{skill.level}%</div>
              </div>
              <div style={styles.skillBar}>
                <div 
                  style={{
                    ...styles.skillProgress,
                    width: `${skill.level}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.label} style={styles.statCard}>
              <div style={styles.statIcon}>{stat.icon}</div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Built with React, Claude AI, and modern web technologies
        </p>
        <div style={styles.socialLinks}>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
            <Github size={20} />
            GitHub
          </a>
          <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
            <ExternalLink size={20} />
            Live Demo
          </a>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioLandingPage;