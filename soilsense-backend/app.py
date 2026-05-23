from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load the trained model and encoder
MODEL_PATH = 'crop_model.pkl'
if os.path.exists(MODEL_PATH):
    with open(MODEL_PATH, 'rb') as f:
        model_data = pickle.load(f)
        rf_model = model_data['model']
        le = model_data['encoder']
else:
    rf_model = None
    le = None

def get_crop_recommendations(n, p, k, temp, humidity, ph):
    """Get top 5 crop recommendations from ML model."""
    if rf_model is None:
        return []
    
    try:
        sample = np.array([[n, p, k, temp, humidity, ph]])
        probabilities = rf_model.predict_proba(sample)[0]
        
        recommendations = []
        for crop, prob in zip(le.classes_, probabilities):
            recommendations.append({
                'crop': crop,
                'confidence': round(prob * 100, 2)
            })
        
        recommendations = sorted(recommendations, key=lambda x: x['confidence'], reverse=True)[:5]
        return recommendations
    except Exception as e:
        print(f"Error in crop recommendation: {e}")
        return []

@app.route('/api/analyze', methods=['POST'])
def analyze_soil():
    """Main endpoint for soil analysis."""
    try:
        data = request.json
        
        # Extract 6 inputs only
        n = float(data.get('n', 140))
        p = float(data.get('p', 30))
        k = float(data.get('k', 200))
        temp = float(data.get('temp', 22))
        humidity = float(data.get('humidity', 70))
        ph = float(data.get('ph', 6.5))
        
        # Get crop recommendations
        crops = get_crop_recommendations(n, p, k, temp, humidity, ph)
        
        return jsonify({
            'success': True,
            'crops': crops,
            'input': {
                'n': n,
                'p': p,
                'k': k,
                'temp': temp,
                'humidity': humidity,
                'ph': ph
            }
        })
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({
        'status': 'ok',
        'model_loaded': rf_model is not None
    })

if __name__ == '__main__':
    print("🌱 SoilSense Backend starting...")
    print(f"Model loaded: {rf_model is not None}")
    app.run(debug=True, host='0.0.0.0', port=5000)