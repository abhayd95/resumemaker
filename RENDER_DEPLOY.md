# Render Deployment Guide

## 🚀 Render par Deploy kaise karein

### Step 1: Render Account Setup
1. [Render.com](https://render.com) par account banayein
2. Dashboard mein "New +" button click karein
3. "Web Service" select karein

### Step 2: GitHub Repository Connect
1. GitHub repository ko Render se connect karein
2. Repository select karein: `resumemaker`
3. Branch: `main` ya `master`

### Step 3: Build Settings
Render mein yeh settings use karein:

**Name:** `resume-maker` (ya apna naam)

**Environment:** `Node`

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**Root Directory:** (blank rakhein ya `.`)

### Step 4: Environment Variables
Render Dashboard mein "Environment" section mein yeh variables add karein:

```
NODE_ENV=production
PORT=10000
DB_HOST=your-mysql-host.render.com
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=resumemaker
```

### Step 5: MySQL Database Setup

#### Option A: Render MySQL Database (Recommended)
1. Render Dashboard mein "New +" → "PostgreSQL" (ya MySQL agar available ho)
2. Database create karein
3. Database credentials copy karein
4. Environment variables mein add karein

#### Option B: External MySQL Database
- Agar aapka MySQL database already hai, to uske credentials use karein
- Render ke MySQL service use kar sakte hain

### Step 6: Deploy
1. "Create Web Service" button click karein
2. Build process start hoga
3. 5-10 minutes wait karein
4. Deploy complete hone ke baad URL mil jayega

### Step 7: Database Initialization
Pehli baar deploy ke baad:
1. Browser mein app URL open karein
2. Server automatically database tables create kar dega
3. Health check: `https://your-app.onrender.com/api/health`

## 📝 Important Notes

### Build Process
- Frontend build `dist/` folder mein hoga
- Server static files serve karega
- API routes `/api/*` se accessible honge

### Environment Variables
- **DB_HOST**: MySQL server hostname
- **DB_PORT**: Usually 3306
- **DB_USER**: Database username
- **DB_PASSWORD**: Database password
- **DB_NAME**: Database name (default: resumemaker)

### Free Tier Limitations
- Render free tier par apps sleep ho sakti hain (15 minutes inactivity)
- Pehli request slow ho sakti hai (cold start)
- Database connection timeout ho sakta hai

### Production Tips
1. **Auto-sleep disable**: Paid plan par auto-sleep disable kar sakte hain
2. **Database connection pooling**: Already implemented hai
3. **Error handling**: Server mein proper error handling hai
4. **Health checks**: `/api/health` endpoint available hai

## 🔧 Troubleshooting

### Build Fails
- Check `package.json` scripts
- Verify Node.js version (18+ recommended)
- Check build logs in Render dashboard

### Database Connection Error
- Verify environment variables
- Check database is accessible from Render
- Verify database credentials

### 404 Errors
- Check static file serving
- Verify `dist/` folder exists after build
- Check server routes

### App Not Loading
- Check server logs in Render dashboard
- Verify PORT environment variable
- Check health endpoint: `/api/health`

## 📞 Support
- Render Docs: https://render.com/docs
- Check server logs in Render dashboard
- Health check endpoint: `/api/health`

## ✅ Deployment Checklist
- [ ] GitHub repository connected
- [ ] Build command set: `npm install && npm run build`
- [ ] Start command set: `npm start`
- [ ] Environment variables configured
- [ ] MySQL database created/connected
- [ ] Build successful
- [ ] App accessible
- [ ] Database tables created
- [ ] Health check working

Happy Deploying! 🎉

