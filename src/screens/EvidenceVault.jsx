import React, { useState, useMemo } from 'react';
import { Search, Filter, Upload, MoreVertical } from 'lucide-react';
import StatusChip from '../components/StatusChip'; // Adjust path as needed
import Button from '../components/Button'; // Adjust path as needed
import EmptyState from '../components/EmptyState'; // Adjust path as needed

const EvidenceVault = ({ onSelectEvidence, evidence, setEvidence }) => {
  const [filters, setFilters] = useState({
    docType: '',
    status: '',
    expiry: 'all',
    search: ''
  });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const docTypes = [...new Set(evidence.map(e => e.docType))];
  const statuses = ['active', 'expiring', 'expired'];
  const filteredEvidence = useMemo(() => {
    return evidence.filter(ev => {
      if (filters.docType && ev.docType !== filters.docType) return false;
      if (filters.status && ev.status !== filters.status) return false;
      if (filters.search && !ev.docName.toLowerCase().includes(filters.search.toLowerCase())) return false;
     
      if (filters.expiry === 'expired' && ev.status !== 'expired') return false;
      if (filters.expiry === 'expiring' && ev.status !== 'expiring') return false;
     
      return true;
    });
  }, [evidence, filters]);
  const toggleRow = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };
  const toggleAll = () => {
    if (selectedRows.size === filteredEvidence.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredEvidence.map(e => e.id)));
    }
  };
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Evidence Vault</h1>
          <p className="text-gray-600 mt-1">Manage your compliance documents</p>
        </div>
        <Button onClick={() => alert('Upload new evidence')}>
          <Upload className="w-4 h-4 inline mr-2" />
          Upload Evidence
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button variant="secondary" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 inline mr-2" />
              Filters
            </Button>
          </div>
          {showFilters && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              <select
                value={filters.docType}
                onChange={(e) => setFilters({ ...filters, docType: e.target.value })}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Doc Types</option>
                {docTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
              <select
                value={filters.expiry}
                onChange={(e) => setFilters({ ...filters, expiry: e.target.value })}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Expiry</option>
                <option value="expiring">Expiring Soon</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          )}
        </div>
        {selectedRows.size > 0 && (
          <div className="p-4 bg-blue-50 border-b flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.size} document{selectedRows.size > 1 ? 's' : ''} selected
            </span>
            <Button variant="primary" onClick={() => alert(`Adding ${selectedRows.size} documents to pack`)}>
              <Package className="w-4 h-4 inline mr-2" />
              Add to Pack
            </Button>
          </div>
        )}
        {filteredEvidence.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No documents found"
            description="Try adjusting your filters or upload new evidence"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === filteredEvidence.length && filteredEvidence.length > 0}
                      onChange={toggleAll}
                      className="rounded"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doc Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doc Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Versions</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredEvidence.map(ev => (
                  <tr key={ev.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(ev.id)}
                        onChange={() => toggleRow(ev.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onSelectEvidence(ev.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-left"
                      >
                        {ev.docName}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{ev.docType}</td>
                    <td className="px-4 py-3">
                      <StatusChip status={ev.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{ev.expiryDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{ev.versions.length}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{ev.lastUpdated}</td>
                    <td className="px-4 py-3">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvidenceVault;