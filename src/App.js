import React, { useState, useEffect } from 'react';
import { database, ref, onValue } from './firebase';
import InsightsTab from './components/InsightsTab';
import CalendarTab from './components/CalendarTab';
import IntelligenceTab from './components/IntelligenceTab';
import WorkflowTab from './components/WorkflowTab';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('insights');
  const [insights, setInsights] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [intelligence, setIntelligence] = useState([]);
  const [workflow, setWorkflow] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to insights data
    const insightsRef = ref(database, 'insights');
    onValue(insightsRef, (snapshot) => {
      const data = snapshot.val();
      setInsights(data || {});
    });

    // Listen to calendar data
    const calendarRef = ref(database, 'calendar');
    onValue(calendarRef, (snapshot) => {
      const data = snapshot.val();
      setCalendar(data || []);
    });

    // Listen to intelligence data
    const intelligenceRef = ref(database, 'intelligence');
    onValue(intelligenceRef, (snapshot) => {
      const data = snapshot.val();
      setIntelligence(data || []);
    });

    // Listen to workflow data
    const workflowRef = ref(database, 'workflow');
    onValue(workflowRef, (snapshot) => {
      const data = snapshot.val();
      setWorkflow(data || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="container">
        <header>
          <div className="logo"></div>
          <h1>ProSolve</h1>
          <span>Marketing Hub</span>
        </header>
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <div className="logo"></div>
        <h1>ProSolve</h1>
        <span>Marketing Hub</span>
      </header>

      <div className="main-content">
        <aside>
          <nav>
            {[
              { id: 'insights', label: '📊 Insights' },
              { id: 'calendar', label: '📅 Calendar & Schedule' },
              { id: 'intelligence', label: '🔍 Intelligence' },
              { id: 'workflow', label: '📋 Monthly Workflow' }
            ].map(tab => (
              <button
                key={tab.id}
                className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="content-area">
          <div className="main-view">
            {activeTab === 'insights' && <InsightsTab data={insights} />}
            {activeTab === 'calendar' && <CalendarTab data={calendar} />}
            {activeTab === 'intelligence' && <IntelligenceTab data={intelligence} />}
            {activeTab === 'workflow' && <WorkflowTab data={workflow} />}
          </div>
        </div>
      </div>
    </div>
  );
}
