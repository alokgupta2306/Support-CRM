import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/api';
import StatusBadge from '../components/StatusBadge';
import {
  ArrowLeft,
  Clock,
  User,
  Mail,
  MessageSquare,
  Send,
  RefreshCw,
  AlertCircle,
  Check,
} from 'lucide-react';

const TicketDetail = () => {
  const { ticket_id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [status, setStatus] = useState('');
  const [newNote, setNewNote] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const fetchTicketDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get(`/tickets/${ticket_id}`);
      setTicket(response.data);
      setNotes(response.data.notes || []);
      setStatus(response.data.status);
    } catch (err) {
      setError(err.response?.data?.message || 'Ticket not found or error loading data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketDetails();
  }, [ticket_id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateSuccess(false);

    try {
      const response = await API.put(`/tickets/${ticket_id}`, {
        status,
        note_text: newNote,
      });

      setTicket(response.data.ticket);
      setNotes(response.data.notes);
      setNewNote('');
      setUpdateSuccess(true);

      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update ticket');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
        <p className="text-slate-500 text-sm font-medium">Fetching ticket details...</p>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tickets
        </Link>
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <div>
            <h3 className="font-bold text-base">Error Loading Ticket</h3>
            <p className="text-sm mt-0.5">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tickets
        </Link>

        {updateSuccess && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full animate-fade-in">
            <Check className="w-3.5 h-3.5" /> Changes saved successfully
          </span>
        )}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2-Columns: Ticket Details & Notes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                {ticket.ticket_id}
              </span>
              <StatusBadge status={ticket.status} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">{ticket.subject}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {ticket.customer_name}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {ticket.customer_email}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Created {new Date(ticket.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-200/60">
                {ticket.description}
              </p>
            </div>
          </div>

          {/* Activity / Notes Timeline */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              Activity & Internal Notes ({notes.length})
            </h3>

            {/* Note Input */}
            <form onSubmit={handleUpdate} className="space-y-3 pt-2">
              <textarea
                rows="3"
                placeholder="Add a new internal note or status update response..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 focus:bg-white transition-colors"
              ></textarea>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-semibold text-slate-600">Status:</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-slate-300 rounded-md text-xs py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs transition disabled:opacity-50 shadow-sm"
                >
                  {updating ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  Save Update
                </button>
              </div>
            </form>

            {/* Notes List */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              {notes.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No notes added yet.</p>
              ) : (
                notes.map((note) => (
                  <div
                    key={note._id || note.created_at}
                    className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80 space-y-1"
                  >
                    <p className="text-xs text-slate-700 leading-normal">{note.note_text}</p>
                    <span className="text-[10px] text-slate-400 block pt-1">
                      {new Date(note.created_at).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right 1-Column Sidebar: Ticket Meta Overview */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              Ticket Details
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Customer Name</span>
                <span className="text-slate-800 font-semibold">{ticket.customer_name}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Customer Email</span>
                <span className="text-slate-800 font-semibold break-all">{ticket.customer_email}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Status</span>
                <div className="mt-1">
                  <StatusBadge status={ticket.status} />
                </div>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Created On</span>
                <span className="text-slate-700">
                  {new Date(ticket.created_at).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Last Updated</span>
                <span className="text-slate-700">
                  {new Date(ticket.updated_at).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;