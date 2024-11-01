import React from 'react';
import { Globe2, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  onNavigate: (view: 'note' | 'templates' | 'history') => void;
  currentView: string;
}

export default function Header({ onLogout, onNavigate, currentView }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Globe2 className="w-8 h-8 text-blue-600" />
            <h1 
              className="text-xl font-semibold text-gray-900 cursor-pointer"
              onClick={() => onNavigate('note')}
            >
              Note Verbal Management
            </h1>
          </div>
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('templates')}
              className={`text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium ${
                currentView === 'templates' ? 'text-blue-600' : ''
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => onNavigate('history')}
              className={`text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium ${
                currentView === 'history' ? 'text-blue-600' : ''
              }`}
            >
              History
            </button>
            <button
              onClick={onLogout}
              className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}