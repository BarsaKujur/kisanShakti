import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

data = pd.DataFrame({
    'temperature': [25, 30, 22, 35],
    'rainfall': [120, 200, 150, 80],
    'soilPH': [6.5, 7.0, 6.8, 6.0],
    'groundwaterLevel': [10, 15, 20, 8],
    'soilType': ['Loamy', 'Sandy', 'Clay', 'Loamy'],
    'irrigationType': ['drip', 'rain-fed', 'canal', 'drip'],
    'climateZone': ['tropical', 'semi-arid', 'temperate', 'arid'],
    'lastCrop': ['wheat', 'rice', 'maize', 'wheat'],
    'Crop': ['rice', 'maize', 'wheat', 'rice']
})

label_encoders = {}
for col in ['soilType', 'irrigationType', 'climateZone', 'lastCrop']:
    le = LabelEncoder()
    data[col] = le.fit_transform(data[col])
    label_encoders[col] = le

crop_encoder = LabelEncoder()
data['Crop'] = crop_encoder.fit_transform(data['Crop'])

X = data.drop(columns=['Crop'])
y = data['Crop']

model = RandomForestClassifier()
model.fit(X, y)

joblib.dump(model, 'model.pkl')
joblib.dump(crop_encoder, 'label_encoder.pkl')
