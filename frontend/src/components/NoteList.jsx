import React from 'react';

const NoteList = ({ notes }) => {
  if (!notes || notes.length === 0) {
    return <p className="text-xs text-slate-400 italic">No notes added yet.</p>;
  }

  return (
    <div className="space-y-3 pt-4 border-t border-slate-100">
      {notes.map((note) => (
        <div
          key={note._id || note.created_at}
          className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80 space-y-1"
        >
          <p className="text-xs text-slate-700 leading-normal">{note.note_text}</p>
          <span className="text-[10px] text-slate-400 block pt-1">
            {new Date(note.created_at).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NoteList;