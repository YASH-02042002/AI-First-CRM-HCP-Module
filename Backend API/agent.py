from langchain_groq import ChatGroq
from datetime import datetime
import json
import os
from dotenv import load_dotenv
import re

load_dotenv()

# Simple LLM without tools
llm = ChatGroq(
    temperature=0.5,
    model_name="llama-3.1-8b-instant",
    groq_api_key=os.getenv("GROQ_API_KEY")
)

# Storage
interactions_db = {}
interaction_counter = 0

def extract_interaction_details(user_message):
    """Extract HCP details from natural language"""
    message_lower = user_message.lower()
    
    # Extract HCP name
    hcp_name = "Unknown HCP"
    if "dr." in message_lower or "dr " in message_lower:
        # Find Dr. Name pattern
        match = re.search(r'dr\.?\s+([a-z]+(?:\s+[a-z]+)?)', message_lower, re.IGNORECASE)
        if match:
            hcp_name = "Dr. " + match.group(1).title()
    
    # Extract products
    products = []
    product_keywords = ["product", "medication", "drug", "treatment"]
    for keyword in product_keywords:
        if keyword in message_lower:
            # Try to find product name after keyword
            idx = message_lower.find(keyword)
            words_after = user_message[idx:].split()
            if len(words_after) > 1:
                products.append(words_after[1])
    
    # Extract sentiment
    sentiment = "Neutral"
    positive_words = ["positive", "great", "excellent", "enthusiastic", "interested", "happy", "good"]
    negative_words = ["negative", "concerned", "worried", "skeptical", "unhappy", "bad"]
    
    if any(word in message_lower for word in positive_words):
        sentiment = "Positive"
    elif any(word in message_lower for word in negative_words):
        sentiment = "Negative"
    
    return {
        "hcp_name": hcp_name,
        "products": ", ".join(products) if products else "Not specified",
        "sentiment": sentiment,
        "topics": user_message
    }

def process_user_message(user_message: str) -> str:
    """Process user message - SIMPLE & FAST"""
    global interaction_counter
    
    try:
        message_lower = user_message.lower()
        
        # Check what user wants to do
        if any(word in message_lower for word in ["log", "met", "met with", "discussed", "meeting"]):
            # LOG INTERACTION
            interaction_counter += 1
            details = extract_interaction_details(user_message)
            
            interaction = {
                "id": interaction_counter,
                "hcp_name": details["hcp_name"],
                "discussion_topics": details["topics"],
                "products_discussed": details["products"],
                "sentiment": details["sentiment"],
                "interaction_date": datetime.now().isoformat(),
                "created_at": datetime.now().strftime("%I:%M %p")
            }
            
            interactions_db[interaction_counter] = interaction
            
            response = f"""✅ **Interaction Logged Successfully!**

📋 **Interaction ID:** {interaction_counter}
👨‍⚕️ **HCP:** {details['hcp_name']}
💊 **Products:** {details['products']}
😊 **Sentiment:** {details['sentiment']}
⏰ **Time:** {interaction['created_at']}

📝 **Summary:** {user_message[:150]}{"..." if len(user_message) > 150 else ""}

Your interaction has been recorded in the system!"""
            
            return response
            
        elif "search" in message_lower or "find" in message_lower:
            # SEARCH INTERACTIONS
            if not interactions_db:
                return "No interactions found. Please log some interactions first!"
            
            results = []
            for int_id, interaction in interactions_db.items():
                results.append(f"**ID {int_id}:** {interaction['hcp_name']} - {interaction['sentiment']} sentiment")
            
            return f"**Found {len(results)} interaction(s):**\n\n" + "\n".join(results)
            
        elif "list" in message_lower or "all" in message_lower or "show" in message_lower:
            # LIST ALL
            if not interactions_db:
                return "No interactions logged yet. Start by logging your first interaction!"
            
            result = f"**Total Interactions: {len(interactions_db)}**\n\n"
            for int_id, interaction in interactions_db.items():
                result += f"• **ID {int_id}:** {interaction['hcp_name']} - {interaction['products_discussed']} ({interaction['sentiment']})\n"
            
            return result
            
        else:
            # GENERAL HELP
            return f"""👋 **Hello! I'm your AI Assistant.**

I can help you:
📝 **Log interactions** - Just describe your meeting
   Example: "Met Dr. Smith, discussed Product X, very positive"

🔍 **Search interactions** - Find past meetings
   Example: "Search for cardiologists"

📊 **List all** - See all logged interactions
   Example: "Show all interactions"

What would you like to do?"""
    
    except Exception as e:
        return f"I encountered an error: {str(e)}\n\nPlease try: 'Log meeting with Dr. Smith about Product X'"

# Export
__all__ = ["process_user_message", "interactions_db"]