import { useEffect, useState } from "react";
import { getMarketPrices } from "../services/marketApi";
import MarketPriceTable from "./MarketPriceTable";
import PriceForecastChart from "./PriceForecastChart";

const LiveMarketPrice = () => {
  const [prices, setPrices] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    getMarketPrices().then((res) => setPrices(res));
  }, []);

  return (
    <div>
      <MarketPriceTable data={prices} />
      
      {/* Show chart only when a crop is selected */}
      {selectedCrop && (
        <PriceForecastChart data={selectedCrop.history} />
      )}

      {/* Buttons to select a crop */}
      <div className="flex gap-2 mt-4">
        {prices.map((crop, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCrop(crop)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            {crop.crop}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LiveMarketPrice;
