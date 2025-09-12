from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend origin if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class ForecastRequest(BaseModel):
    State: str
    District: str
    Crop: str
    Season: str

# Dummy forecast data
@app.post("/forecast")
def get_forecast(data: ForecastRequest):
    print(f"Received forecast request: {data}")
    return {
        "January": [120, 130, 125, 135],
        "February": [140, 145, 150, 155],
        "March": [160, 165, 170, 175],
        "April": [180, 185, 190, 195]
    }
