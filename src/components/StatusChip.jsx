import React from 'react';

const StatusChip = ({ status }) => {
  const config = {
    active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
    expiring: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Expiring Soon' },
    expired: { bg: 'bg-red-100', text: 'text-red-800', label: 'Expired' },
    pending: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Pending' },
    fulfilled: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Fulfilled' }
  };
  const { bg, text, label } = config[status] || config.active;
  return (
    <span className={`${bg} ${text} px-2 py-1 rounded-full text-xs font-medium`}>
      {label}
    </span>
  );
};

export default StatusChip;