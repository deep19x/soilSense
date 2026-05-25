

import numpy as np
import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score


class CropRecommender:
    """Simple crop recommendation using Random Forest."""
    
    def __init__(self, csv_path):
        self.csv_path = csv_path
        self.df = None
        self.X = None
        self.y = None
        self.y_encoded = None
        self.le = LabelEncoder()
        self.model = None
        self.accuracy = None
        self.features = ['N', 'P', 'K', 'moisture']  # Only 4 features
        
    def load_data(self):
        """Load CSV dataset and select only N, P, K, moisture features."""
        self.df = pd.read_csv(self.csv_path)
        # Select only required features
        self.X = self.df[self.features]
        self.y = self.df['label']
        self.y_encoded = self.le.fit_transform(self.y)
        print(f"✓ Loaded {len(self.df)} samples, {len(self.le.classes_)} crops")
        print(f"✓ Using features: {self.features}")
        return self
    
    def train(self):
        """Train Random Forest model."""
        X_train, X_test, y_train, y_test = train_test_split(
            self.X, self.y_encoded, test_size=0.2, random_state=42, stratify=self.y_encoded
        )
        
        self.model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
        self.model.fit(X_train, y_train)
        
        y_pred = self.model.predict(X_test)
        self.accuracy = accuracy_score(y_test, y_pred)
        print(f"✓ Model trained. Accuracy: {self.accuracy*100:.2f}%")
        return self
    
    def predict(self, input_data):
        """
        Predict crop for single sample.
        Input: [N, P, K, moisture]
        Returns: crop name (string)
        """
        input_data = np.array(input_data).reshape(1, -1)
        pred = self.model.predict(input_data)[0]
        return self.le.inverse_transform([pred])[0]
    
    def predict_batch(self, input_data):
        """Predict crops for multiple samples."""
        input_data = np.array(input_data)
        preds = self.model.predict(input_data)
        return list(self.le.inverse_transform(preds))
    
    def get_top_5(self, input_data):
        """Get top 5 recommendations with confidence scores."""
        input_data = np.array(input_data).reshape(1, -1)
        probs = self.model.predict_proba(input_data)[0]
        
        recommendations = []
        for crop, prob in zip(self.le.classes_, probs):
            recommendations.append({'crop': crop, 'confidence': prob})
        
        recommendations.sort(key=lambda x: x['confidence'], reverse=True)
        return recommendations[:5]
    
    def save_model(self, filepath):
        """Save trained model."""
        with open(filepath, 'wb') as f:
            pickle.dump({'model': self.model, 'le': self.le}, f)
        print(f"✓ Model saved to {filepath}")
    
    def load_model(self, filepath):
        """Load trained model."""
        with open(filepath, 'rb') as f:
            data = pickle.load(f)
        self.model = data['model']
        self.le = data['le']
        print(f"✓ Model loaded from {filepath}")
        return self


# Example usage
if __name__ == "__main__":
    recommender = CropRecommender('Crop_recommendation.csv')
    recommender.load_data().train()
    
    # Single prediction - [N, P, K, moisture]
    sample = [90, 42, 43, 82.00]
    crop = recommender.predict(sample)
    print(f"\nPredicted crop: {crop}")
    
    # Top 5 recommendations
    top_5 = recommender.get_top_5(sample)
    print("\nTop 5 recommendations:")
    for i, rec in enumerate(top_5, 1):
        print(f"{i}. {rec['crop']}: {rec['confidence']*100:.2f}%")
    
    batch = [
        [90, 42, 43, 82.00],
        [60, 55, 44, 82.32],
        [74, 35, 40, 80.16]
    ]
    batch_preds = recommender.predict_batch(batch)
    print(f"\nBatch predictions: {batch_preds}")
    
    # Save model
    recommender.save_model('crop_model.pkl')
    
    recommender2 = CropRecommender('Crop_recommendation.csv')
    recommender2.load_model('crop_model.pkl')
    print(f"Loaded model prediction: {recommender2.predict(sample)}")