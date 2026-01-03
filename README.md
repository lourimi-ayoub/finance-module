# 🧾 Minimal Finance Module (PFE Technical Screening)

This project is a **minimal finance module** built as part of the **Step-2 technical screening for a PFE (End-of-Studies) internship**.

The goal is **not** to build a production-ready accounting system, but to demonstrate:
- Correct data modeling
- Secure backend logic
- Tenant isolation
- Basic RBAC
- Clear and explicit reasoning

The scope is intentionally limited to focus on **correctness, security, and structure**.

---

## 🎯 Features (Intentionally Minimal)

### Included
- Income & expense transactions
- Basic categorization
- Financial summary (total income, total expense, balance)
- Tenant-based data isolation
- Role-based access control (RBAC)

### Explicitly Excluded
- Invoicing
- VAT / tax rules
- Accounting standards
- Multi-currency
- Advanced reports
- Export (PDF, Excel)

---

## 🧠 Core Concepts

- **Tenant**: Club, association, or organization
- **User**: Authenticated member of a tenant
- **Transaction**: Income or expense record
- **Category**: Simple transaction classification
- **Document**: Optional reference (URL)

Rules:
- Each transaction belongs to exactly **one tenant**
- A transaction is **either income or expense**
- Users can only access data from **their own tenant**

---

## 🧱 Tech Stack

- Node.js (>= 18)
- TypeScript
- Next.js (App Router + API routes)
- PostgreSQL
- Supabase (Auth + Database)
- SQL
- Basic RBAC
- React (minimal frontend)

---

## 🗃️ Data Model (Minimal)

```sql
tenants (id, name)

users (id, email, role, tenant_id)

transactions (
  id,
  tenant_id,
  type,
  amount,
  category,
  description,
  date
)

documents (
  id,
  transaction_id,
  file_url
)
```

- Amounts are stored as `NUMERIC`
- Only positive values are accepted

---

## 🔐 Access Control (Critical)

### Roles
- **TREASURER** → read & write access
- **VIEWER** → read-only access

Rules:
- Users can only access their **own tenant’s data**
- Write operations require the **TREASURER** role
- All checks are enforced **on the backend**

---

## 🔌 API Endpoints

- `POST /api/transactions`
- `GET /api/transactions?tenantId=...`
- `GET /api/summary?tenantId=...`

Each endpoint:
- Verifies tenant ownership
- Enforces RBAC rules
- Validates inputs

---

## 🧮 Backend Logic

Implemented core functions:
- `createTransaction(userId, tenantId, data)`
- `getFinancialSummary(tenantId)`

The financial summary returns:
- totalIncome
- totalExpense
- balance

---

## 🖥️ Frontend (Minimal)

The interface allows:
- Adding an income or expense
- Listing transactions
- Viewing totals and balance

UI design is intentionally minimal.

---

## 🧪 Tests

Included tests:
- Tenant isolation enforcement
- Unauthorized write prevention
- Financial calculation correctness

---

## ▶️ Running the Project

```bash
npm install
npm run dev
npm test
```

---

## 📝 Notes

- The project prioritizes **explicit logic and security**
- No accounting expertise is assumed
- No over-engineering was applied

