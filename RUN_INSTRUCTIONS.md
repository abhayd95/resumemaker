# 🚀 How to Run Resume Maker

## Prerequisites

1. **Node.js** installed (v16 or higher)
   - Check: `node --version`
   - Download: https://nodejs.org/

2. **MySQL** running on your system
   - Make sure MySQL is running
   - Database: `resumemaker`
   - User: `root`
   - Password: `abhayd95`
   - Host: `127.0.0.1:3306`

## Step-by-Step Instructions

### Step 1: Install Dependencies

```bash
cd /Users/abhaytiwari/Desktop/resumemaker
npm install
```

This will install all required packages (React, Vite, Express, MySQL, etc.)

### Step 2: Create Environment File

Create a `.env` file in the root directory:

```bash
# Create .env file
cat > .env << EOF
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=abhayd95
DB_NAME=resumemaker
PORT=3001
EOF
```

### Step 3: Start the Application

You have **two options**:

#### Option A: Run Both Servers Together (Recommended)

```bash
npm run dev:full
```

This starts both:
- Backend server on `http://localhost:3001`
- Frontend server on `http://localhost:5173`

#### Option B: Run Servers Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Step 4: Open in Browser

Once both servers are running, open your browser and go to:

```
http://localhost:5173
```

## What You'll See

1. **Step 1**: Fill in your resume details
2. **Step 2**: Choose a template
3. **Step 3**: Preview and download PDF

## Troubleshooting

### If MySQL connection fails:
- Make sure MySQL is running: `mysql.server start` (Mac) or check MySQL service
- Verify credentials in `.env` file
- Check if database exists: `mysql -u root -p` then `CREATE DATABASE IF NOT EXISTS resumemaker;`

### If port 3001 is already in use:
- Change `PORT=3001` to another port in `.env` file
- Update `API_BASE_URL` in `src/utils/api.js` accordingly

### If port 5173 is already in use:
- Vite will automatically use the next available port
- Check the terminal output for the actual port number

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Run both servers
npm run dev:full

# Run only backend
npm run server

# Run only frontend
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Database Setup

The database tables will be created automatically when you start the server. The server will:
1. Connect to MySQL
2. Create the `resumemaker` database if it doesn't exist
3. Create the `resumes` table automatically

No manual database setup needed! 🎉

