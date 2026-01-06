import React, { useState } from 'react';
import EvidenceVault from './screens/EvidenceVault'; // Adjust path
import EvidenceDetail from './screens/EvidenceDetail'; // Adjust path
import BuyerRequestToDo from './screens/BuyerRequestToDo'; // Adjust path
import { MOCK_EVIDENCE, MOCK_BUYER_REQUESTS } from './data/mockData'; // Adjust path

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('vault');
  const [selectedEvidenceId, setSelectedEvidenceId] = useState(null);
  const [evidence, setEvidence] = useState(MOCK_EVIDENCE);
  const [requests, setRequests] = useState(MOCK_BUYER_REQUESTS);
  const renderScreen = () => {
    switch (currentScreen) {
      case 'vault':
        return (
          <EvidenceVault
            onSelectEvidence={(id) => {
              setSelectedEvidenceId(id);
              setCurrentScreen('detail');
            }}
            evidence={evidence}
            setEvidence={setEvidence}
          />
        );
      case 'detail':
        return (
          <EvidenceDetail
            evidenceId={selectedEvidenceId}
            onBack={() => setCurrentScreen('vault')}
            evidence={evidence}
            setEvidence={setEvidence}
          />
        );
      case 'requests':
        return (
          <BuyerRequestToDo
            evidence={evidence}
            requests={requests}
            setRequests={setRequests}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="text-xl font-bold">SentryLink Comply</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentScreen('vault')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentScreen === 'vault' || currentScreen === 'detail'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Evidence Vault
              </button>
              <button
                onClick={() => setCurrentScreen('requests')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentScreen === 'requests'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Buyer Requests
                {requests.filter(r => r.status === 'pending').length > 0 && (
                  <span className="ml-2 bg-yellow-500 text-white px-2 py-0.5 rounded-full text-xs">
                    {requests.filter(r => r.status === 'pending').length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {renderScreen()}
    </div>
  );
};

export default App;