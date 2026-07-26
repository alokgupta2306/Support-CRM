import React from 'react';

const StatusBadge = ({ status }) => {
  let badgeStyles = "bg-slate-100 text-slate-700 border-slate-300";

  if (status === 'Open') {
    badgeStyles = "bg-emerald-50 text-emerald-700 border-emerald-200";
  } else if (status === 'In Progress') {
    badgeStyles = "bg-amber-50 text-amber-700 border-amber-200";
  } else if (status === 'Closed') {
    badgeStyles = "bg-slate-100 text-slate-600 border-slate-200";
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyles}`}>
      {status}
    </span>
  );
};

export default StatusBadge;