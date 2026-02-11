"""
Test script to verify LangGraph tools are working
Run this to test all 5 tools independently
"""
import json
from agent import (
    log_interaction,
    edit_interaction,
    search_interactions,
    analyze_sentiment,
    generate_follow_up_plan
)

def test_tools():
    print("=" * 60)
    print("Testing LangGraph Tools")
    print("=" * 60)
    
    # Test 1: Log Interaction
    print("\n1. Testing log_interaction tool...")
    interaction_data = {
        "hcp_name": "Dr. John Smith",
        "hcp_specialty": "Cardiology",
        "interaction_type": "In-Person",
        "location": "City Hospital, New York",
        "duration_minutes": 45,
        "discussion_topics": "Discussed new heart medication CardioMax, clinical trial results, and patient outcomes",
        "products_discussed": "CardioMax, HeartGuard",
        "samples_provided": "CardioMax (10 units)",
        "next_steps": "Follow up in 2 weeks with additional clinical data",
        "sales_rep_name": "Sarah Johnson"
    }
    
    result1 = log_interaction.invoke(json.dumps(interaction_data))
    print("Result:", result1)
    
    # Test 2: Edit Interaction
    print("\n2. Testing edit_interaction tool...")
    edit_data = {
        "interaction_id": 1,
        "discussion_topics": "Discussed new heart medication CardioMax, clinical trial results, patient outcomes, and pricing details",
        "next_steps": "Follow up in 2 weeks with additional clinical data and pricing proposal"
    }
    
    result2 = edit_interaction.invoke(json.dumps(edit_data))
    print("Result:", result2)
    
    # Test 3: Search Interactions
    print("\n3. Testing search_interactions tool...")
    search_params = {
        "hcp_specialty": "Cardiology"
    }
    
    result3 = search_interactions.invoke(json.dumps(search_params))
    print("Result:", result3)
    
    # Test 4: Analyze Sentiment
    print("\n4. Testing analyze_sentiment tool...")
    interaction_text = """
    Dr. Smith was very enthusiastic about our new medication CardioMax. 
    He mentioned that the clinical trial results were impressive and 
    he's eager to try it with his patients. He asked several detailed 
    questions about dosing and contraindications, showing genuine interest. 
    Overall, the meeting went very well and he seems likely to become 
    a strong advocate for the product.
    """
    
    result4 = analyze_sentiment.invoke(interaction_text)
    print("Result:", result4)
    
    # Test 5: Generate Follow-up Plan
    print("\n5. Testing generate_follow_up_plan tool...")
    result5 = generate_follow_up_plan.invoke("1")
    print("Result:", result5)
    
    print("\n" + "=" * 60)
    print("All tools tested successfully!")
    print("=" * 60)

if __name__ == "__main__":
    print("\nNote: Make sure you have GROQ_API_KEY set in your .env file")
    print("This test will use the Groq API\n")
    
    try:
        test_tools()
    except Exception as e:
        print(f"\n✗ Error during testing: {e}")
        print("\nTroubleshooting:")
        print("1. Check that GROQ_API_KEY is set in .env")
        print("2. Verify you have internet connection")
        print("3. Make sure all dependencies are installed")