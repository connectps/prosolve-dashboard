# ProSolve LinkedIn Marketing Dashboard

A fully automated marketing dashboard for managing ProSolve's LinkedIn strategy with real-time data sync from your automation pipeline.

## **Features**

- **📊 Insights Tab:** Quick-view performance metrics (engagement rate, impressions, followers) with full monthly reports
- **📅 Calendar & Schedule:** Mon-Fri 4-week calendar grid with drag-drop post scheduling and copy drafts
- **🔍 Intelligence Tab:** Competitor analysis and trending insights pulled from LinkedIn
- **📋 Monthly Workflow:** Kanban board tracking posts from Drafting → Scheduled → Posted → Analyzed
- **⚡ Real-time Sync:** Firebase integration updates dashboard as data changes
- **🎨 ProSolve Branded:** Custom UI using ProSolve colors (Teal, Navy, Cream)

## **Tech Stack**

- **Frontend:** React 18 + Tailwind CSS
- **Backend:** Firebase Realtime Database
- **Sync Service:** Node.js (runs daily via cron)
- **Hosting:** Netlify (free tier)

## **Quick Start**

### **1. Install & Run Locally**

```bash
npm install
npm start
```

Runs on `http://localhost:3000`

### **2. Build for Production**

```bash
npm run build
```

### **3. Deploy to Netlify**

```bash
npm run deploy
```

## **Setup Instructions**

See **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** for complete setup instructions including:
- Firebase configuration
- Netlify deployment
- Sync service setup (cron scheduling)
- Troubleshooting

## **Project Structure**

```
prosolve-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── InsightsTab.jsx
│   │   ├── CalendarTab.jsx
│   │   ├── IntelligenceTab.jsx
│   │   └── WorkflowTab.jsx
│   ├── App.js
│   ├── App.css
│   ├── firebase.js
│   └── index.js
├── sync-service/
│   ├── sync-service.js
│   ├── package.json
│   └── serviceAccountKey.json (create after Firebase setup)
├── package.json
├── .gitignore
├── SETUP_GUIDE.md
└── README.md
```

## **Data Sources**

The dashboard reads from:
- `~/Desktop/automate/automation-infrastructure/data-prosolve/trends.json`
- `~/Desktop/automate/automation-infrastructure/data-prosolve/social-calendar.json`
- `~/Desktop/automate/automation-infrastructure/data-prosolve/copy-variations.json`
- `~/Desktop/automate/automation-infrastructure/data-prosolve/performance-insights.json`
- `~/Desktop/automate/automation-infrastructure/data-prosolve/posting-log.json`

And syncs them to Firebase Realtime Database daily (via cron).

## **Firebase Credentials**

Firebase config is in `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBDfRX3CrAdv57TIA9XczF0Iu-0rh_WAfg",
  authDomain: "prosolve-social-marketing.firebaseapp.com",
  databaseURL: "https://prosolve-social-marketing-default-rtdb.firebaseio.com",
  projectId: "prosolve-social-marketing",
  storageBucket: "prosolve-social-marketing.firebasestorage.app",
  messagingSenderId: "376808913587",
  appId: "1:376808913587:web:c53f1e8fe84d8eaf6acec6",
  measurementId: "G-B35680FNJ3"
};
```

These are safe to commit (they're public for web apps).

## **Sync Service**

The Node.js sync service runs daily (8:00 AM) to pull data from your JSON files and push to Firebase.

**Manual sync:**
```bash
cd ~/Desktop/automate/automation-infrastructure/sync-service
node sync-service.js
```

**View logs:**
```bash
tail -f ~/Desktop/automate/automation-infrastructure/sync-service/sync.log
```

## **Dashboard URLs**

- **Live Dashboard:** `https://your-netlify-url.netlify.app`
- **Firebase Console:** https://console.firebase.google.com/u/0/project/prosolve-social-marketing
- **GitHub Repo:** `https://github.com/YOUR_USERNAME/prosolve-dashboard`

## **Deployment Pipeline**

1. **GitHub** (code)
   ↓
2. **Netlify** (auto-deploys on push)
   ↓
3. **Dashboard** (lives at netlify URL)

**Data Pipeline:**

1. **Your automation** (Monday 10am) → generates JSON files
   ↓
2. **Cron job** (daily 8am) → runs sync service
   ↓
3. **Sync service** → reads JSON, pushes to Firebase
   ↓
4. **Dashboard** → reads Firebase in real-time
   ↓
5. **You see live data** (no rebuild needed)

## **Contributing**

1. Clone the repo
2. Create a branch (`git checkout -b feature/your-feature`)
3. Make changes
4. Push to GitHub (`git push origin feature/your-feature`)
5. Netlify auto-deploys

## **Security**

- ⚠️ **Never commit `serviceAccountKey.json`** - It's in `.gitignore`
- ✅ Firebase API keys in code are safe (they're public by design)
- ✅ Firebase Realtime Database security rules restrict writes to sync service only

## **Troubleshooting**

See **[SETUP_GUIDE.md](./SETUP_GUIDE.md#part-5-troubleshooting)** for common issues and fixes.

## **Support**

- **Firebase Issues:** https://firebase.google.com/support
- **Netlify Issues:** https://support.netlify.com
- **React Issues:** https://react.dev/learn

---

**Built for ProSolve.** Dashboard auto-updates with your marketing data. 🚀
