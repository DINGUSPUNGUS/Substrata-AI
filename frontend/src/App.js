import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import FieldSurveys from './components/FieldSurveys';
import Projects from './components/Projects';
import Stakeholders from './components/Stakeholders';
import Grants from './components/Grants';
import Analytics from './components/Analytics';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: '📊', current: true },
    { name: 'Field Surveys', href: '/field-surveys', icon: '🔍', current: false },
    { name: 'Projects', href: '/projects', icon: '🌿', current: false },
    { name: 'Stakeholders', href: '/stakeholders', icon: '👥', current: false },
    { name: 'Grants', href: '/grants', icon: '💰', current: false },
    { name: 'Analytics', href: '/analytics', icon: '📈', current: false },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-slate-900">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 ${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
          <div className="flex h-full flex-col bg-slate-800 border-r border-green-500/20">
            {/* Logo */}
            <div className="flex h-16 items-center px-6 border-b border-green-500/20">
              <div className="flex items-center">
                <span className="text-2xl">🌱</span>
                {sidebarOpen && (
                  <div className="ml-3">
                    <h1 className="text-xl font-bold text-green-400">Substrata.AI</h1>
                    <p className="text-xs text-slate-400">Conservation Platform</p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-green-500/10 hover:text-green-400 transition-colors"
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {sidebarOpen && item.name}
                </Link>
              ))}
            </nav>

            {/* Toggle Button */}
            <div className="p-4 border-t border-green-500/20">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-full flex items-center justify-center px-2 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-green-500/10 hover:text-green-400 transition-colors"
              >
                {sidebarOpen ? '◀' : '▶'}
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className={`${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
          {/* Top bar */}
          <header className="bg-slate-800/50 border-b border-green-500/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Conservation Dashboard</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="status-indicator status-active"></span>
                  <span className="text-sm text-slate-400">System Operational</span>
                </div>
                <div className="text-sm text-slate-400">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/field-surveys" element={<FieldSurveys />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/stakeholders" element={<Stakeholders />} />
              <Route path="/grants" element={<Grants />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
