# Complete Deployment Guide - Interview Prep App

## Overview
This guide will help you deploy your full-stack interview preparation app with:
- **Frontend**: React app on Vercel
- **Backend**: Node.js API on Render
- **Database**: MongoDB Atlas (already configured)

## Prerequisites
- GitHub account
- Vercel account
- Render account
- Valid Gemini API key

---

## Part 1: Backend Deployment (Render)

### Step 1: Prepare Backend
1. **Ensure your code is pushed to GitHub**
2. **Verify backend structure**:
   ```
   backend/
   ├── server.js
   ├── package.json
   ├── controllers/
   ├── models/
   ├── routes/
   └── .env (for local development only)
   ```

### Step 2: Deploy to Render
1. **Go to [render.com](https://render.com)**
2. **Sign up/Login** with GitHub
3. **Click "New +" → "Web Service"**
4. **Connect your repository**: `SaiPrasanth27/interview-prep`
5. **Configure settings**:
   ```
   Name: interview-prep-backend
   Region: Oregon (US West) or closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

### Step 3: Environment Variables (Critical!)
Add these in Render dashboard under "Environment":
```
JWT_SECRET=1b13b9e40250db37573256ad202b2ac92600c9fe5810fc86d7c36f231dc097a0b32120634c3c7fcd92796c40ffe6fe43b8c28f77bfe43c0330b69cf0de7a063d

MONGO_URI=mongodb+srv://prasanthtamarapalli27:162704@interview-prep.aorwjxb.mongodb.net/?retryWrites=true&w=majority&appName=interview-prep

GEMINI_API_KEY=YOUR_NEW_GEMINI_API_KEY

NODE_ENV=production
```

### Step 4: Get New Gemini API Key
1. **Go to [Google AI Studio](https://aistudio.google.com/)**
2. **Sign in** with Google account
3. **Click "Get API Key"**
4. **Create API key in new project**
5. **Copy the key** and add to Render environment variables

### Step 5: Deploy
1. **Click "Create Web Service"**
2. **Wait for deployment** (2-5 minutes)
3. **Test backend**: Visit your Render URL
4. **Should show**: `{"message":"Interview Prep API is running!","status":"healthy"}`

---

## Part 2: Frontend Deployment (Vercel)

### Step 1: Update API Configuration
Your frontend should point to your Render backend URL.

### Step 2: Deploy to Vercel
1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with GitHub
3. **Click "Add New..." → "Project"**
4. **Import repository**: `SaiPrasanth27/interview-prep`
5. **Configure settings**:
   ```
   Framework Preset: Vite
   Root Directory: frontend/interview
   Build Command: npm run build (auto-detected)
   Output Directory: dist (auto-detected)
   Install Command: npm install (auto-detected)
   ```

### Step 3: Environment Variables (Optional)
Add in Vercel dashboard under Settings → Environment Variables:
```
VITE_API_BASE_URL=https://your-render-backend-url.onrender.com
```

### Step 4: Deploy
1. **Click "Deploy"**
2. **Wait for build** (2-3 minutes)
3. **Test frontend**: Visit your Vercel URL

---

## Part 3: Troubleshooting Common Issues

### Issue 1: "Failed to fetch" / CORS Errors
**Solution**: Update backend CORS configuration
```javascript
// In backend/server.js
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-vercel-app.vercel.app', // Add your actual Vercel URL
    /https:\/\/.*\.vercel\.app$/
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
```

### Issue 2: Authentication Errors (401 Unauthorized)
**Check**:
1. JWT token is being stored in localStorage after login
2. Authorization header is being sent with requests
3. JWT_SECRET matches between frontend and backend

### Issue 3: AI Generation Errors (500 Internal Server Error)
**Solutions**:
1. **Get new Gemini API key** (current one is suspended)
2. **Verify API key** in Render environment variables
3. **Check Render logs** for specific errors

### Issue 4: Database Connection Errors
**Check**:
1. MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
2. MONGO_URI is correct in environment variables
3. Database user has proper permissions

---

## Part 4: Testing Your Deployment

### Backend Tests
1. **Health check**: `https://your-backend.onrender.com/`
2. **Auth endpoint**: `https://your-backend.onrender.com/api/auth/register`
3. **Check logs** in Render dashboard

### Frontend Tests
1. **Homepage loads**: Visit your Vercel URL
2. **Registration works**: Create new account
3. **Login works**: Sign in with credentials
4. **Session creation**: Try creating interview session

### Full Integration Test
1. **Register** new user
2. **Login** successfully
3. **Create session** with AI questions
4. **View questions** and answers

---

## Part 5: Production Checklist

### Security
- [ ] Environment variables set correctly
- [ ] No sensitive data in code
- [ ] CORS configured properly
- [ ] JWT secret is secure

### Performance
- [ ] Frontend builds successfully
- [ ] Backend responds quickly
- [ ] Database queries optimized
- [ ] Images/assets optimized

### Monitoring
- [ ] Check Render logs regularly
- [ ] Monitor Vercel deployment status
- [ ] Set up error tracking (optional)

---

## Part 6: URLs and Access

After successful deployment, you'll have:

**Backend API**: `https://your-app-name.onrender.com`
**Frontend App**: `https://your-app-name.vercel.app`
**Database**: MongoDB Atlas (cloud-hosted)

---

## Part 7: Common Commands

### Local Development
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend/interview
npm install
npm run dev
```

### Deployment Updates
```bash
# Push changes
git add .
git commit -m "Update deployment"
git push origin main

# Both Render and Vercel will auto-deploy
```

---

## Support

If you encounter issues:
1. **Check browser console** for frontend errors
2. **Check Render logs** for backend errors
3. **Verify environment variables** are set correctly
4. **Test API endpoints** individually

---

## Quick Fix for Current Issue

The main issue is your **Gemini API key is suspended**. To fix immediately:

1. **Get new Gemini API key** from Google AI Studio
2. **Update in Render environment variables**
3. **Redeploy backend**
4. **Test session creation**

Your app should work perfectly after fixing the API key! 🚀