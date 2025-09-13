from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 🔹 Dummy crop price data
dummy_prices = {
    "Paddy": [
        {"month": "Jan", "price": 1800},
        {"month": "Feb", "price": 1850},
        {"month": "Mar", "price": 1900},
        {"month": "Apr", "price": 1950},
        {"month": "May", "price": 2000},
        {"month": "Jun", "price": 2100},
    ],
    "Wheat": [
        {"month": "Jan", "price": 2100},
        {"month": "Feb", "price": 2200},
        {"month": "Mar", "price": 2150},
        {"month": "Apr", "price": 2250},
        {"month": "May", "price": 2300},
        {"month": "Jun", "price": 2350},
    ],
    "Maize": [
        {"month": "Jan", "price": 1500},
        {"month": "Feb", "price": 1600},
        {"month": "Mar", "price": 1650},
        {"month": "Apr", "price": 1700},
        {"month": "May", "price": 1750},
        {"month": "Jun", "price": 1800},
    ],
}

@app.route("/predict_price", methods=["POST"])
def predict_price():
    data = request.json
    crop = data.get("crop", "Paddy")
    location = data.get("location", "Ranchi")

    # Pick dummy history for that crop
    history = dummy_prices.get(crop, dummy_prices["Paddy"])

    return jsonify({
        "crop": crop,
        "location": location,
        "history": history
    })

if __name__ == "__main__":
    app.run(debug=True)
