import React, { useState } from 'react';
import { FileText, Calendar, Check, AlertCircle } from 'lucide-react';
import StatusChip from '../components/StatusChip'; // Adjust path
import Button from '../components/Button'; // Adjust path
import Modal from '../components/Modal'; // Adjust path
import EmptyState from '../components/EmptyState'; // Adjust path

const BuyerRequestToDo = ({ evidence, requests, setRequests }) => {
  const [showFulfillModal, setShowFulfillModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [fulfillMethod, setFulfillMethod] = useState('existing');
  const [selectedEvidence, setSelectedEvidence] = useState('');
  const [isFulfilling, setIsFulfilling] = useState(false);
  const openFulfillModal = (request) => {
    setSelectedRequest(request);
    setShowFulfillModal(true);
  };
  const handleFulfill = () => {
    if (fulfillMethod === 'existing' && !selectedEvidence) {
      alert('Please select evidence');
      return;
    }
    setIsFulfilling(true);
    setTimeout(() => {
      const updatedRequests = requests.map(req => {
        if (req.id === selectedRequest.id) {
          return {
            ...req,
            status: 'fulfilled',
            fulfilledWith: fulfillMethod === 'existing' ? selectedEvidence : 'ev-new',
            fulfilledDate: new Date().toISOString().split('T')[0]
          };
        }
        return req;
      });
      setRequests(updatedRequests);
      setShowFulfillModal(false);
      setSelectedEvidence('');
      setFulfillMethod('existing');
      setIsFulfilling(false);
    }, 800);
  };
  const matchingEvidence = evidence.filter(ev =>
    selectedRequest && ev.docType === selectedRequest.requiredDocType
  );
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const fulfilledCount = requests.filter(r => r.status === 'fulfilled').length;
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Buyer Requests</h1>
        <p className="text-gray-600 mt-1">Fulfill compliance documentation requests</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="text-sm text-gray-500 mb-1">Total Requests</div>
          <div className="text-3xl font-bold">{requests.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="text-sm text-gray-500 mb-1">Pending</div>
          <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="text-sm text-gray-500 mb-1">Fulfilled</div>
          <div className="text-3xl font-bold text-green-600">{fulfilledCount}</div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border">
        {requests.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No requests"
            description="You're all caught up! No pending buyer requests."
          />
        ) : (
          <div className="divide-y">
            {requests.map(request => (
              <div key={request.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{request.buyerName}</h3>
                      <StatusChip status={request.status} />
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Required: {request.requiredDocType}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Due: {request.dueDate}
                      </div>
                      {request.status === 'fulfilled' && (
                        <div className="flex items-center gap-2 text-green-600">
                          <Check className="w-4 h-4" />
                          Fulfilled on {request.fulfilledDate}
                        </div>
                      )}
                    </div>
                  </div>
                  {request.status === 'pending' && (
                    <Button onClick={() => openFulfillModal(request)}>
                      Fulfill Request
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={showFulfillModal}
        onClose={() => !isFulfilling && setShowFulfillModal(false)}
        title="Fulfill Request"
        size="lg"
      >
        {selectedRequest && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Request Details</div>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Buyer: {selectedRequest.buyerName}</div>
                <div>Required: {selectedRequest.requiredDocType}</div>
                <div>Due: {selectedRequest.dueDate}</div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How would you like to fulfill this request?
              </label>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value="existing"
                    checked={fulfillMethod === 'existing'}
                    onChange={(e) => setFulfillMethod(e.target.value)}
                    className="mt-1"
                    disabled={isFulfilling}
                  />
                  <div>
                    <div className="font-medium">Select from Evidence Vault</div>
                    <div className="text-sm text-gray-600">Choose existing documentation</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value="new"
                    checked={fulfillMethod === 'new'}
                    onChange={(e) => setFulfillMethod(e.target.value)}
                    className="mt-1"
                    disabled={isFulfilling}
                  />
                  <div>
                    <div className="font-medium">Create New Evidence</div>
                    <div className="text-sm text-gray-600">Upload new documentation</div>
                  </div>
                </label>
              </div>
            </div>
            {fulfillMethod === 'existing' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Evidence
                </label>
                {matchingEvidence.length === 0 ? (
                  <div className="text-sm text-gray-600 p-4 bg-yellow-50 rounded-lg">
                    <AlertCircle className="w-4 h-4 inline mr-2" />
                    No matching evidence found. Try creating new evidence instead.
                  </div>
                ) : (
                  <select
                    value={selectedEvidence}
                    onChange={(e) => setSelectedEvidence(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isFulfilling}
                  >
                    <option value="">Choose evidence...</option>
                    {matchingEvidence.map(ev => (
                      <option key={ev.id} value={ev.id}>
                        {ev.docName} (v{ev.versions.length}) - {ev.status}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
            {fulfillMethod === 'new' && (
              <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
                <AlertCircle className="w-4 h-4 inline mr-2" />
                This will open the upload flow to create new evidence (mocked for demo)
              </div>
            )}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="secondary" onClick={() => setShowFulfillModal(false)} disabled={isFulfilling}>
                Cancel
              </Button>
              <Button
                onClick={handleFulfill}
                disabled={isFulfilling || (fulfillMethod === 'existing' && !selectedEvidence)}
              >
                {isFulfilling ? 'Fulfilling...' : 'Fulfill Request'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BuyerRequestToDo;