# 🛡️ Evidence Vault – SaaS Compliance Platform

**Evidence Vault** is a secure, enterprise-ready SaaS application designed for selective disclosure and evidence management. It allows organizations to manage, version, and securely share sensitive compliance documentation with buyers through a controlled audit trail.

[Live Demo](https://zingy-belekoy-667664.netlify.app/)

---

## 🚀 Key Features

* **Evidence Vault:** Secure document uploads with full versioning and metadata management.
* **Selective Disclosure:** Granular, version-level access control for sharing specific data with buyers.
* **Buyer Request Workflow:** Centralized dashboard to fulfill compliance requests using existing or new evidence.
* **Audit Trail:** Comprehensive tracking of who accessed what version and when.
* **Smart Filtering:** URL-persistent filtering by status, expiry, and document type.

---

## 🛠️ Tech Stack

### Frontend

* **React 18** – UI Logic
* **Tailwind CSS** – Utility-first styling
* **React Query** – State management & caching

### Backend & Infrastructure

* **Node.js (v18+)** & **Express** – Core API
* **PostgreSQL 15** – Relational data & audit logs
* **BullMQ (Redis 7+)** – Robust background job processing
* **AWS S3** – Encrypted cloud file storage

---

## ⚙️ Getting Started

### Prerequisites

* **Node.js** 18.x or higher
* **PostgreSQL** 15+
* **Redis** 7+
* **AWS S3 Bucket** (for file storage)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mijanur-rahman-oli/evidence-vault-SaaS-project.git
cd evidence-vault-SaaS-project

```


2. **Install dependencies**
```bash
npm install

```


3. **Configure Environment**
```bash
cp .env.example .env
# Open .env and fill in your Database, Redis, and AWS credentials

```


4. **Initialize Database**
```bash
npm run db:migrate
npm run db:seed

```



---

## 🏃 Running the Application

| Command | Description |
| --- | --- |
| `npm run dev:all` | **Recommended:** Starts Frontend, Backend, and Worker concurrently. |
| `npm run dev` | Starts the React frontend (Port 3000). |
| `npm run server:dev` | Starts the Express API. |
| `npm run worker:dev` | Starts the BullMQ background worker. |

---

## 🧪 Testing Suite

Maintain high code quality with our integrated testing suite:

* **Unit Tests:** `npm run test`
* **Integration:** `npm run test:integration`
* **E2E (Cypress/Playwright):** `npm run test:e2e`
* **Coverage Reports:** `npm run test:coverage`

---

## 🔒 Security & License

* **Auth:** JWT-based authentication with 7-day expiry.
* **Storage:** All evidence is versioned and stored via AWS S3 with restricted access policies.
* **License:** Proprietary – © 2026 SentryLink Inc.

---

### 💡 What's Next?

Would you like me to **create a visual architecture diagram description** using Mermaid.js code that you can paste directly into this README?
