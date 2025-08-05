import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# Sample training data
data = pd.DataFrame({
    'crop': ['wheat', 'rice', 'maize', 'cotton'],
    'soilPH': [6.5, 5.5, 6.8, 7.0],
    'temperature': [22, 30, 28, 35],
    'rainfall': [120, 200, 150, 100],
    'fertilizer': ['NPK', 'Urea', 'DAP', 'Compost']
})

# Encode crop and fertilizer
crop_encoder = LabelEncoder()
fertilizer_encoder = LabelEncoder()
data['crop_encoded'] = crop_encoder.fit_transform(data['crop'])
data['fertilizer_encoded'] = fertilizer_encoder.fit_transform(data['fertilizer'])

# Prepare features and target
X = data[['crop_encoded', 'soilPH', 'temperature', 'rainfall']]
y = data['fertilizer_encoded']

# Train model
model = RandomForestClassifier()
model.fit(X, y)

# Save model and encoders
os.makedirs("model", exist_ok=True)
joblib.dump(model, 'model/fertilizer_model.pkl')
joblib.dump(crop_encoder, 'model/crop_encoder.pkl')
joblib.dump(fertilizer_encoder, 'model/fertilizer_encoder.pkl')

print("✅ Model and encoders saved.")
