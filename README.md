


# **Email & PDF Ingestion System**  



## **Features**  

- Add/Edit/Delete email configurations (IMAP/POP3).  
- Auto-download PDF attachments to a local directory (`./pdfs/`).  
- Store metadata (sender, date, subject, filename) in a database.  
- Manual & automatic email checking (every 5 minutes).  
- Simple UI for configuration and email ingestion.  

---

## **Installation**  

### **1. Clone the Repository**  

```bash
git clone https://github.com/gupta-nu/pdf-email-ingestion.git
cd pdf-email-ingestion
```

### **2. Install Dependencies**  

```bash
npm install
```

---

## **Database Setup**  

### **1. Install PostgreSQL (if not installed)**  

For Ubuntu/Debian:  

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### **2. Create Database**  

Ensure your PostgreSQL user has the correct permissions:  

```bash
sudo -u postgres psql
ALTER USER ananya CREATEDB;
\q
```

Create the database:  

```bash
createdb email_pdf_ingestion
```

---

## **Configuration**  

Create a `.env` file in the project root:  

```bash
touch .env
nano .env
```

Add the following environment variables (update credentials accordingly):  

```env
DATABASE_URL="postgresql://ananya:yourpassword@localhost:5432/email_pdf_ingestion?schema=public"

IMAP_HOST="imap.your-email-provider.com"
IMAP_PORT=993
IMAP_USER="your-email@example.com"
IMAP_PASSWORD="your-email-password"
```

---

## **Project Setup**  

```bash
mkdir -p src/app/api/email-ingestion/check-emails src/lib public pdfs
touch src/app/page.tsx \
      src/app/api/email-ingestion/route.ts \
      src/app/api/email-ingestion/check-emails/route.ts \
      src/lib/email-client.ts
```

Run database migrations:  

```bash
npx prisma migrate dev --name init
```

Create a PDF storage directory:  

```bash
mkdir pdfs
```

---

## **Running the Application**  

```bash
npm run dev
```

Access the UI at: [http://localhost:3000](http://localhost:3000)  

---

## **Usage**  

### **1. Add an Email Account**  

- Open [http://localhost:3000](http://localhost:3000)  
- Enter the following details:  
  - **Email Address**  
  - **Connection Type (IMAP/POP3)**  
  - **Host** (e.g., imap.your-provider.com)  
  - **Port** (993 for IMAP, 995 for POP3)  
  - **Username and Password**  

### **2. Fetch Emails**  

- **Manual:** Click "Check Emails Now"  
- **Automatic:** Runs every 5 minutes (default)  

---

## **Verification**  

### **Check Stored PDFs**  

```bash
ls ./pdfs/
```

### **Check Database Records**  

```bash
npx prisma studio
```

Verify entries in:  
- `EmailIngestionConfig`  
- `PDFMetadata`  

---

## **Project Structure**  

```
pdf-email-ingestion/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── app/
│   │   ├── page.tsx        # Main UI
│   │   └── api/
│   │       └── email-ingestion/
│   │           ├── route.ts             # CRUD operations
│   │           └── check-emails/
│   │               └── route.ts         # Email fetching logic
│   └── lib/
│       ├── email-client.ts # IMAP handling
│       └── types.ts        # TypeScript interfaces
├── public/                 # Static assets
└── pdfs/                   # PDF storage
```

---

## **Troubleshooting**  

### **No PDFs Downloaded**  
- Ensure the email contains PDF attachments.  
- Check server logs for errors.  
- Verify `pdfs/` directory has write permissions.  

### **Database Connection Issues**  

```bash
psql -U ananya -d email_pdf_ingestion
```

- Confirm that PostgreSQL is running:  

```bash
sudo systemctl status postgresql
```

- Check if credentials in `.env` are correct.  

### **IMAP Connection Issues**  
- Test email credentials with an external client.  
- Enable "Less Secure Apps" if using Gmail.  
- Use **App Passwords** for security.  

[Enable App Password](https://myaccount.google.com/security)  

### **TypeScript or Prisma Errors**  

```bash
npx prisma generate
rm -rf .next
npm run dev
```

---

## **Testing & Debugging**  

### **1. Manually Trigger Email Fetching**  

Click "Check Emails Now" in the UI or wait for auto-fetch.  

### **2. Verify PDF Storage**  

```bash
ls ./pdfs/
```

### **3. Check Server Logs**  

```bash
npm run dev
```

Look for logs confirming PDF download success.  

### **4. Confirm Database Entries**  

```bash
npx prisma studio
```

Check that PDFs are listed under `PDFMetadata`.  




