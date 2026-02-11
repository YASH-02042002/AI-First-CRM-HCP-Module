import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfessionalFormMode from './ProfessionalFormMode';
import AIAssistantPanel from './AIAssistantPanel';
import { fetchInteractions } from '../Store/slices/interactionSlice';
import './LoginteractionScreen.css';

const LogInteractionScreen = () => {
  const dispatch = useDispatch();
  const { items: interactions, loading } = useSelector((state) => state.interactions);
  const [autoFillData, setAutoFillData] = useState({});

  useEffect(() => {
    dispatch(fetchInteractions());
  }, [dispatch]);

  const handleFillForm = (formData) => {
    // Update form with AI-extracted data
    setAutoFillData(formData);
    
    // Clear after a moment to allow re-fills
    setTimeout(() => {
      setAutoFillData({});
    }, 100);
  };

  return (
    <div className="professional-screen">
      <header className="professional-header">
        <h1>Log HCP Interaction</h1>
        <p className="header-subtitle">💡 Type in AI Assistant to auto-fill form</p>
      </header>

      <div className="professional-layout">
        <div className="main-form-panel">
          <ProfessionalFormMode autoFillData={autoFillData} />
        </div>
        
        <div className="ai-assistant-sidebar">
          <AIAssistantPanel onFillForm={handleFillForm} />
        </div>
      </div>
    </div>
  );
};

export default LogInteractionScreen;