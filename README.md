

<h1 align="center"> Book Library Management System</h1>

<p align="center">
  A full-stack MERN application for managing a digital library — complete with member tracking, book inventory, lending/fining workflows, reports, and secure librarian access.
</p>

---

## 🚀 Tech Stack

- **MongoDB** (Database)
- **Express.js** (Backend Framework)
- **React.js** (Frontend UI)
- **Node.js** (Server Environment)

---

## 🎯 Objective

Build a full-featured **Library Management System** with:

- Secure authentication for librarians
- CRUD operations for managing books and members
- Automated lending/returning processes
- Fine calculations and payment tracking
- Reports for active loans and member histories

---

## ✅ Functional Requirements

### 🔐 1. Authentication

- **Single-role login** system for librarians
- **Credentials:**
  - Username: `librarian@library.com`
  - Password: `SecureLib@123` _(hashed using Bcrypt/Scrypt)_

---

### 👤 2. Member Management (CRUD)

- **Fields:** ID, Full Name, Email, Phone, Membership Date (auto-set), Status (`Active`/`Inactive`)
- **Constraints:**
  - Prevent duplicate emails/phones
  - Members with active loans or unpaid fines cannot be inactivated (soft-delete)

---

### 📘 3. Book Management (CRUD)

#### 🔖 Book Metadata:
- ISBN (unique)
- Title
- Author
- Publisher
- Publication Year
- Genre

#### 📗 Book Copies:
- Copy ID (unique barcode)
- Status: `Available`, `Borrowed`, `Lost`

#### ⚠️ Constraints:
- Metadata deletion is **not allowed** if any copies exist
- Each copy is tracked individually for lending/return history

---

### 🔁 4. Lending & Fining System

#### ✅ Checkout:
- Assign a book copy to a member
- Auto-set **due date** (14 days from checkout)

#### 🔄 Return:
- Update copy status
- Auto-calculate fines: **$1 per day** overdue

#### 💰 Fines:
- Fields: fine amount, due date, status (`Paid`/`Unpaid`)
- Books **cannot be returned** until all fines are paid

---

### 📊 5. Reports

#### 📌 Active Loans Report:
- Displays book title, member name, due date
- Overdue status highlighted

#### 🧾 Member History Report:
- Shows all transactions (checkout/return)
- Fine history per member

---

## 📂 Project Repositories

- 🔗 **Frontend Commit History**  
  [View on GitHub](https://github.com/MnqobiSD2018/Book-Library-Management-System-Frontend)

- ⚙️ **Backend Repository** this repo
---

## 💡 Features to Consider

- Searchable book/member interfaces
- Filtering for overdue loans
- Responsive and intuitive UI for librarians
- Dashboard with quick stats (total books, members, active loans)

---


