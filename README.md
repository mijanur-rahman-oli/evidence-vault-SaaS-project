Overview
SentryLink Comply is a B2B compliance SaaS that enables factories to manage evidence vaults and fulfill buyer compliance requests with selective disclosure controls.
Tech Stack

Frontend: React 18, Javascript, Tailwind CSS
Backend: Node.js, Express, PostgreSQL 15, BullMQ

Node.js 18+
PostgreSQL 15+
Redis 7+ (for BullMQ)
AWS account (S3 access)

Setup
bash# Clone repository
git clone https://github.com/company/sentrylink-comply.git
cd sentrylink-comply

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database/S3 credentials

# Run database migrations
npm run db:migrate

# Seed test data
npm run db:seed
Environment Variables
bash# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/sentrylink

# S3
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
S3_BUCKET=sentrylink-evidence
S3_REGION=us-east-1

# Redis (BullMQ)
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d

# App
NODE_ENV=development
PORT=3000
Running the App
Development
bash# Start frontend (Next.js)
npm run dev

# Start backend (Express)
npm run server:dev

# Start worker (BullMQ)
npm run worker:dev

# Start all services (concurrently)
npm run dev:all
Navigate to http://localhost:3000
Production
bash# Build frontend
npm run build

# Start production server
npm run start

# Start worker
npm run worker:start
Testing
bash# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
Key Features
1. Evidence Vault

Upload compliance documents with versioning
Filter by type, status, expiry date
Bulk selection and export packs
URL query param persistence

2. Evidence Detail

View all versions with history
Upload new versions with notes
Download specific versions

3. Buyer Requests

View pending compliance requests
Fulfill with existing evidence or create new
Track fulfillment status

4. Selective Disclosure

Buyers only see explicitly shared evidence
Version-level access control
Audit trail for all access

License
Proprietary - Copyright 2026 SentryLink Inc.
