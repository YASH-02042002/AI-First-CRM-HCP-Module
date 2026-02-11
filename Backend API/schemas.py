from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class InteractionBase(BaseModel):
    hcp_name: str
    hcp_specialty: Optional[str] = None
    interaction_type: Optional[str] = None
    location: Optional[str] = None
    duration_minutes: Optional[int] = None
    discussion_topics: Optional[str] = None
    products_discussed: Optional[str] = None
    samples_provided: Optional[str] = None
    next_steps: Optional[str] = None
    follow_up_date: Optional[datetime] = None
    sales_rep_name: Optional[str] = None

class InteractionCreate(InteractionBase):
    pass

class InteractionUpdate(BaseModel):
    hcp_name: Optional[str] = None
    hcp_specialty: Optional[str] = None
    interaction_type: Optional[str] = None
    location: Optional[str] = None
    duration_minutes: Optional[int] = None
    discussion_topics: Optional[str] = None
    products_discussed: Optional[str] = None
    samples_provided: Optional[str] = None
    next_steps: Optional[str] = None
    follow_up_date: Optional[datetime] = None
    sales_rep_name: Optional[str] = None

class InteractionResponse(InteractionBase):
    id: int
    interaction_date: datetime
    sentiment_score: Optional[float] = None
    key_insights: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    is_active: bool

    class Config:
        from_attributes = True

class ChatMessage(BaseModel):
    message: str