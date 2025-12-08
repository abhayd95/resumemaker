# 🚀 Render Deployment - Quick Guide

## ⚠️ IMPORTANT: Web Service Use Karein, Static Site Nahi!

Aapka project **Full Stack Application** hai jo backend aur database use karta hai. Isliye **Web Service** deploy karein, **Static Site** nahi.

---

## 📋 Step-by-Step Guide

### Step 1: Render Dashboard
1. https://render.com par login karein
2. Dashboard mein **"New +"** button click karein
3. **"Web Service"** select karein (⚠️ Static Site nahi!)

### Step 2: GitHub Repository Connect
1. **"Connect GitHub"** click karein (pehli baar)
2. Repository select karein: **`abhayd95/resumemaker`**
3. **"Connect"** click karein

### Step 3: Build Settings Fill Karein

#### Basic Settings:
- **Name:** `resume-maker` (ya apna naam)
- **Environment:** `Node`
- **Region:** `Singapore` (ya apna preferred region)
- **Branch:** `main`

#### Build & Deploy:
- **Root Directory:** (blank rakhein - kuch mat fill karein)
- **Build Command:** 
  ```
  npm install && npm run build
  ```
- **Start Command:**
  ```
  npm start
  ```

### Step 4: Environment Variables Add Karein

"Environment" section mein yeh variables add karein:

```
NODE_ENV=production
PORT=10000
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=resumemaker
```

#### MySQL Database Setup:
1. Render Dashboard mein **"New +"** → **"PostgreSQL"** (ya MySQL agar available ho)
2. Database create karein
3. Database credentials copy karein
4. Environment variables mein add karein

### Step 5: Deploy
1. **"Create Web Service"** button click karein
2. Build process start hoga (5-10 minutes)
3. Deploy complete hone ke baad URL mil jayega

---

## ✅ Form Fields Summary

| Field | Value |
|-------|-------|
| **Name** | `resume-maker` |
| **Environment** | `Node` |
| **Branch** | `main` |
| **Root Directory** | (blank) |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |

---

## 🔍 Verification

Deploy ke baad:
1. App URL open karein: `https://your-app.onrender.com`
2. Health check: `https://your-app.onrender.com/api/health`
3. Database tables automatically create honge

---

## ❌ Common Mistakes

1. **Static Site select karna** - ❌ Galat! Web Service use karein
2. **Build command galat** - ✅ `npm install && npm run build`
3. **Start command galat** - ✅ `npm start`
4. **Environment variables missing** - ✅ Sab add karein
5. **Database not connected** - ✅ MySQL database create karein

---

## 🆘 Help

Agar koi issue aaye:
- Check server logs in Render dashboard
- Verify environment variables
- Check database connection
- Health endpoint: `/api/health`

---

**Happy Deploying! 🎉**

