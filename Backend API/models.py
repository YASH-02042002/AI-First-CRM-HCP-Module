from sqlalchemy import Column, Integer, String, Text, DateTime, Float, Boolean
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class HCPInteraction(Base):
    __tablename__ = "hcp_interactions"
    
    id = Column(Integer, primary_key=True, index=True)
    hcp_name = Column(String(255), nullable=False)
    hcp_specialty = Column(String(255))
    interaction_date = Column(DateTime, default=datetime.utcnow)
    interaction_type = Column(String(100))
    location = Column(String(255))
    duration_minutes = Column(Integer)
    discussion_topics = Column(Text)
    products_discussed = Column(Text)
    samples_provided = Column(String(500))
    next_steps = Column(Text)
    sentiment_score = Column(Float)
    key_insights = Column(Text)
    follow_up_date = Column(DateTime)
    sales_rep_name = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)