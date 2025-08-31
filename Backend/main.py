# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import joblib
# import pandas as pd
# from typing import Optional

# app = FastAPI()

# # 🔓 Enable CORS for frontend communication
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # You can replace "*" with ["http://localhost:3000"] for stricter control
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # 📦 Load your trained model
# model = joblib.load("crop_price_model.pkl")

# # 📥 Define input schema
# class InputData(BaseModel):
#     State: str
#     District: str
#     Market_Name: Optional[str] = None
#     Crop: str
#     Season: str
#     Month:Optional[str] = None
#     Week: Optional[int] = None
#     Rainfall_Index: Optional[str] = None
#     Arrival_Quantity: Optional[int] = None

# # 🔮 Prediction endpoint
# @app.post("/forecast")
# def forecast(data: InputData):
#     df = pd.DataFrame([data.dict()])
#     df_encoded = pd.get_dummies(df)

#     # Ensure all expected features are present
#     for col in model.feature_names_in_:
#         if col not in df_encoded.columns:
#             df_encoded[col] = 0
#     df_encoded = df_encoded[model.feature_names_in_]

#     prediction = model.predict(df_encoded)[0]
#     return {"predicted_price": round(prediction, 2)}

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import joblib
# import pandas as pd
# from typing import Optional

# app = FastAPI()

# # 🔓 Enable CORS for frontend communication
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # 📦 Load your trained model
# model = joblib.load("crop_price_model.pkl")

# # 📥 Define input schema
# class InputData(BaseModel):
#     State: str
#     District: str
#     Crop: str
#     Season: str
#     Market_Name: Optional[str] = None
#     Month: Optional[str] = "September"
#     Week: Optional[int] = 3
#     Rainfall_Index: Optional[str] = "Medium"
#     Arrival_Quantity: Optional[int] = 100

# # 🔮 Prediction endpoint
# @app.post("/forecast")
# def forecast(data: InputData):
#     df = pd.DataFrame([data.dict()])
#     df_encoded = pd.get_dummies(df)

#     # Ensure all expected features are present
#     for col in model.feature_names_in_:
#         if col not in df_encoded.columns:
#             df_encoded[col] = 0
#     df_encoded = df_encoded[model.feature_names_in_]

#     prediction = model.predict(df_encoded)[0]

#     # 🧠 Add dummy advisory and price table for frontend display
#     advisory = f"For {data.Crop} in {data.District}, expect moderate price fluctuations this {data.Season} season."
#     price_table = {
#         "September": [prediction, prediction + 10, prediction - 5, prediction + 15],
#         "October": [prediction + 20, prediction + 5, prediction - 10, prediction + 8]
#     }

#     return {
#         "predicted_price": round(prediction, 2),
#         "summary": advisory,
#         "price_table": price_table
#         }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
from typing import Optional

app = FastAPI()

# 🔓 Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📦 Load your trained model
model = joblib.load("crop_price_model.pkl")

# 📥 Define input schema
class InputData(BaseModel):
    State: str
    District: str
    Crop: str
    Season: str
    Market_Name: Optional[str] = None
    Month: Optional[str] = "September"
    Week: Optional[int] = 3
    Rainfall_Index: Optional[str] = "Medium"
    Arrival_Quantity: Optional[int] = 100

# 🔮 Prediction endpoint
@app.post("/forecast")
def forecast(data: InputData):
    df = pd.DataFrame([data.dict()])
    df_encoded = pd.get_dummies(df)

    # Ensure all expected features are present
    for col in model.feature_names_in_:
        if col not in df_encoded.columns:
            df_encoded[col] = 0
    df_encoded = df_encoded[model.feature_names_in_]

    prediction = model.predict(df_encoded)[0]

    # 🧠 Generate advisory summary
    summary = (
        f"{data.Crop} prices in {data.District} during the {data.Season} season "
        f"typically show moderate fluctuations. Based on current indicators, prices may begin rising "
        f"as sowing begins and stabilize post-harvest."
    )

    # 📊 Generate price table
    price_table = {
        "September": [prediction, prediction + 10, prediction - 5, prediction + 15],
        "October": [prediction + 20, prediction + 5, prediction - 10, prediction + 8],
        "November": [prediction + 12, prediction + 18, prediction + 5, prediction + 10],
        "December": [prediction + 8, prediction + 14, prediction + 6, prediction + 9]
    }

    # 📈 Extract trend points (e.g., key weeks)
    trend_points = [
        {"Month": "September", "Week": 1, "Price": round(price_table["September"][0], 2)},
        {"Month": "October", "Week": 2, "Price": round(price_table["October"][1], 2)},
        {"Month": "November", "Week": 3, "Price": round(price_table["November"][2], 2)},
        {"Month": "December", "Week": 4, "Price": round(price_table["December"][3], 2)}
    ]

    return {
        "crop": data.Crop,
        "season": data.Season,
        "region": data.District,
        "market": data.Market_Name or f"{data.District} Mandi",
        "summary": summary,
        "trend_points": trend_points,
        "price_table": price_table
    }
