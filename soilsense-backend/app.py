import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import numpy as np
from cropRecommendation import CropRecommender

app = Flask(__name__)
CORS(app) 

# Load model once at startup
recommender = CropRecommender('Crop_recommendation_NPK_moisture.csv')
recommender.load_model('crop_model.pkl')

# --- Online Database Setup ---
# REPLACE THIS with your actual connection string from MongoDB Atlas
MONGO_URI = "mongodb+srv://dhroovkumar572_db_user:f2rNAq8xEYE8emHI@capstone.pojj4gn.mongodb.net/?retryWrites=true&w=majority"
try:
    db_client = MongoClient(MONGO_URI)
    db = db_client["soil_health_db"]
    sensor_history = db["sensor_readings"]
    print("✓ Connected to Online Database")
except Exception as e:
    print("Database connection failed:", e)

# --- Throttling Variables ---
last_db_save_time = 0
SAVE_INTERVAL_SECONDS = 3600  # 3600 seconds = 1 hour

# --- Global memory to store the latest ESP32 reading ---
latest_data = {
    "N": 0, "P": 0, "K": 0, "moisture": 0, 
    "prediction": None, "confidence": 0, "top_5": [],
    "last_updated": 0
}

@app.route('/predict', methods=['POST'])
def predict():
    """ESP32 sends data here. We predict and save it."""
    global latest_data, last_db_save_time
    try:
        data = request.get_json()
        
        N = float(data.get('N', 0))
        P = float(data.get('P', 0))
        K = float(data.get('K', 0))
        moisture = float(data.get('moisture', 0))
        
        if N == 0 and P == 0 and K == 0:
            crop = None
            top_5 = []
            confidence = 0
        else:
            # Only ask the AI for a prediction if we have actual soil data
            crop = recommender.predict([N, P, K, moisture])
            top_5 = recommender.get_top_5([N, P, K, moisture])
            confidence = top_5[0]['confidence'] * 100
        
        # Save the new data into memory (Updates React instantly)
        latest_data = {
            "N": N, "P": P, "K": K, "moisture": moisture,
            "prediction": crop, "confidence": round(confidence, 2),
            "top_5": top_5,
            "last_updated": time.time()
        }
        print(f"📡 New Data Saved: {latest_data}")

        # --- Database Throttling & Safety Logic ---
        current_time = time.time()
        
        # 1. Check if 1 hour has passed
        if current_time - last_db_save_time >= SAVE_INTERVAL_SECONDS:
            
            # 2. Check Free-Air Safety Rule (Only save if sensors are in soil)
            if N != 0 or P != 0 or K != 0:
                db_record = {
                    "N": N,
                    "P": P,
                    "K": K,
                    "moisture": moisture,
                    "predicted_crop": crop,
                    "confidence": round(confidence, 2),
                    "top_5": top_5, # Now saving all 5 predictions for the UI
                    "timestamp": current_time 
                }
                
                # Push to the online database
                sensor_history.insert_one(db_record)
                
                # Reset the timer
                last_db_save_time = current_time
                print(f"[{current_time}] Data saved to MongoDB!")
            else:
                print("⚠️ Free air detected (N,P,K = 0). Bypassing database insertion.")
        
        return jsonify({
                'success': True,
                'crop': crop,
                'confidence': round(confidence, 2),
                'top_5': [
                    {
                        'rank': i + 1,
                        'crop': item['crop'],
                        'confidence': round(item['confidence'] * 100, 2)
                    }
                    for i, item in enumerate(top_5)
                ]
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

# --- React frontend asks this route for the latest data ---
@app.route('/latest', methods=['GET'])
def get_latest():
    """React fetches data from here to update the real-time dashboard."""
    return jsonify(latest_data), 200

# --- React frontend asks this route for historical data ---
@app.route('/history', methods=['GET'])
def get_history():
    """Fetch the last 20 readings from MongoDB for the Dashboard history table."""
    try:
        recent_readings = list(sensor_history.find({}, {'_id': 0}).sort('timestamp', -1).limit(20))
        return jsonify(recent_readings), 200
    except Exception as e:
        # We are adding this line to force the error into your terminal!
        print(f"\n❌ CRASH REASON: {e}\n") 
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)