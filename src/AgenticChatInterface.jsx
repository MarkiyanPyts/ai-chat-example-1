import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Search, Database, Code, Loader2, CheckCircle, AlertCircle, Bot, User, Sparkles, FileText, Globe, Terminal, ChevronDown, ChevronUp, Clock, Activity, Shield, ShieldCheck, X, Check, AlertTriangle, Zap } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AgenticChatInterface = () => {
  const [threads, setThreads] = useState([
    { id: 1, title: 'Data Analysis Project', lastMessage: 'Analyzing sales trends...', timestamp: '2 min ago', active: true },
    { id: 2, title: 'Code Review Assistant', lastMessage: 'Found 3 potential improvements', timestamp: '1 hour ago', active: false },
    { id: 3, title: 'Research Task', lastMessage: 'Compiled 15 sources', timestamp: '3 hours ago', active: false },
  ]);
  
  const [messages, setMessages] = useState([
    { id: 1, type: 'user', content: 'Create a Confluence page documenting our Q4 sales analysis results' },
    { id: 2, type: 'assistant', content: "I'll help you create a Confluence page with the Q4 sales analysis. Let me gather the data and prepare the documentation.",
      agentInfo: {
        name: "AllAI Orchestrator Agent",
        specialization: "Task Coordination & Multi-Agent Management",
        permissions: ["Tool Selection", "Agent Handoffs", "Workflow Orchestration", "Resource Management"]
      }, 
      actions: [
        { 
          id: 'action-1',
          type: 'database', 
          status: 'completed', 
          toolName: 'Query Database Tool',
          description: 'Retrieving Q4 sales data', 
          icon: Database,
          startTime: '10:23:45',
          endTime: '10:23:47',
          approved: true,
          details: {
            query: 'SELECT * FROM sales WHERE quarter = "Q4" AND year = 2024',
            recordsFound: 15420,
            executionTime: '2.3s',
            logs: [
              { time: '10:23:45', message: 'Connecting to database server...' },
              { time: '10:23:45', message: 'Authentication successful' },
              { time: '10:23:46', message: 'Executing query...' },
              { time: '10:23:47', message: 'Query completed successfully' }
            ]
          }
        },
        { 
          id: 'action-2',
          type: 'code', 
          status: 'completed', 
          toolName: 'Code Interpreter Tool',
          description: 'Analyzing sales trends', 
          icon: Code,
          startTime: '10:23:48',
          endTime: '10:23:50',
          approved: true,
          details: {
            language: 'Python',
            framework: 'Pandas + Matplotlib',
            resultsCount: 12,
            codeExample: `import pandas as pd
import matplotlib.pyplot as plt

# Load sales data
print("Loading Q4 sales data...")
df = pd.read_sql(query, connection)
print(f"Loaded {len(df)} records")

# Calculate trends
print("Calculating growth metrics...")
growth_rate = df.groupby('month')['revenue'].sum().pct_change()
print(f"Growth calculated: {growth_rate.mean():.2%}")

# Generate visualizations
print("Creating visualizations...")
plt.figure(figsize=(12, 6))
plt.plot(df['date'], df['revenue'])
print("12 visualizations generated successfully")`,
            logs: [
              { time: '10:23:48', message: 'Loading data into DataFrame...' },
              { time: '10:23:48', message: 'print: Loading Q4 sales data...' },
              { time: '10:23:49', message: 'print: Loaded 15420 records' },
              { time: '10:23:49', message: 'Calculating growth metrics...' },
              { time: '10:23:49', message: 'print: Growth calculated: 23.45%' },
              { time: '10:23:50', message: 'print: Creating visualizations...' },
              { time: '10:23:50', message: 'print: 12 visualizations generated successfully' },
              { time: '10:23:50', message: 'Generated 12 visualizations' }
            ]
          }
        },
        { 
          id: 'action-3',
          type: 'document', 
          status: 'pending_approval',
          toolName: 'Document Writer Tool',
          description: 'Write Confluence page', 
          icon: FileText,
          startTime: '10:23:51',
          details: {
            platform: 'Confluence',
            space: 'Sales Team',
            estimatedTime: '10-15 seconds',
            documentPreview: `# Q4 2024 Sales Analysis Report

## Executive Summary
- Total Revenue: $12.4M (+23% YoY)
- New Customers: 1,842 (+31% YoY)
- Key Markets: North America (45%), Europe (32%), APAC (23%)

## Key Findings
1. Record-breaking December performance
2. Strong growth in enterprise segment
3. Successful product launch impact...`,
            potentialRisks: [
              'Will create public page in Sales Team space',
              'Page will be visible to all team members',
              'May overwrite existing page with same title'
            ],
            logs: []
          }
        }
      ]
    },
    { 
      id: 3, 
      type: 'user', 
      content: 'Find documentation about our API authentication process from our internal Confluence' 
    },
    { 
      id: 4, 
      type: 'assistant', 
      content: "I'll search through your Confluence documentation to find information about API authentication processes.",
      agentInfo: {
        name: "AllAI Orchestrator Agent",
        specialization: "Task Coordination & Multi-Agent Management",
        permissions: ["Tool Selection", "Agent Handoffs", "Workflow Orchestration", "Resource Management"]
      },
      actions: [
        { 
          id: 'action-confluence-1',
          type: 'confluence', 
          status: 'completed', 
          toolName: 'Confluence Search Tool',
          description: 'Searching internal documentation', 
          icon: FileText,
          startTime: '10:25:12',
          endTime: '10:25:15',
          approved: true,
          details: {
            searchQuery: 'API authentication process',
            space: 'Engineering Documentation',
            resultsFound: 8,
            executionTime: '3.2s',
            confluenceResults: [
              {
                title: "API Authentication Guide v2.1",
                url: "https://yourcompany.atlassian.net/wiki/spaces/ENG/pages/12345/API+Authentication+Guide",
                space: "Engineering Documentation",
                author: "John Smith",
                lastModified: "2024-01-15",
                snippet: "This guide covers OAuth 2.0 implementation, JWT token validation, and API key management for our REST APIs. Includes code examples and security best practices.",
                labels: ["api", "auth", "security", "oauth"],
                pageType: "documentation"
              },
              {
                title: "Security Standards - Authentication",
                url: "https://yourcompany.atlassian.net/wiki/spaces/SEC/pages/67890/Security+Standards",
                space: "Security Team",
                author: "Sarah Johnson",
                lastModified: "2024-01-10",
                snippet: "Company-wide authentication standards including password policies, multi-factor authentication requirements, and API security protocols. Updated with latest OWASP guidelines.",
                labels: ["security", "standards", "compliance", "mfa"],
                pageType: "policy"
              },
              {
                title: "Developer Onboarding - API Access",
                url: "https://yourcompany.atlassian.net/wiki/spaces/DEV/pages/11111/Developer+Onboarding",
                space: "Developer Resources",
                author: "Mike Chen",
                lastModified: "2024-01-08",
                snippet: "Step-by-step guide for new developers to obtain API credentials, set up authentication, and make their first API calls. Includes troubleshooting common issues.",
                labels: ["onboarding", "api", "getting-started", "credentials"],
                pageType: "tutorial"
              }
            ],
            logs: [
              { time: '10:25:12', message: 'Connecting to Confluence instance...' },
              { time: '10:25:13', message: 'Searching across 3 spaces: Engineering Documentation, Security Team, Developer Resources' },
              { time: '10:25:14', message: 'Found 8 matching pages' },
              { time: '10:25:15', message: 'Ranked results by relevance and recency' }
            ]
          }
        }
      ]
    },
    { 
      id: 5, 
      type: 'user', 
      content: 'Can you update the lead scoring rules in Salesforce for our new product launch campaign?' 
    },
    { 
      id: 6, 
      type: 'assistant', 
      content: "I need to hand this off to our Salesforce specialist who has the expertise and permissions to modify lead scoring rules. Let me connect you with the Salesforce Core agent.",
      agentInfo: {
        name: "AllAI Orchestrator Agent",
        specialization: "Task Coordination & Multi-Agent Management",
        permissions: ["Tool Selection", "Agent Handoffs", "Workflow Orchestration", "Resource Management"]
      },
      agentHandoff: {
        fromAgent: "AllAI Orchestrator Agent",
        toAgent: "Salesforce Core Agent",
        reason: "Salesforce configuration requires specialized knowledge and elevated permissions",
        timestamp: "10:28:45"
      }
    },
    { 
      id: 7, 
      type: 'assistant', 
      content: "Hello! I'm the Salesforce Core agent. I'll help you update the lead scoring rules for your new product launch campaign. Let me access your Salesforce org and review the current configuration.",
      agentInfo: {
        name: "Salesforce Core Agent",
        specialization: "Salesforce Administration & Development",
        permissions: ["Apex Code", "Workflow Rules", "Custom Objects", "Lead Management"]
      },
      actions: [
        { 
          id: 'action-sf-login',
          type: 'salesforce-login', 
          status: 'awaiting_user_action', 
          toolName: 'Salesforce Login Tool',
          description: 'Authenticate with Salesforce org', 
          icon: Shield,
          startTime: '10:28:47',
          approved: true,
          details: {
            org: 'Production',
            username: 'admin@yourcompany.com',
            loginMethod: 'OAuth 2.0',
            sessionStatus: 'expired',
            lastLogin: '10:26:30',
            permissions: ['Modify All Data', 'View Setup', 'Apex Execution'],
            logs: [
              { time: '10:28:47', message: 'Checking existing Salesforce session...' },
              { time: '10:28:47', message: 'Previous session expired at 10:26:30' },
              { time: '10:28:47', message: 'User action required to refresh authentication' }
            ]
          }
        },
        { 
          id: 'action-sf-1',
          type: 'salesforce', 
          status: 'awaiting_user_action', 
          toolName: 'APEX Code Interpreter Tool',
          description: 'Analyzing current lead scoring configuration', 
          icon: Zap,
          approved: true,
          details: {
            language: 'Apex',
            operation: 'Query Lead Scoring Rules',
            org: 'Production',
            estimatedTime: '2-5 seconds',
            dependsOn: 'Salesforce Login Tool',
            dependencyStatus: 'session_expired',
            waitingFor: 'User to refresh Salesforce session',
            blockedReason: 'Cannot execute APEX code without active Salesforce session',
            pendingApprovalDetails: {
              potentialRisks: [
                'Will execute APEX code in Production Salesforce org',
                'Queries lead data from the last 30 days (up to 1000 records)',
                'Accesses custom LeadScoringRule__c objects',
                'May impact org performance during execution'
              ],
              codePreview: `// Query current lead scoring rules
List<Lead> leads = [SELECT Id, LeadScore, Rating, Source 
                    FROM Lead WHERE CreatedDate = LAST_N_DAYS:30 
                    LIMIT 1000];
// Analyze scoring distribution and active rules...`
            },
            logs: [
              { time: '10:28:50', message: 'Checking dependencies...' },
              { time: '10:28:50', message: 'Dependency: Salesforce Login Tool - session expired' },
              { time: '10:28:50', message: 'Waiting for user to refresh Salesforce session' }
            ]
          }
        }
      ]
    }
  ]);
  
  const [expandedActions, setExpandedActions] = useState(new Set());
  const [trustMode, setTrustMode] = useState(false);
  const [trustedSession, setTrustedSession] = useState(false);
  const [showSalesforceModal, setShowSalesforceModal] = useState(false);
  const [salesforceSessionActive, setSalesforceSessionActive] = useState(false);
  const [showAgentTooltip, setShowAgentTooltip] = useState(null);
  
  const [inputValue, setInputValue] = useState('');
  const [activeThread, setActiveThread] = useState(1);
  

  const handleSalesforceRefresh = () => {
    setSalesforceSessionActive(true);
    setShowSalesforceModal(false);
    
    // Update the messages to reflect the session refresh and activate APEX tool
    setMessages(prev => prev.map(msg => {
      if (msg.id === 7 && msg.actions) {
        return {
          ...msg,
          actions: msg.actions.map(action => {
            if (action.id === 'action-sf-login') {
              return {
                ...action,
                status: 'completed',
                endTime: new Date().toLocaleTimeString(),
                details: {
                  ...action.details,
                  sessionStatus: 'active',
                  sessionId: 'sf-session-xyz789',
                  logs: [
                    ...action.details.logs,
                    { time: new Date().toLocaleTimeString(), message: 'User initiated session refresh' },
                    { time: new Date().toLocaleTimeString(), message: 'OAuth authentication successful' },
                    { time: new Date().toLocaleTimeString(), message: 'New session established' }
                  ]
                }
              };
            }
            if (action.id === 'action-sf-1') {
              return {
                ...action,
                status: 'pending_approval',
                approved: false,
                details: {
                  ...action.details,
                  dependsOn: undefined,
                  dependencyStatus: undefined,
                  waitingFor: undefined,
                  blockedReason: undefined,
                  potentialRisks: action.details.pendingApprovalDetails.potentialRisks,
                  codePreview: action.details.pendingApprovalDetails.codePreview,
                  logs: [
                    { time: new Date().toLocaleTimeString(), message: 'Dependency satisfied: Salesforce Login Tool - session active' },
                    { time: new Date().toLocaleTimeString(), message: 'Ready for user approval to execute APEX code' }
                  ]
                }
              };
            }
            return action;
          })
        };
      }
      return msg;
    }));

    // APEX tool now stays in pending_approval state until user explicitly approves it
  };
  
  
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: inputValue
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
      
      // Simulate agent response
      setTimeout(() => {
        const newActionId = `action-${Date.now()}-1`;
        const agentMessage = {
          id: messages.length + 2,
          type: 'assistant',
          content: "I'm processing your request. Let me gather the necessary information and tools.",
          actions: [
            { 
              id: newActionId,
              type: 'search', 
              status: trustedSession ? 'running' : 'pending_approval',
              toolName: 'Web Search Tool',
              description: 'Searching for relevant data', 
              icon: Globe,
              startTime: new Date().toLocaleTimeString(),
              approved: trustedSession,
              details: {
                searchQuery: inputValue,
                sources: ['Web', 'Internal Docs', 'Knowledge Base'],
                estimatedTime: '2-5 seconds',
                potentialRisks: ['External web access', 'API rate limits may apply'],
                citations: [
                  {
                    title: "Understanding Modern Data Analysis Techniques",
                    url: "https://www.datasciencecentral.com/analysis-techniques",
                    domain: "datasciencecentral.com",
                    snippet: "Data analysis involves examining, cleaning, and modeling data to discover useful information and support decision-making. Modern techniques include statistical analysis, machine learning, and visualization methods.",
                    relevanceScore: 0.92
                  },
                  {
                    title: "Best Practices for Business Intelligence Reporting",
                    url: "https://www.tableau.com/learn/articles/business-intelligence-reporting",
                    domain: "tableau.com",
                    snippet: "Effective BI reporting requires clear objectives, appropriate visualizations, and regular updates. Key elements include KPI tracking, trend analysis, and actionable insights that drive business decisions.",
                    relevanceScore: 0.87
                  },
                  {
                    title: "Python for Data Analysis: Complete Guide",
                    url: "https://pandas.pydata.org/docs/user_guide/index.html",
                    domain: "pandas.pydata.org",
                    snippet: "Pandas provides powerful data structures and analysis tools for Python. It excels at data manipulation, cleaning, and analysis tasks, making it essential for data science workflows.",
                    relevanceScore: 0.84
                  },
                  {
                    title: "SQL Query Optimization Strategies",
                    url: "https://stackoverflow.com/questions/tagged/sql-optimization",
                    domain: "stackoverflow.com",
                    snippet: "Database query optimization involves indexing, query restructuring, and performance monitoring. Proper optimization can significantly improve query execution times and system performance.",
                    relevanceScore: 0.78
                  }
                ],
                logs: trustedSession ? [
                  { time: new Date().toLocaleTimeString(), message: 'Auto-approved: Trust mode enabled' },
                  { time: new Date().toLocaleTimeString(), message: 'Starting search process...' },
                  { time: new Date().toLocaleTimeString(), message: 'Found 4 relevant sources' },
                  { time: new Date().toLocaleTimeString(), message: 'Search completed successfully' }
                ] : []
              }
            }
          ]
        };
        setMessages(prev => [...prev, agentMessage]);
        
        // Auto-approve and run if trust mode is on
        if (trustedSession) {
          setTimeout(() => {
            runAction(messages.length + 2, newActionId);
          }, 500);
        }
      }, 1000);
    }
  };
  
  const handleActionApproval = (messageId, actionId, approved) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          actions: msg.actions.map(action => {
            if (action.id === actionId) {
              if (approved) {
                return { 
                  ...action, 
                  status: 'running', 
                  approved: true,
                  details: {
                    ...action.details,
                    logs: [
                      ...(action.details.logs || []),
                      { time: new Date().toLocaleTimeString(), message: 'User approved action' },
                      { time: new Date().toLocaleTimeString(), message: 'Starting execution...' }
                    ]
                  }
                };
              } else {
                return { 
                  ...action, 
                  status: 'rejected', 
                  approved: false,
                  endTime: new Date().toLocaleTimeString(),
                  details: {
                    ...action.details,
                    logs: [
                      ...(action.details.logs || []),
                      { time: new Date().toLocaleTimeString(), message: 'User rejected action' }
                    ]
                  }
                };
              }
            }
            return action;
          })
        };
      }
      return msg;
    }));
    
    if (approved) {
      // Simulate action completion
      setTimeout(() => {
        runAction(messageId, actionId);
      }, 2000);
    }
  };
  
  const runAction = (messageId, actionId) => {
    // First set to running
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          actions: msg.actions.map(action => {
            if (action.id === actionId) {
              return {
                ...action,
                status: 'running',
                startTime: new Date().toLocaleTimeString(),
                details: {
                  ...action.details,
                  logs: [
                    ...(action.details.logs || []),
                    { time: new Date().toLocaleTimeString(), message: 'Starting action execution...' }
                  ]
                }
              };
            }
            return action;
          })
        };
      }
      return msg;
    }));

    // Then complete after delay
    setTimeout(() => {
      setMessages(prev => prev.map(msg => {
        if (msg.id === messageId) {
          return {
            ...msg,
            actions: msg.actions.map(action => {
              if (action.id === actionId) {
                // Special handling for APEX tool
                if (action.id === 'action-sf-1') {
                  return {
                    ...action,
                    status: 'completed',
                    endTime: new Date().toLocaleTimeString(),
                    details: {
                      ...action.details,
                      executionTime: '2.8s',
                      apexCode: `// Query current lead scoring rules
List<Lead> leads = [SELECT Id, LeadScore, Rating, Source, Industry, Company 
                    FROM Lead 
                    WHERE CreatedDate = LAST_N_DAYS:30 
                    LIMIT 1000];

// Analyze scoring distribution
Map<String, Integer> scoreDistribution = new Map<String, Integer>();
for(Lead l : leads) {
    String scoreRange = getScoreRange(l.LeadScore);
    Integer count = scoreDistribution.get(scoreRange);
    scoreDistribution.put(scoreRange, count == null ? 1 : count + 1);
}

System.debug('Current lead score distribution: ' + scoreDistribution);

// Get active scoring rules
List<LeadScoringRule__c> activeRules = [SELECT Id, Name, Criteria__c, Points__c, IsActive__c 
                                       FROM LeadScoringRule__c 
                                       WHERE IsActive__c = true];

System.debug('Found ' + activeRules.size() + ' active scoring rules');`,
                      results: {
                        leadsAnalyzed: 847,
                        activeRules: 12,
                        averageScore: 42.3,
                        scoreDistribution: {
                          "Hot (80-100)": 67,
                          "Warm (60-79)": 156,
                          "Cold (40-59)": 324,
                          "Unqualified (0-39)": 300
                        }
                      },
                      logs: [
                        ...(action.details.logs || []),
                        { time: new Date().toLocaleTimeString(), message: 'print: Querying lead scoring rules...' },
                        { time: new Date().toLocaleTimeString(), message: 'print: Found 847 leads from last 30 days' },
                        { time: new Date().toLocaleTimeString(), message: 'print: Current lead score distribution calculated' },
                        { time: new Date().toLocaleTimeString(), message: 'print: Found 12 active scoring rules' },
                        { time: new Date().toLocaleTimeString(), message: 'Analysis complete - ready for rule modifications' }
                      ]
                    }
                  };
                }
                // Default completion for other actions
                return {
                  ...action,
                  status: 'completed',
                  endTime: new Date().toLocaleTimeString(),
                  details: {
                    ...action.details,
                    progress: 100,
                    logs: [
                      ...(action.details.logs || []),
                      { time: new Date().toLocaleTimeString(), message: 'Action completed successfully' }
                    ],
                    ...(action.type === 'search' ? { resultsCount: 42 } : {}),
                  ...(action.type === 'database' ? { recordsFound: 1337, executionTime: '1.2s' } : {})
                }
              };
            }
            return action;
          })
        };
      }
      return msg;
    }));
    }, 3000); // 3 second delay for completion
  };
  
  const toggleActionExpanded = (actionId) => {
    const newExpanded = new Set(expandedActions);
    if (newExpanded.has(actionId)) {
      newExpanded.delete(actionId);
    } else {
      newExpanded.add(actionId);
    }
    setExpandedActions(newExpanded);
  };
  
  const getActionIcon = (action) => {
    const Icon = action.icon;
    if (action.status === 'completed') {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    } else if (action.status === 'running') {
      return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
    } else if (action.status === 'error' || action.status === 'rejected') {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    } else if (action.status === 'pending_approval') {
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    }
    return <Icon className="w-4 h-4 text-gray-400" />;
  };
  
  const getActionStatusColor = (status, actionId) => {
    const isExpanded = expandedActions.has(actionId);
    
    switch (status) {
      case 'completed': return 'bg-green-100 border-green-300';
      case 'running': return 'bg-blue-100 border-blue-300 animate-pulse';
      case 'error': return 'bg-red-100 border-red-300';
      case 'rejected': return 'bg-red-100 border-red-300';
      case 'pending_approval': return 'bg-yellow-100 border-yellow-300';
      case 'awaiting_user_action': return `bg-orange-100 border-orange-300 ${isExpanded ? '' : 'animate-pulse'}`;
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div 
      className="flex h-screen bg-gray-50"
      onClick={(e) => {
        // Close tooltip if clicking outside of it
        if (!e.target.closest('.agent-tooltip') && !e.target.closest('.agent-avatar')) {
          setShowAgentTooltip(null);
        }
      }}
    >
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-3 hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Thread</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {threads.map(thread => (
            <div
              key={thread.id}
              onClick={() => setActiveThread(thread.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 ${
                activeThread === thread.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  {thread.title}
                </h3>
                {thread.active && (
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 truncate">{thread.lastMessage}</p>
              <p className="text-xs text-gray-400 mt-1">{thread.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6 text-blue-600" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">AllAI Chat</h1>
                <p className="text-sm text-gray-500">AI-powered tools at your service</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setTrustMode(!trustMode);
                  setTrustedSession(!trustMode);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  trustMode 
                    ? 'bg-green-100 text-green-700 border border-green-300' 
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                }`}
              >
                {trustMode ? <ShieldCheck className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                <span>{trustMode ? 'Trust Mode ON' : 'Trust Mode OFF'}</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="relative">
                  <div 
                    className={`agent-avatar flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' ? 'bg-gray-600' : 
                      message.agentInfo?.name === 'Salesforce Core Agent' ? 'bg-purple-600 cursor-pointer hover:bg-purple-700' :
                      message.agentInfo ? 'bg-blue-600 cursor-pointer hover:bg-blue-700' : 'bg-blue-600'
                    } transition-colors`}
                    onClick={() => message.agentInfo && setShowAgentTooltip(showAgentTooltip === message.id ? null : message.id)}
                  >
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : message.agentInfo?.name === 'Salesforce Core Agent' ? (
                      <Zap className="w-5 h-5 text-white" />
                    ) : message.agentInfo ? (
                      <Bot className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  
                  {/* Agent Info Tooltip */}
                  {message.agentInfo && showAgentTooltip === message.id && (
                    <div className="agent-tooltip absolute left-10 top-0 z-50 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        {message.agentInfo.name === 'Salesforce Core Agent' ? (
                          <Zap className="w-4 h-4 text-purple-600" />
                        ) : (
                          <Bot className="w-4 h-4 text-blue-600" />
                        )}
                        <div className="text-sm font-medium text-gray-900">{message.agentInfo.name}</div>
                      </div>
                      <div className="text-xs text-gray-700 space-y-2">
                        <div><strong>Specialization:</strong> {message.agentInfo.specialization}</div>
                        <div>
                          <strong>Permissions:</strong>
                          <div className="flex gap-1 flex-wrap mt-1">
                            {message.agentInfo.permissions.map((perm, i) => (
                              <span 
                                key={i} 
                                className={`px-2 py-0.5 rounded text-xs ${
                                  message.agentInfo.name === 'Salesforce Core Agent' 
                                    ? 'bg-purple-100 text-purple-700' 
                                    : 'bg-blue-100 text-blue-700'
                                }`}
                              >
                                {perm}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="absolute -left-2 top-3 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white"></div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className={`rounded-lg px-4 py-3 ${
                    message.type === 'user' ? 'bg-gray-600 text-white' : 'bg-white border border-gray-200'
                  }`}>
                    <p className={message.type === 'user' ? 'text-white' : 'text-gray-800'}>{message.content}</p>
                  </div>
                  
                  {/* Agent Handoff */}
                  {message.agentHandoff && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                        <div className="text-sm font-medium text-blue-900">Agent Handoff</div>
                      </div>
                      <div className="text-xs text-blue-700 space-y-1">
                        <div><strong>From:</strong> {message.agentHandoff.fromAgent}</div>
                        <div><strong>To:</strong> {message.agentHandoff.toAgent}</div>
                        <div><strong>Reason:</strong> {message.agentHandoff.reason}</div>
                        <div><strong>Time:</strong> {message.agentHandoff.timestamp}</div>
                      </div>
                    </div>
                  )}
                  
                  
                  {/* Agent Actions */}
                  {message.actions && (
                    <div className="mt-3 space-y-2">
                      {message.actions.map((action, idx) => (
                        <div key={action.id || idx} className="transition-all">
                          {/* Approval Request for Pending Actions */}
                          {action.status === 'pending_approval' && (
                            <div className="mb-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <div className="flex items-start gap-2 mb-2">
                                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">Action Approval Required</p>
                                  <p className="text-xs text-gray-600 mt-1">The AI wants to: <strong>{action.description}</strong></p>
                                  {action.details?.codePreview && (
                                    <div className="mt-2">
                                      <p className="text-xs font-medium text-gray-700 mb-1">Code preview:</p>
                                      <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded overflow-x-auto">
                                        {action.details.codePreview}
                                      </pre>
                                    </div>
                                  )}
                                  {action.details?.documentPreview && (
                                    <div className="mt-2">
                                      <p className="text-xs font-medium text-gray-700 mb-1">Document preview:</p>
                                      <div className="text-xs bg-gray-50 border border-gray-200 p-2 rounded max-h-32 overflow-y-auto">
                                        <pre className="whitespace-pre-wrap font-sans">{action.details.documentPreview}</pre>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <button
                                  onClick={() => handleActionApproval(message.id, action.id, true)}
                                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 transition-colors"
                                >
                                  <Check className="w-4 h-4" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleActionApproval(message.id, action.id, false)}
                                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                  Reject
                                </button>
                              </div>
                            </div>
                          )}
                          
                          <div 
                            onClick={() => toggleActionExpanded(action.id)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${getActionStatusColor(action.status, action.id)} transition-all cursor-pointer hover:shadow-sm`}
                          >
                            {getActionIcon(action)}
                            <div className="flex-1">
                              {action.toolName && (
                                <div className="text-xs font-medium text-blue-600 mb-1">{action.toolName}</div>
                              )}
                              <span className="text-sm text-gray-700">{action.description}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {action.status === 'running' && action.details?.progress && (
                                <div className="flex items-center gap-1">
                                  <Activity className="w-3 h-3 text-blue-500" />
                                  <span className="text-xs text-gray-600">{action.details.progress}%</span>
                                </div>
                              )}
                              {action.approved === false && (
                                <span className="text-xs text-red-600 font-medium">Rejected</span>
                              )}
                              {action.status === 'awaiting_user_action' && (
                                <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                                  <AlertCircle className="w-3 h-3" />
                                  <span className="text-xs font-medium">Action Required</span>
                                </div>
                              )}
                              {action.startTime && (
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {action.startTime}
                                </span>
                              )}
                              {expandedActions.has(action.id) ? 
                                <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                              }
                            </div>
                          </div>
                          
                          {/* Expanded Details */}
                          {expandedActions.has(action.id) && action.details && (
                            <div className="mt-2 ml-7 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                              <div className="space-y-3">
                                {/* Action-specific details */}
                                {action.type === 'database' && (
                                  <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                      <span className="font-medium text-gray-600 min-w-20">Query:</span>
                                      <code className="flex-1 bg-gray-800 text-green-400 px-2 py-1 rounded text-xs">{action.details.query}</code>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs">
                                      <span><strong>Records:</strong> {action.details.recordsFound?.toLocaleString()}</span>
                                      <span><strong>Time:</strong> {action.details.executionTime}</span>
                                    </div>
                                  </div>
                                )}
                                
                                {action.type === 'search' && (
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-gray-600">Query:</span>
                                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{action.details.searchQuery}</span>
                                    </div>
                                    
                                    {/* Citations */}
                                    {action.details.citations && action.details.citations.length > 0 && (
                                      <div className="space-y-2">
                                        <div className="font-medium text-gray-600">Search Results & Citations:</div>
                                        <div className="space-y-3 max-h-96 overflow-y-auto">
                                          {action.details.citations.map((citation, i) => (
                                            <div key={i} className="border border-gray-200 rounded-lg p-3 bg-white">
                                              <div className="flex items-start justify-between gap-2 mb-2">
                                                <a 
                                                  href={citation.url} 
                                                  target="_blank" 
                                                  rel="noopener noreferrer"
                                                  className="text-blue-600 hover:text-blue-800 font-medium text-sm leading-tight hover:underline"
                                                >
                                                  {citation.title}
                                                </a>
                                                <span className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">
                                                  {Math.round(citation.relevanceScore * 100)}% match
                                                </span>
                                              </div>
                                              <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                                                <Globe className="w-3 h-3" />
                                                {citation.domain}
                                              </div>
                                              <p className="text-sm text-gray-700 leading-relaxed">
                                                {citation.snippet}
                                              </p>
                                              <a 
                                                href={citation.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 mt-2 text-xs text-blue-600 hover:text-blue-800"
                                              >
                                                Read more →
                                              </a>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                {action.type === 'code' && (
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-gray-600">Language:</span>
                                      <span>{action.details.language}</span>
                                    </div>
                                    {action.details.framework && (
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-600">Framework:</span>
                                        <span>{action.details.framework}</span>
                                      </div>
                                    )}
                                    {action.details.codeExample && (
                                      <div className="mt-2">
                                        <div className="font-medium text-gray-600 mb-1">Code:</div>
                                        <div className="rounded overflow-hidden">
                                          <SyntaxHighlighter 
                                            language="python" 
                                            style={tomorrow}
                                            className="text-xs"
                                            customStyle={{
                                              margin: 0,
                                              borderRadius: '0.375rem',
                                              fontSize: '0.75rem'
                                            }}
                                          >
                                            {action.details.codeExample}
                                          </SyntaxHighlighter>
                                        </div>
                                      </div>
                                    )}
                                    {action.status === 'running' && action.details.currentStep && (
                                      <div className="flex items-center gap-2">
                                        <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
                                        <span className="text-blue-600">{action.details.currentStep}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                {action.type === 'confluence' && (
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-gray-600">Query:</span>
                                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{action.details.searchQuery}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs">
                                      <span><strong>Space:</strong> {action.details.space}</span>
                                      <span><strong>Results:</strong> {action.details.resultsFound}</span>
                                      <span><strong>Time:</strong> {action.details.executionTime}</span>
                                    </div>
                                    
                                    {/* Confluence Results */}
                                    {action.details.confluenceResults && action.details.confluenceResults.length > 0 && (
                                      <div className="space-y-2">
                                        <div className="font-medium text-gray-600">Confluence Documentation Found:</div>
                                        <div className="space-y-3 max-h-96 overflow-y-auto">
                                          {action.details.confluenceResults.map((result, i) => (
                                            <div key={i} className="border border-gray-200 rounded-lg p-3 bg-white">
                                              <div className="flex items-start justify-between gap-2 mb-2">
                                                <a 
                                                  href={result.url} 
                                                  target="_blank" 
                                                  rel="noopener noreferrer"
                                                  className="text-blue-600 hover:text-blue-800 font-medium text-sm leading-tight hover:underline"
                                                >
                                                  {result.title}
                                                </a>
                                                <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">
                                                  {result.pageType}
                                                </span>
                                              </div>
                                              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                                                <span className="flex items-center gap-1">
                                                  <FileText className="w-3 h-3" />
                                                  {result.space}
                                                </span>
                                                <span>by {result.author}</span>
                                                <span>updated {result.lastModified}</span>
                                              </div>
                                              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                                                {result.snippet}
                                              </p>
                                              <div className="flex items-center gap-1 mb-2">
                                                {result.labels.map((label, idx) => (
                                                  <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                    {label}
                                                  </span>
                                                ))}
                                              </div>
                                              <a 
                                                href={result.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                                              >
                                                Open in Confluence →
                                              </a>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                {action.type === 'salesforce-login' && (
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-4 text-xs">
                                      <span><strong>Org:</strong> {action.details.org}</span>
                                      <span><strong>Username:</strong> {action.details.username}</span>
                                      <span><strong>Method:</strong> {action.details.loginMethod}</span>
                                      <span><strong>Last Login:</strong> {action.details.lastLogin}</span>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <div className="font-medium text-gray-600">Session Status:</div>
                                      {action.details.sessionStatus === 'expired' ? (
                                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                                          <div className="flex items-center gap-2 mb-2">
                                            <AlertCircle className="w-4 h-4 text-orange-600" />
                                            <span className="text-sm font-medium text-orange-800">Session Expired</span>
                                          </div>
                                          <div className="text-xs text-orange-700 space-y-2">
                                            <div>Your Salesforce session has expired. Please refresh to continue.</div>
                                            <div className="flex items-center gap-1">
                                              <strong>Required Permissions:</strong>
                                              <div className="flex gap-1 flex-wrap">
                                                {action.details.permissions.map((perm, i) => (
                                                  <span key={i} className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs">
                                                    {perm}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                          <button
                                            onClick={() => setShowSalesforceModal(true)}
                                            className="mt-2 w-full px-3 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                                          >
                                            Refresh Salesforce Session
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                          <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            <span className="text-sm font-medium text-green-800">Session Active</span>
                                          </div>
                                          <div className="text-xs text-green-700 space-y-1">
                                            <div><strong>Session ID:</strong> {action.details.sessionId}</div>
                                            <div className="flex items-center gap-1">
                                              <strong>Permissions:</strong>
                                              <div className="flex gap-1 flex-wrap">
                                                {action.details.permissions.map((perm, i) => (
                                                  <span key={i} className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
                                                    {perm}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                                
                                {action.type === 'salesforce' && (
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-4 text-xs">
                                      <span><strong>Language:</strong> {action.details.language}</span>
                                      <span><strong>Operation:</strong> {action.details.operation}</span>
                                      <span><strong>Org:</strong> {action.details.org}</span>
                                      <span><strong>Time:</strong> {action.details.executionTime || action.details.estimatedTime}</span>
                                    </div>
                                    
                                    {action.status === 'awaiting_user_action' && action.details.waitingFor && (
                                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                          <AlertCircle className="w-4 h-4 text-orange-600" />
                                          <span className="text-sm font-medium text-orange-800">Awaiting User Action</span>
                                        </div>
                                        <div className="text-xs text-orange-700 space-y-1">
                                          <div><strong>Waiting for:</strong> {action.details.waitingFor}</div>
                                          {action.details.dependsOn && (
                                            <div className="flex items-center gap-2">
                                              <strong>Depends on:</strong>
                                              <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs">
                                                {action.details.dependsOn}
                                              </span>
                                              <span className="text-xs text-orange-600">
                                                ({action.details.dependencyStatus?.replace('_', ' ')})
                                              </span>
                                            </div>
                                          )}
                                          {action.details.blockedReason && (
                                            <div className="text-xs text-orange-600 italic">
                                              {action.details.blockedReason}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {action.details.apexCode && (
                                      <div className="space-y-2">
                                        <div className="font-medium text-gray-600">APEX Code:</div>
                                        <div className="rounded overflow-hidden">
                                          <SyntaxHighlighter 
                                            language="java" 
                                            style={tomorrow}
                                            className="text-xs"
                                            customStyle={{
                                              margin: 0,
                                              borderRadius: '0.375rem',
                                              fontSize: '0.75rem'
                                            }}
                                          >
                                            {action.details.apexCode}
                                          </SyntaxHighlighter>
                                        </div>
                                      </div>
                                    )}
                                    
                                    {action.details.results && (
                                      <div className="space-y-2">
                                        <div className="font-medium text-gray-600">Execution Results:</div>
                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                          <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                                            <div><strong>Leads Analyzed:</strong> {action.details.results.leadsAnalyzed?.toLocaleString()}</div>
                                            <div><strong>Active Rules:</strong> {action.details.results.activeRules}</div>
                                            <div><strong>Average Score:</strong> {action.details.results.averageScore}</div>
                                          </div>
                                          {action.details.results.scoreDistribution && (
                                            <div>
                                              <div className="font-medium text-gray-600 mb-2 text-xs">Score Distribution:</div>
                                              <div className="space-y-1">
                                                {Object.entries(action.details.results.scoreDistribution).map(([range, count]) => (
                                                  <div key={range} className="flex justify-between items-center text-xs">
                                                    <span className="text-gray-600">{range}:</span>
                                                    <span className="font-medium">{count} leads</span>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                {/* Logs */}
                                {action.details.logs && action.details.logs.length > 0 && (
                                  <div className="mt-3 pt-3 border-t border-gray-200">
                                    <div className="font-medium text-gray-600 mb-2">Logs:</div>
                                    <div className="space-y-1 max-h-32 overflow-y-auto">
                                      {action.details.logs.map((log, i) => (
                                        <div key={i} className="flex gap-2 text-xs font-mono">
                                          <span className="text-gray-500">[{log.time}]</span>
                                          <span className="text-gray-700">{log.message}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {/* Duration for completed actions */}
                                {action.status === 'completed' && action.endTime && (
                                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-200">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    <span>Completed at {action.endTime}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span className="font-medium">Send</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Salesforce Login Modal */}
      {showSalesforceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Salesforce Login</h3>
              </div>
              <button
                onClick={() => setShowSalesforceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salesforce Org URL
                </label>
                <input
                  type="text"
                  defaultValue="https://yourcompany.my.salesforce.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="email"
                  defaultValue="admin@yourcompany.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Authentication Method
                </label>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">OAuth 2.0 (Connected)</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Details
                </label>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="text-xs text-green-700 space-y-1">
                    <div><strong>Session ID:</strong> sf-session-abc123</div>
                    <div><strong>Org ID:</strong> 00D000000000000EAA</div>
                    <div><strong>Login Time:</strong> 10:28:47</div>
                    <div><strong>Expires:</strong> 10:28:47 + 2 hours</div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSalesforceModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleSalesforceRefresh}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Refresh Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgenticChatInterface;