# Email & PDF Ingestion System

A Next.js application for fetching emails with PDF attachments and storing metadata in PostgreSQL.

## 🚀 Features
- Add/Edit/Delete email configurations (IMAP/POP3)
- Auto-download PDF attachments to `./pdfs/`
- Store metadata: sender, date, subject, filename
- Manual & automatic email checking
- Simple UI with form validation

## 👋 Prerequisites
- Node.js v18+
- PostgreSQL 14+
- Windows/Linux/macOS terminal access

## 🛠️ Setup Guide

### 1. Clone Project
```bash
git clone https://github.com/Madhuj275/email-pdf-ingestion.git
cd email-pdf-ingestion
```

### 2. Install Dependencies
```bash
npm install @prisma/client imapflow
npm install -D prisma typescript @types/node
```

### 3. Database Setup
1. **Install PostgreSQL**  
   

2. **Create Database**
```bash
createdb email_pdf_ingestion
```

3. **Configure Environment**  
   Create `.env` file:
```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/email_pdf_ingestion?schema=public"
```

### 4. Project Structure Setup (Windows)
```powershell
# Create directories
mkdir src/app/api/email-ingestion/check-emails, src/lib, public, pdfs -Force

# Create core files
New-Item src/app/page.tsx,
          src/app/api/email-ingestion/route.ts,
          src/app/api/email-ingestion/check-emails/route.ts,
          src/lib/email-client.ts
```

### 5. Run Migrations
```bash
npx prisma migrate dev --name init
```

### 6. Create PDF Directory
```bash
mkdir pdfs
```

## Running the Application
```bash
npm run dev
```
Access UI at: `http://localhost:3000`

## ⚙️ Configuration

### 1. Add Email Account
1. Go to `http://localhost:3000`
2. Fill form:
   - **Email Address**: your@email.com
   - **Connection Type**: IMAP
   - **Host**: imap.your-provider.com
   - **Port**: 993 (IMAP) / 995 (POP3)
   - **Username/Password**: Your email credentials

### 2. Check Emails
- **Manual**: Click "Check Emails Now"
- **Automatic**: Checks every 5 minutes (default)

## ✅ Verification

1. **Check PDFs**  
   All attachments will be saved in:
   ```bash
   ./pdfs/
   ```

2. **Check Database**  
   Use Prisma Studio:
   ```bash
   npx prisma studio
   ```
   Verify entries in:
   - `EmailIngestionConfig`
   - `PDFMetadata`

## 💁‍♂️ Environment Variables

### Required Environment Variables
Create a `.env` file in the project root and add:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/email_pdf_ingestion?schema=public"
IMAP_HOST="imap.your-email-provider.com"
IMAP_PORT=993
IMAP_USER="your-email@example.com"
IMAP_PASSWORD="your-email-password"
```
- Use App Passwords if required for security.
- Avoid hardcoding sensitive credentials.

## 📂 Project Structure
```
email-pdf-ingestion/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── app/
│   │   ├── page.tsx        # Main UI
│   │   └── api/
│   │       └── email-ingestion/
│   │           ├── route.ts             # CRUD operations
│   │           └── check-emails/
│   │               └── route.ts         # Email checking endpoint
│   └── lib/
│       ├── email-client.ts # IMAP handling
│       └── types.ts        # TypeScript interfaces
├── public/                 # Static assets
└── pdfs/                   # PDF storage
```

## 🚨 Troubleshooting

### Common Issues

1. **No PDFs Downloaded**
   - Verify email has PDF attachments
   - Check server logs for errors
   - Ensure `pdfs` directory has write permissions

2. **Database Connection Failed**
   ```bash
   psql -U postgres -d email_pdf_ingestion
   ```
   - Confirm PostgreSQL service is running
   - Validate credentials in `.env`

3. **IMAP Connection Issues**
   - Test credentials with email client
   - Allow "Less Secure Apps" for Gmail
   ```bash
   # Enable if using App Password
   https://myaccount.google.com/security
   ```

4. **TypeScript Errors**
   ```bash
   npx prisma generate
   rm -rf .next
   npm run dev
   ```

## 🌟 Test Steps to Confirm PDFs are Downloaded

1. **Trigger Email Fetching**
   - Manually click "Check Emails Now" or wait for auto-fetch.

2. **Verify PDF Storage**
   - Navigate to the `pdfs/` directory.
   ```bash
   ls ./pdfs/
   ```
   - Ensure expected PDFs are present.

3. **Check Server Logs**
   ```bash
   npm run dev
   ```
   - Look for logs confirming PDF download success.

4. **Confirm Database Entries**
   - Open Prisma Studio:
   ```bash
   npx prisma studio
   ```
   - Verify PDFs are listed under `PDFMetadata`.

5. **Test Opening PDFs**
   - Manually open a sample PDF to ensure it is correctly downloaded and not corrupted.




