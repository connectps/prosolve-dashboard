# ProSolve LinkedIn Marketing Dashboard - Setup & Deployment Guide

---

## **PART 1: REACT APP SETUP (Netlify)**

### **Step 1: Prepare the React App**

```bash
# Create the project structure locally
mkdir prosolve-dashboard
cd prosolve-dashboard

# Create src directory
mkdir src public components

# Add files to src/:
# - App.js
# - App.css
# - firebase.js
# - index.js

# Add files to src/components/:
# - InsightsTab.jsx
# - CalendarTab.jsx
# - IntelligenceTab.jsx
# - WorkflowTab.jsx

# Add public/:
# - index.html (from public_index.html)

# Add to root:
# - package.json
```

### **Step 2: Initialize Node Modules**

```bash
npm install
```

This installs:
- React 18.2.0
- Firebase SDK
- Lucide React (icons)

### **Step 3: Push to GitHub**

```bash
# Initialize git
git init
git add .
git commit -m "Initial ProSolve dashboard commit"

# Create repo on GitHub (github.com/new)
# Then:
git remote add origin https://github.com/YOUR_USERNAME/prosolve-dashboard.git
git branch -M main
git push -u origin main
```

### **Step 4: Deploy to Netlify**

**Option A: Via Netlify UI**
1. Go to https://app.netlify.com/signup
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your `prosolve-dashboard` repo
5. Leave settings as default (Build command: `npm run build`, Directory: `build`)
6. Click "Deploy site"

**Option B: Via Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**Your dashboard is now live!** Netlify gives you a URL like `prosolve-dashboard-abc123.netlify.app`

---

## **PART 2: FIREBASE SYNC SERVICE SETUP (Your Mac)**

### **Step 1: Download Service Account Key**

1. Go to **Firebase Console** → **Settings** (gear icon)
2. Click **Service Accounts** tab
3. Click **Generate New Private Key**
4. Save the JSON file as `serviceAccountKey.json`
5. Place it in: `~/Desktop/automate/automation-infrastructure/`

⚠️ **KEEP THIS SECURE** - It has write access to your Firebase database

### **Step 2: Set Up Sync Service**

```bash
cd ~/Desktop/automate/automation-infrastructure/

# Create sync directory
mkdir sync-service
cd sync-service

# Add files:
# - sync-service.js (from sync-service.js)
# - package.json (from sync-package.json, rename to package.json)
# - serviceAccountKey.json (download from Firebase)

# Install dependencies
npm install
```

### **Step 3: Test the Sync**

```bash
node sync-service.js
```

Expected output:
```
🔄 Starting ProSolve Firebase sync...
✅ Synced insights
✅ Synced calendar posts
✅ Synced intelligence
✅ Synced workflow
✨ Firebase sync complete!
📊 Last synced: [timestamp]
```

If it works, continue to Step 4.

### **Step 4: Schedule Daily Sync (via cron)**

```bash
# Edit crontab
crontab -e

# Add this line (runs daily at 8:00 AM):
0 8 * * * cd ~/Desktop/automate/automation-infrastructure/sync-service && node sync-service.js >> sync.log 2>&1

# Save and exit
```

**Verify it's scheduled:**
```bash
crontab -l
```

---

## **PART 3: MANUAL SYNC (OPTIONAL)**

If you want to sync manually without waiting for the cron job:

```bash
cd ~/Desktop/automate/automation-infrastructure/sync-service
node sync-service.js
```

---

## **PART 4: HOW IT ALL WORKS**

### **Flow:**
1. **Your automation runs** (Monday 10am) → generates `social-calendar.json`, `trends.json`, etc.
2. **Cron triggers daily** (8am) → runs `sync-service.js`
3. **Sync service reads** your JSON files from `/data-prosolve/`
4. **Pushes to Firebase** Realtime Database
5. **Dashboard** (on Netlify) **reads from Firebase** in real-time
6. **You see live data** without rebuilding

### **File Locations:**
- **React app:** `https://your-netlify-url.netlify.app`
- **Firebase data:** `https://prosolve-social-marketing-default-rtdb.firebaseio.com`
- **Sync service:** `~/Desktop/automate/automation-infrastructure/sync-service/`
- **Data files:** `~/Desktop/automate/automation-infrastructure/data-prosolve/`

---

## **PART 5: TROUBLESHOOTING**

### **Dashboard not updating?**

1. **Check Firebase sync:**
```bash
cd ~/Desktop/automate/automation-infrastructure/sync-service
node sync-service.js
```

2. **Check cron job:**
```bash
# View cron logs
log stream --predicate 'process == "cron"' --level debug

# Or manually trigger:
crontab -l
```

3. **Check Firebase data:**
Go to Firebase Console → Realtime Database → Check if data exists

### **Sync service failing?**

**Missing `serviceAccountKey.json`:**
```bash
# Download it again from Firebase Console → Service Accounts
# Place in: ~/Desktop/automate/automation-infrastructure/sync-service/serviceAccountKey.json
```

**Permission denied:**
```bash
chmod +x ~/Desktop/automate/automation-infrastructure/sync-service/sync-service.js
```

**Node not found in cron:**
```bash
# Get Node path:
which node

# Add to crontab (e.g., /usr/local/bin/node):
0 8 * * * /usr/local/bin/node ~/Desktop/automate/automation-infrastructure/sync-service/sync-service.js
```

---

## **PART 6: NEXT STEPS**

### **After deployment:**
1. ✅ Dashboard is live on Netlify
2. ✅ Sync service runs daily at 8am
3. ✅ Data updates automatically from your JSON files

### **To update the dashboard:**
- Push code changes to GitHub → Netlify auto-deploys
- No need to rebuild for data changes (Firebase handles that)

### **To add new features:**
1. Edit components locally
2. Test with `npm start`
3. Push to GitHub
4. Netlify deploys automatically

---

## **IMPORTANT SECURITY NOTES**

1. **Never commit `serviceAccountKey.json` to GitHub** - Add to `.gitignore`:
```
serviceAccountKey.json
.env
.env.local
```

2. **Firebase rules (set up later):**
   - Dashboard can read all data (public read)
   - Only sync service can write (restricted by service account)

3. **API keys in `firebase.js` are public** - That's intentional for web apps. Security comes from Firebase rules, not hidden keys.

---

## **CONTACT & SUPPORT**

- **Firebase Issues:** https://firebase.google.com/support
- **Netlify Issues:** https://support.netlify.com
- **Node.js Issues:** https://nodejs.org/en/docs/
- **Your Sync Service Issues:** Check `~/Desktop/automate/automation-infrastructure/sync-service/sync.log`

---

**Dashboard live!** 🚀
