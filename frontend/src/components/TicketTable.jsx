import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { Eye } from 'lucide-react';

const TicketTable = ({ tickets }) => {
  return (
    <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-3.5">Ticket ID</th>
            <th className="px-6 py-3.5">Customer</th>
            <th className="px-6 py-3.5">Subject</th>
            <th className="px-6 py-3.5">Status</th>
            <th className="px-6 py-3.5">Date</th>
            <th className="px-6 py-3.5 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {tickets.map((ticket) => (
            <tr key={ticket.ticket_id} className="hover:bg-slate-50/80 transition-colors">
              <td className="px-6 py-4 font-semibold text-blue-600">{ticket.ticket_id}</td>
              <td className="px-6 py-4">
                <div className="font-medium text-slate-900">{ticket.customer_name}</div>
                <div className="text-xs text-slate-500">{ticket.customer_email}</div>
              </td>
              <td className="px-6 py-4 text-slate-800 font-medium max-w-xs truncate">
                {ticket.subject}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={ticket.status} />
              </td>
              <td className="px-6 py-4 text-slate-500 text-xs">
                {new Date(ticket.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
              <td className="px-6 py-4 text-right">
                <Link
                  to={`/tickets/${ticket.ticket_id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2.5 py-1.5 rounded-md transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;