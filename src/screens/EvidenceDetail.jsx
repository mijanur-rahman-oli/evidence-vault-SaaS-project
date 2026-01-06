import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import StatusChip from '../components/StatusChip'; // Adjust path
import Button from '../components/Button'; // Adjust path
import Modal from '../components/Modal'; // Adjust path

const EvidenceDetail = ({ evidenceId, onBack, evidence, setEvidence }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({ notes: '', expiryDate: '', file: null });
  const [isUploading, setIsUploading] = useState(false);
  const ev = evidence.find(e => e.id === evidenceId);
  if (!ev) return <div className="p-6">Evidence not found</div>;
  const handleUpload = () => {
    if (!uploadForm.notes.trim()) {
      alert('Notes are required');
      return;
    }
    setIsUploading(true);
    setTimeout(() => {
      const newVersion = {
        version: ev.versions.length + 1,
        uploadedDate: new Date().toISOString().split('T')[0],
        uploadedBy: 'Current User',
        notes: uploadForm.notes,
        fileSize: '2.5 MB'
      };
      const updatedEvidence = evidence.map(e => {
        if (e.id === evidenceId) {
          return {
            ...e,
            versions: [...e.versions, newVersion],
            lastUpdated: newVersion.uploadedDate,
            ...(uploadForm.expiryDate && { expiryDate: uploadForm.expiryDate })
          };
        }
        return e;
      });
      setEvidence(updatedEvidence);
      setUploadForm({ notes: '', expiryDate: '', file: null });
      setShowUploadModal(false);
      setIsUploading(false);
    }, 1000);
  };
  return (
    <div className="p-6">
      <button onClick={onBack} className="text-blue-600 hover:text-blue-800 mb-4 flex items-center">
        ← Back to Vault
      </button>
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{ev.docName}</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Type: {ev.docType}</span>
              <StatusChip status={ev.status} />
            </div>
          </div>
          <Button onClick={() => setShowUploadModal(true)}>
            <Upload className="w-4 h-4 inline mr-2" />
            Upload New Version
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <div className="text-xs text-gray-500 uppercase mb-1">Expiry Date</div>
            <div className="font-medium">{ev.expiryDate}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase mb-1">Total Versions</div>
            <div className="font-medium">{ev.versions.length}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase mb-1">Last Updated</div>
            <div className="font-medium">{ev.lastUpdated}</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Version History</h2>
        </div>
        <div className="divide-y">
          {[...ev.versions].reverse().map(version => (
            <div key={version.version} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-lg">Version {version.version}</span>
                    {version.version === ev.versions.length && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Uploaded by {version.uploadedBy} on {version.uploadedDate}
                  </div>
                  <div className="text-sm text-gray-800 mb-2">{version.notes}</div>
                  <div className="text-xs text-gray-500">File size: {version.fileSize}</div>
                </div>
                <Button variant="secondary">Download</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={showUploadModal}
        onClose={() => !isUploading && setShowUploadModal(false)}
        title="Upload New Version"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes <span className="text-red-500">*</span>
            </label>
            <textarea
              value={uploadForm.notes}
              onChange={(e) => setUploadForm({ ...uploadForm, notes: e.target.value })}
              placeholder="Describe changes in this version..."
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isUploading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date (Optional)
            </label>
            <input
              type="date"
              value={uploadForm.expiryDate}
              onChange={(e) => setUploadForm({ ...uploadForm, expiryDate: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isUploading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File Upload
            </label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <input
                type="file"
                onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files[0] })}
                className="hidden"
                id="file-upload"
                disabled={isUploading}
              />
              <label htmlFor="file-upload" className="text-blue-600 hover:text-blue-800 cursor-pointer">
                Choose file
              </label>
              {uploadForm.file && (
                <div className="mt-2 text-sm text-gray-600">{uploadForm.file.name}</div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowUploadModal(false)} disabled={isUploading}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload Version'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EvidenceDetail;