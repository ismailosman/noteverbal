import React, { useState } from 'react';
import { FileText, Eye } from 'lucide-react';
import NoteForm from './components/NoteForm';
import Preview from './components/Preview';
import Header from './components/Header';
import Login from './components/Login';
import Templates from './components/Templates';
import History from './components/History';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [currentView, setCurrentView] = useState<'note' | 'templates' | 'history'>('note');
  const [formData, setFormData] = useState({
    sender: '',
    recipient: '',
    subject: '',
    body: '',
    place: '',
    date: new Date().toISOString().split('T')[0],
    reference: ''
  });

  const handleFormChange = (data: typeof formData) => {
    setFormData(data);
  };

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'newyork') {
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'templates':
        return <Templates onSelect={(template) => {
          setFormData(template);
          setCurrentView('note');
        }} />;
      case 'history':
        return <History onSelect={(note) => {
          setFormData(note);
          setCurrentView('note');
        }} />;
      default:
        return (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('edit')}
                className={`flex items-center px-6 py-4 focus:outline-none ${
                  activeTab === 'edit'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                <FileText className="w-5 h-5 mr-2" />
                Edit Note
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center px-6 py-4 focus:outline-none ${
                  activeTab === 'preview'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                <Eye className="w-5 h-5 mr-2" />
                Preview
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'edit' ? (
                <NoteForm data={formData} onChange={handleFormChange} />
              ) : (
                <Preview data={formData} />
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header 
        onLogout={() => setIsAuthenticated(false)} 
        onNavigate={setCurrentView}
        currentView={currentView}
      />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}