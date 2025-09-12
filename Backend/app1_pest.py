from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
import io
from PIL import Image

app = Flask(__name__)
CORS(app)

@app.route('/api/detect-pest', methods=['POST'])
def detect_pest():
    if 'image' not in request.files:
        return jsonify({'result': 'No image uploaded'}), 400

    image_file = request.files['image']
    image = Image.open(image_file.stream).convert('RGB')
    image = image.resize((128, 128))
    image_array = np.array(image)

    # Dummy condition — replace with real ML model prediction
    if np.mean(image_array) < 100:
        prediction = "Detected: Aphids"
    else:
        prediction = "No pests detected"

    return jsonify({'result': prediction})

if __name__ == '__main__':
    app.run(debug=True)
