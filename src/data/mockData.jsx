export const MOCK_EVIDENCE = [
  {
    id: 'ev-001',
    docName: 'ISO 9001:2015 Certificate',
    docType: 'Quality Certification',
    status: 'active',
    expiryDate: '2025-12-31',
    versions: [
      { version: 1, uploadedDate: '2024-01-15', uploadedBy: 'John Chen', notes: 'Initial certification', fileSize: '2.3 MB' },
      { version: 2, uploadedDate: '2024-06-20', uploadedBy: 'Sarah Kim', notes: 'Annual renewal', fileSize: '2.5 MB' },
      { version: 3, uploadedDate: '2025-01-05', uploadedBy: 'John Chen', notes: 'Updated scope expansion', fileSize: '2.8 MB' }
    ],
    lastUpdated: '2025-01-05'
  },
  {
    id: 'ev-002',
    docName: 'BSCI Audit Report',
    docType: 'Social Compliance',
    status: 'expiring',
    expiryDate: '2026-02-28',
    versions: [
      { version: 1, uploadedDate: '2024-03-10', uploadedBy: 'Maria Garcia', notes: 'Initial audit passed', fileSize: '5.1 MB' },
      { version: 2, uploadedDate: '2024-09-15', uploadedBy: 'Maria Garcia', notes: 'Follow-up audit - all findings closed', fileSize: '5.4 MB' }
    ],
    lastUpdated: '2024-09-15'
  },
  {
    id: 'ev-003',
    docName: 'Fire Safety Inspection',
    docType: 'Safety Certificate',
    status: 'expired',
    expiryDate: '2025-01-01',
    versions: [
      { version: 1, uploadedDate: '2024-01-01', uploadedBy: 'Li Wei', notes: 'Annual inspection', fileSize: '1.8 MB' }
    ],
    lastUpdated: '2024-01-01'
  },
  {
    id: 'ev-004',
    docName: 'Product Safety Test Report',
    docType: 'Product Testing',
    status: 'active',
    expiryDate: '2026-06-30',
    versions: [
      { version: 1, uploadedDate: '2024-07-01', uploadedBy: 'John Chen', notes: 'Q2 2024 testing batch', fileSize: '3.2 MB' },
      { version: 2, uploadedDate: '2024-10-15', uploadedBy: 'Sarah Kim', notes: 'Q3 2024 testing batch', fileSize: '3.5 MB' }
    ],
    lastUpdated: '2024-10-15'
  },
  {
    id: 'ev-005',
    docName: 'Environmental Permit',
    docType: 'Environmental',
    status: 'active',
    expiryDate: '2027-03-15',
    versions: [
      { version: 1, uploadedDate: '2024-03-15', uploadedBy: 'Li Wei', notes: 'New facility permit', fileSize: '4.1 MB' }
    ],
    lastUpdated: '2024-03-15'
  }
];

export const MOCK_BUYER_REQUESTS = [
  {
    id: 'req-001',
    buyerName: 'GlobalRetail Corp',
    requiredDocType: 'Quality Certification',
    dueDate: '2026-02-15',
    status: 'fulfilled',
    fulfilledWith: 'ev-001',
    fulfilledDate: '2026-01-05'
  },
  {
    id: 'req-002',
    buyerName: 'EcoFashion Ltd',
    requiredDocType: 'Social Compliance',
    dueDate: '2026-02-28',
    status: 'pending',
    fulfilledWith: null,
    fulfilledDate: null
  },
  {
    id: 'req-003',
    buyerName: 'TechWear Inc',
    requiredDocType: 'Product Testing',
    dueDate: '2026-01-31',
    status: 'pending',
    fulfilledWith: null,
    fulfilledDate: null
  },
  {
    id: 'req-004',
    buyerName: 'SafetyFirst Brands',
    requiredDocType: 'Safety Certificate',
    dueDate: '2026-01-20',
    status: 'pending',
    fulfilledWith: null,
    fulfilledDate: null
  }
];