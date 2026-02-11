import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendChatMessage, addUserMessage } from '../Store/slices/chatSlice';
import './AIAssistantPanel.css';

const AIAssistantPanel = ({ onFillForm }) => {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chat);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const extractFormData = (message) => {
    // Extract data from user message
    const messageLower = message.toLowerCase();
    const formData = {};

    // Extract HCP name
    const drMatch = message.match(/dr\.?\s+([a-z]+(?:\s+[a-z]+)?)/i);
    if (drMatch) {
      formData.hcp_name = 'Dr. ' + drMatch[1];
    }

    // Extract products
    const productMatch = message.match(/product\s+([a-z0-9]+)/i);
    if (productMatch) {
      formData.products_discussed = productMatch[1];
    }

    // Extract topics/discussion
    const discussMatch = message.match(/discussed?\s+([^,\.]+)/i);
    if (discussMatch) {
      formData.topics_discussed = discussMatch[1];
    }

    // Extract sentiment
    if (messageLower.includes('positive') || messageLower.includes('enthusiastic') || 
        messageLower.includes('interested') || messageLower.includes('happy')) {
      formData.sentiment = 'Positive';
    } else if (messageLower.includes('negative') || messageLower.includes('concerned') || 
               messageLower.includes('skeptical')) {
      formData.sentiment = 'Negative';
    } else {
      formData.sentiment = 'Neutral';
    }

    // Extract materials/brochure
    if (messageLower.includes('brochure') || messageLower.includes('material')) {
      formData.materials_shared = message.match(/(?:shared|provided)\s+([^,\.]+)/i)?.[1] || 'Brochure';
    }

    // Extract samples
    const samplesMatch = message.match(/(\d+)\s+sample/i);
    if (samplesMatch) {
      formData.samples_distributed = `${samplesMatch[1]} units`;
    }

    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Extract form data from message
    const formData = extractFormData(input);

    // Fill the form if callback provided
    if (onFillForm && Object.keys(formData).length > 0) {
      onFillForm(formData);
    }

    dispatch(addUserMessage(input));
    const userInput = input;
    setInput('');
    
    try {
      await dispatch(sendChatMessage(userInput)).unwrap();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="ai-assistant-panel">
      <div className="assistant-header">
        <div className="assistant-icon">🤖</div>
        <div className="assistant-title">
          <h3>AI Assistant</h3>
          <p>Log using chat</p>
        </div>
      </div>

      <div className="assistant-welcome">
        <p className="welcome-text">
          Log interaction details here (e.g., "Met Dr. Smith, discussed Product X efficacy, positive sentiment, shared brochure") or ask for help.
        </p>
        <div className="welcome-hint">
          💡 <strong>Tip:</strong> Your message will auto-fill the form fields!
        </div>
      </div>

      <div className="chat-messages-container">
        {messages.length === 0 && (
          <div className="example-messages">
            <p className="example-title">Try these examples:</p>
            <button 
              className="example-btn"
              onClick={() => setInput("Met Dr. Smith, discussed Product X efficacy, positive sentiment, shared brochure")}
            >
              📝 "Met Dr. Smith, discussed Product X efficacy, positive sentiment, shared brochure"
            </button>
            <button 
              className="example-btn"
              onClick={() => setInput("Had a meeting with Dr. Johnson about CardioMax, she was very interested, provided 10 samples")}
            >
              📝 "Had meeting with Dr. Johnson about CardioMax, very interested, 10 samples"
            </button>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.role}`}>
            <div className="message-content">
              {message.content}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="chat-message assistant">
            <div className="message-content typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe interaction..."
          disabled={loading}
          className="chat-input-field"
        />
        <button 
          type="submit" 
          disabled={loading || !input.trim()} 
          className="chat-send-button"
        >
          📤 Log
        </button>
      </form>
    </div>
  );
};

export default AIAssistantPanel;