import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Search, Database, Code, Loader2, CheckCircle, AlertCircle, Bot, User, Sparkles, FileText, Globe, Terminal, ChevronDown, ChevronUp, Clock, Activity, Shield, ShieldCheck, X, Check, AlertTriangle } from 'lucide-react';
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
    }
  ]);
  
  const [expandedActions, setExpandedActions] = useState(new Set());
  const [trustMode, setTrustMode] = useState(false);
  const [trustedSession, setTrustedSession] = useState(false);
  
  const [inputValue, setInputValue] = useState('');
  const [activeThread, setActiveThread] = useState(1);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
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
              description: 'Searching for relevant data', 
              icon: Globe,
              startTime: new Date().toLocaleTimeString(),
              approved: trustedSession,
              details: {
                searchQuery: inputValue,
                sources: ['Web', 'Internal Docs', 'Knowledge Base'],
                estimatedTime: '2-5 seconds',
                potentialRisks: ['External web access', 'API rate limits may apply'],
                logs: trustedSession ? [
                  { time: new Date().toLocaleTimeString(), message: 'Auto-approved: Trust mode enabled' },
                  { time: new Date().toLocaleTimeString(), message: 'Starting search process...' }
                ] : []
              }
            },
            { 
              id: `action-${Date.now()}-2`,
              type: 'code', 
              status: 'pending', 
              description: 'Preparing analysis', 
              icon: Terminal,
              details: {
                language: 'Python',
                estimatedTime: '5-10 seconds',
                logs: []
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
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          actions: msg.actions.map(action => {
            if (action.id === actionId) {
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
  
  const getActionStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 border-green-300';
      case 'running': return 'bg-blue-100 border-blue-300 animate-pulse';
      case 'error': return 'bg-red-100 border-red-300';
      case 'rejected': return 'bg-red-100 border-red-300';
      case 'pending_approval': return 'bg-yellow-100 border-yellow-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
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
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-gray-600' : 'bg-blue-600'
                }`}>
                  {message.type === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                </div>
                
                <div className="flex-1">
                  <div className={`rounded-lg px-4 py-3 ${
                    message.type === 'user' ? 'bg-gray-600 text-white' : 'bg-white border border-gray-200'
                  }`}>
                    <p className={message.type === 'user' ? 'text-white' : 'text-gray-800'}>{message.content}</p>
                  </div>
                  
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
                                  {action.details?.potentialRisks && (
                                    <div className="mt-2">
                                      <p className="text-xs font-medium text-gray-700">Potential risks:</p>
                                      <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                                        {action.details.potentialRisks.map((risk, i) => (
                                          <li key={i}>{risk}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
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
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${getActionStatusColor(action.status)} transition-all cursor-pointer hover:shadow-sm`}
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
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-gray-600">Results:</span>
                                      <span>{action.details.resultsCount} found</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-gray-600">Sources:</span>
                                      <div className="flex gap-1">
                                        {action.details.sources?.map((source, i) => (
                                          <span key={i} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                            {source}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
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
          <div ref={messagesEndRef} />
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
    </div>
  );
};

export default AgenticChatInterface;