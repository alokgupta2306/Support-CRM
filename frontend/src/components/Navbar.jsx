import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ticket, PlusCircle, Headset } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl tracking-tight">
          <Headset className="w-6 h-6" />
          <span className="text-slate-900">Support<span className="text-blue-600">CRM</span></span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === '/' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Ticket className="w-4 h-4" />
            Tickets
          </Link>
          <Link
            to="/tickets/new"
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            New Ticket
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;