from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import uvicorn
from datetime import datetime

from database import engine, get_db
from models import Base, HCPInteraction
from schemas import InteractionCreate, InteractionUpdate, InteractionResponse, ChatMessage
from agent import process_user_message, interactions_db

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI-First CRM HCP Module", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {
        "message": "AI-First CRM HCP Module API",
        "version": "1.0.0",
        "status": "✅ Running",
        "endpoints": {
            "interactions": "/interactions",
            "chat": "/chat",
            "tools": "/tools",
            "docs": "/docs"
        }
    }


@app.post("/interactions/", response_model=InteractionResponse)
def create_interaction(interaction: InteractionCreate, db: Session = Depends(get_db)):
    """Create a new HCP interaction using structured form"""
    db_interaction = HCPInteraction(
        hcp_name=interaction.hcp_name,
        hcp_specialty=interaction.hcp_specialty,
        interaction_type=interaction.interaction_type,
        location=interaction.location,
        duration_minutes=interaction.duration_minutes,
        discussion_topics=interaction.discussion_topics,
        products_discussed=interaction.products_discussed,
        samples_provided=interaction.samples_provided,
        next_steps=interaction.next_steps,
        follow_up_date=interaction.follow_up_date,
        sales_rep_name=interaction.sales_rep_name
    )
    
    db.add(db_interaction)
    db.commit()
    db.refresh(db_interaction)
    
    return db_interaction


@app.get("/interactions/", response_model=List[InteractionResponse])
def read_interactions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all HCP interactions"""
    interactions = db.query(HCPInteraction).filter(
        HCPInteraction.is_active == True
    ).offset(skip).limit(limit).all()
    return interactions


@app.get("/interactions/{interaction_id}", response_model=InteractionResponse)
def read_interaction(interaction_id: int, db: Session = Depends(get_db)):
    """Get a specific HCP interaction"""
    interaction = db.query(HCPInteraction).filter(
        HCPInteraction.id == interaction_id,
        HCPInteraction.is_active == True
    ).first()
    
    if interaction is None:
        raise HTTPException(status_code=404, detail="Interaction not found")
    
    return interaction


@app.put("/interactions/{interaction_id}", response_model=InteractionResponse)
def update_interaction(
    interaction_id: int,
    interaction: InteractionUpdate,
    db: Session = Depends(get_db)
):
    """Update an existing HCP interaction"""
    db_interaction = db.query(HCPInteraction).filter(
        HCPInteraction.id == interaction_id,
        HCPInteraction.is_active == True
    ).first()
    
    if db_interaction is None:
        raise HTTPException(status_code=404, detail="Interaction not found")
    
    update_data = interaction.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_interaction, key, value)
    
    db_interaction.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_interaction)
    
    return db_interaction


@app.delete("/interactions/{interaction_id}")
def delete_interaction(interaction_id: int, db: Session = Depends(get_db)):
    """Soft delete an HCP interaction"""
    db_interaction = db.query(HCPInteraction).filter(
        HCPInteraction.id == interaction_id
    ).first()
    
    if db_interaction is None:
        raise HTTPException(status_code=404, detail="Interaction not found")
    
    db_interaction.is_active = False
    db.commit()
    
    return {"message": "Interaction deleted successfully"}


@app.post("/chat/")
def chat_with_agent(message: ChatMessage):
    """
    Conversational interface to log interactions using AI agent.
    Simple, fast, and reliable.
    """
    try:
        response = process_user_message(message.message)
        return {
            "response": response,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        return {
            "response": f"Error: {str(e)}\n\nPlease try: 'Log meeting with Dr. Smith about Product X'",
            "timestamp": datetime.now().isoformat()
        }


@app.get("/tools/")
def get_available_tools():
    """Get information about available features"""
    return {
        "features": [
            {
                "name": "Log Interaction",
                "description": "Log HCP interactions using natural language",
                "example": "Met Dr. Smith, discussed Product X, positive sentiment"
            },
            {
                "name": "Search Interactions",
                "description": "Search through logged interactions",
                "example": "Search for cardiologists"
            },
            {
                "name": "List All",
                "description": "View all logged interactions",
                "example": "Show all interactions"
            }
        ]
    }


@app.get("/interactions-memory/")
def get_memory_interactions():
    """Get interactions stored in agent's memory"""
    return {
        "count": len(interactions_db),
        "interactions": list(interactions_db.values())
    }


if __name__ == "__main__":
    print("=" * 70)
    print("🚀 AI-First CRM HCP Module - Backend Server")
    print("=" * 70)
    print("✅ Status: Running")
    print("📍 Server: http://localhost:8000")
    print("📚 API Docs: http://localhost:8000/docs")
    print("🔧 Interactive: http://localhost:8000/redoc")
    print("=" * 70)
    print("\n💡 Ready to accept requests!")
    print("🤖 AI Agent: Simple & Fast mode enabled")
    print("\n" + "=" * 70)
    uvicorn.run(app, host="0.0.0.0", port=8000)