import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const TicketCard = ({ ticket }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-blue-600 text-sm">{ticket.ticket_id}</span>
        <StatusBadge status={ticket.status} />
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 text-base">{ticket.subject}</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {ticket.customer_name} ({ticket.customer_email})
        </p>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
        <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
        <Link
          to={`/tickets/${ticket.ticket_id}`}
          className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default TicketCard;