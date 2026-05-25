from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from cropRecommendation import CropRecommender

app = Flask(__name__)
CORS(app)  # ← ADD THIS LINE

# Load model once at startup
recommender = CropRecommender('Crop_recommendation_NPK_moisture.csv')
recommender.load_model('crop_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    """Receive sensor data and return crop prediction"""
    try:
        data = request.get_json()
        
        # Extract values
        N = float(data.get('N'))
        P = float(data.get('P'))
        K = float(data.get('K'))
        moisture = float(data.get('moisture'))
        
        # Predict
        crop = recommender.predict([N, P, K, moisture])
        
        # Get confidence
        top_5 = recommender.get_top_5([N, P, K, moisture])
        confidence = top_5[0]['confidence'] * 100
        
        return jsonify({
            'success': True,
            'crop': crop,
            'confidence': round(confidence, 2),
            'top_5': [
                {'rank': i+1, 'crop': rec['crop'], 'confidence': round(rec['confidence']*100, 2)}
                for i, rec in enumerate(top_5)
            ]
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400


@app.route('/health', methods=['GET'])
def health():
    """Check if API is running"""
    return jsonify({'status': 'running'}), 200


if __name__ == '__main__':
    print("🌾 Crop Recommendation API")
    print("📍 Running on http://localhost:5000")
    print("📡 Endpoint: POST /predict")
    print("✓ Model loaded from crop_model.pkl\n")
    app.run(debug=True, host='0.0.0.0', port=5000)