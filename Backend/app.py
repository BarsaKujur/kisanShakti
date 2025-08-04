from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the trained model
model = joblib.load("model.pkl")

# Dummy label encoder for crop classes (replace with your own)
label_encoder = joblib.load("label_encoder.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    features = [
        float(data['temperature']),
        float(data['rainfall']),
        float(data['soilPH']),
        float(data['groundwaterLevel']),
        encode_soil(data['soilType']),
        encode_irrigation(data['irrigationType']),
        encode_climate(data['climateZone']),
        encode_crop(data['lastCrop'])
    ]

    prediction = model.predict([features])[0]
    crop_name = label_encoder.inverse_transform([prediction])[0]

    recommendation = {
        "recommendations": [{
            "name": crop_name,
            "reason": "Best suited based on current environmental and soil parameters.",
            "yieldInfo": "Estimated yield: 2.5 tons/acre",
            "profitability": "High market demand"
        }]
    }

    return jsonify(recommendation)

# Encoding helpers (can be improved using full pipelines)
def encode_soil(soil):
    return {"Loamy": 0, "Sandy": 1, "Clay": 2, "Silty": 3}.get(soil, 0)

def encode_irrigation(irrigation):
    return {"rain-fed": 0, "drip": 1, "canal": 2}.get(irrigation, 0)

def encode_climate(climate):
    return {"tropical": 0, "semi-arid": 1, "temperate": 2, "arid": 3}.get(climate, 0)

def encode_crop(crop):
    return {"wheat": 0, "rice": 1, "maize": 2}.get(crop.lower(), 0)

if __name__ == "__main__":
    app.run(debug=True, port=5000)

