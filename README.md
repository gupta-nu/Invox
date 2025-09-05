

# Invox

**Email & PDF Ingestion System**

Invox is a **Next.js application** for automated email ingestion and PDF processing. It connects to IMAP/POP3 email accounts, downloads PDF attachments, stores them locally, and indexes their metadata (sender, subject, date, filename) into a **PostgreSQL database**. The system supports both manual and scheduled ingestion, providing a simple UI for configuration and monitoring.



## ✨ Features

* 📧 **Configurable email accounts** — Add, edit, or delete IMAP/POP3 connections.
* 📂 **Automatic PDF ingestion** — Downloads attachments into `./pdfs/`.
* 🗄️ **Metadata storage** — Persists sender, subject, date, and filenames in PostgreSQL.
* ⏱️ **Manual & scheduled fetching** — Trigger ingestion manually or every 5 minutes.
* 🖥️ **Web UI** — Manage configurations and monitor email ingestion in real time.



## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/gupta-nu/invox.git
cd invox
```

### 2. Install Dependencies

```bash
npm install
```



## 🗄️ Database Setup

### Install PostgreSQL (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### Create Database & User

```bash
sudo -u postgres psql
ALTER USER ananya CREATEDB;
\q

createdb email_pdf_ingestion
```


## ⚙️ Configuration

Create a `.env` file in the project root:

```bash
touch .env
nano .env
```

Add the following (update values as needed):

```env
DATABASE_URL="postgresql://ananya:yourpassword@localhost:5432/email_pdf_ingestion?schema=public"

IMAP_HOST="imap.your-email-provider.com"
IMAP_PORT=993
IMAP_USER="your-email@example.com"
IMAP_PASSWORD="your-email-password"
```



## 🛠️ Project Setup

### Initialize Prisma

```bash
npx prisma migrate dev --name init
```

### Create PDF Storage Directory

```bash
mkdir pdfs
```



## ▶️ Running the Application

```bash
npm run dev
```

Access UI at: [http://localhost:3000](http://localhost:3000)



## 📌 Usage

### 1. Add Email Account

* Open the UI → enter:

  * Email Address
  * Connection Type (IMAP/POP3)
  * Host (e.g., `imap.gmail.com`)
  * Port (993 IMAP / 995 POP3)
  * Username & Password

### 2. Fetch Emails

* **Manual**: Click *Check Emails Now*
* **Automatic**: Runs every 5 minutes



## 🔍 Verification

### Check Stored PDFs

```bash
ls ./pdfs/
```

### View Database Records

```bash
npx prisma studio
```

Relevant tables:

* `EmailIngestionConfig`
* `PDFMetadata`



## 📂 Project Structure

```
invox/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── app/
│   │   ├── page.tsx        # Main UI
│   │   └── api/
│   │       └── email-ingestion/
│   │           ├── route.ts             # CRUD for email configs
│   │           └── check-emails/
│   │               └── route.ts         # Email ingestion logic
│   └── lib/
│       ├── email-client.ts # IMAP/POP3 client
│       └── types.ts        # Shared types
├── public/                 # Static assets
└── pdfs/                   # PDF storage
```



## 🛠️ Troubleshooting

### No PDFs Downloaded

* Ensure emails have PDF attachments.
* Check logs in `npm run dev`.
* Confirm `pdfs/` has write permissions.

### Database Issues

```bash
psql -U ananya -d email_pdf_ingestion
sudo systemctl status postgresql
```

Verify `.env` credentials.

### IMAP/POP3 Issues

* Test account credentials externally.
* For Gmail, enable App Passwords.

### Prisma/TypeScript Errors

```bash
npx prisma generate
rm -rf .next
npm run dev
```



## 🧪 Testing & Debugging

* **Manual fetch** → Use *Check Emails Now*
* **Verify PDFs** → `ls ./pdfs/`
* **Check logs** → `npm run dev`
* **Database check** → `npx prisma studio`



## 📜 License

MIT License © 2025 [Ananya Gupta](https://github.com/gupta-nu)






