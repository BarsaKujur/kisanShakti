export const sendLocationToBackend = async (lat, lon) => {
    try {
      const response = await fetch("http://localhost:5173/cropadvisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude: lat, longitude: lon }),
      });
      const data = await response.json();
      console.log("Recommended crops:", data.recommended_crops);
    } catch (err) {
      console.error("Error sending location:", err);
    }
  };