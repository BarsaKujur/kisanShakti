from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os

app = Flask(__name__)
CORS(app)

# Load ML model and encoders
model = joblib.load('model/fertilizer_model.pkl')
crop_encoder = joblib.load('model/crop_encoder.pkl')
fertilizer_encoder = joblib.load('model/fertilizer_encoder.pkl')

@app.route('/api/fertilizer-advice', methods=['POST'])
def fertilizer_advice():
    data = request.get_json()
    try:
        crop = data.get('crop')
        soil_ph = float(data.get('soilPH'))
        temperature = float(data.get('temperature'))
        rainfall = float(data.get('rainfall'))

        crop_encoded = crop_encoder.transform([crop.lower()])[0]
        features = [[crop_encoded, soil_ph, temperature, rainfall]]
        prediction = model.predict(features)[0]
        fertilizer = fertilizer_encoder.inverse_transform([prediction])[0]

        return jsonify({'recommendation': f'Recommended fertilizer: {fertilizer}'})
    except Exception as e:
        return jsonify({'recommendation': f'Error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
