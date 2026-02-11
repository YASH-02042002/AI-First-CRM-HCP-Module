import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createInteraction, fetchInteractions } from '../Store/slices/interactionSlice';
import './ProfessionalFormMode.css';

const ProfessionalFormMode = ({ autoFillData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    hcp_name: '',
    interaction_type: 'Meeting',
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    attendees: '',
    topics_discussed: '',
    voice_note: '',
    materials_shared: '',
    samples_distributed: '',
    sentiment: 'Neutral',
    outcomes: '',
    follow_up_actions: '',
  });

  const [voiceRecording, setVoiceRecording] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Auto-fill form when AI assistant sends data
  useEffect(() => {
    if (autoFillData && Object.keys(autoFillData).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...autoFillData
      }));
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'auto-fill-notification';
      notification.innerHTML = '✨ Form auto-filled from AI Assistant!';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  }, [autoFillData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVoiceNote = () => {
    setVoiceRecording(!voiceRecording);
    // Implement voice recording logic here
  };

  const handleSummarize = () => {
    // AI summarization from voice note
    alert('AI Summarization feature - Will process voice note');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dataToSubmit = {
      hcp_name: formData.hcp_name,
      interaction_type: formData.interaction_type,
      location: formData.attendees,
      discussion_topics: formData.topics_discussed,
      products_discussed: formData.materials_shared,
      samples_provided: formData.samples_distributed,
      next_steps: formData.follow_up_actions,
    };

    try {
      await dispatch(createInteraction(dataToSubmit)).unwrap();
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          hcp_name: '',
          interaction_type: 'Meeting',
          date: new Date().toISOString().split('T')[0],
          time: '19:30',
          attendees: '',
          topics_discussed: '',
          voice_note: '',
          materials_shared: '',
          samples_distributed: '',
          sentiment: 'Neutral',
          outcomes: '',
          follow_up_actions: '',
        });
        setSubmitted(false);
      }, 2000);
      dispatch(fetchInteractions());
    } catch (error) {
      console.error('Failed to create interaction:', error);
    }
  };

  return (
    <div className="professional-form">
      {submitted && (
        <div className="success-banner">
          ✓ Interaction logged successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Interaction Details Section */}
        <div className="form-section">
          <h3 className="section-title">Interaction Details</h3>
          
          <div className="form-grid-2">
            <div className="form-field">
              <label>HCP Name</label>
              <input
                type="text"
                name="hcp_name"
                value={formData.hcp_name}
                onChange={handleChange}
                placeholder="Search or select HCP..."
                required
              />
            </div>

            <div className="form-field">
              <label>Interaction Type</label>
              <select
                name="interaction_type"
                value={formData.interaction_type}
                onChange={handleChange}
              >
                <option value="Meeting">Meeting</option>
                <option value="Virtual Call">Virtual Call</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Conference">Conference</option>
                <option value="Email">Email</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-field">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-field">
            <label>Attendees</label>
            <input
              type="text"
              name="attendees"
              value={formData.attendees}
              onChange={handleChange}
              placeholder="Enter names or search..."
            />
          </div>

          <div className="form-field">
            <label>Topics Discussed</label>
            <textarea
              name="topics_discussed"
              value={formData.topics_discussed}
              onChange={handleChange}
              rows="3"
              placeholder="Enter key discussion points..."
            />
          </div>

          {/* Voice Note Section */}
          <div className="voice-note-section">
            <button 
              type="button" 
              className="voice-btn"
              onClick={handleVoiceNote}
            >
              🎤 {voiceRecording ? 'Stop Recording' : 'Summarize from Voice Note (Requires Consent)'}
            </button>
          </div>
        </div>

        {/* Materials Shared / Samples Section */}
        <div className="form-section">
          <h3 className="section-title">Materials Shared / Samples Distributed</h3>
          
          <div className="form-field">
            <label>Materials Shared</label>
            <div className="search-field">
              <input
                type="text"
                name="materials_shared"
                value={formData.materials_shared}
                onChange={handleChange}
                placeholder="No materials added"
              />
              <button type="button" className="search-btn">
                🔍 Search/Add
              </button>
            </div>
          </div>

          <div className="form-field">
            <label>Samples Distributed</label>
            <div className="search-field">
              <input
                type="text"
                name="samples_distributed"
                value={formData.samples_distributed}
                onChange={handleChange}
                placeholder="No samples added"
              />
              <button type="button" className="add-sample-btn">
                📦 Add Sample
              </button>
            </div>
          </div>
        </div>

        {/* Sentiment Section */}
        <div className="form-section">
          <h3 className="section-title">Observed/Inferred HCP Sentiment</h3>
          
          <div className="sentiment-options">
            <label className="radio-option">
              <input
                type="radio"
                name="sentiment"
                value="Positive"
                checked={formData.sentiment === 'Positive'}
                onChange={handleChange}
              />
              <span className="emoji">😊</span> Positive
            </label>
            
            <label className="radio-option">
              <input
                type="radio"
                name="sentiment"
                value="Neutral"
                checked={formData.sentiment === 'Neutral'}
                onChange={handleChange}
              />
              <span className="emoji">😐</span> Neutral
            </label>
            
            <label className="radio-option">
              <input
                type="radio"
                name="sentiment"
                value="Negative"
                checked={formData.sentiment === 'Negative'}
                onChange={handleChange}
              />
              <span className="emoji">😞</span> Negative
            </label>
          </div>

          <div className="form-field">
            <label>Outcomes</label>
            <textarea
              name="outcomes"
              value={formData.outcomes}
              onChange={handleChange}
              rows="3"
              placeholder="Key outcomes or agreements..."
            />
          </div>
        </div>

        {/* Follow-up Section */}
        <div className="form-section">
          <h3 className="section-title">Follow-up Actions</h3>
          
          <div className="form-field">
            <textarea
              name="follow_up_actions"
              value={formData.follow_up_actions}
              onChange={handleChange}
              rows="3"
              placeholder="Enter next steps or tasks..."
            />
          </div>

          <div className="ai-suggestions">
            <h4>AI Assistant Suggestions:</h4>
            <ul>
              <li>✓ Schedule follow-up meeting in 2 weeks</li>
              <li>✓ Send Oncologist Phase 3 PDF</li>
              <li>✓ Add Dr.chenai to advisory board invite list</li>
            </ul>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="submit-button">
            📝 Log
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalFormMode;