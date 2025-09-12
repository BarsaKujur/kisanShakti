import React, { useEffect, useState } from "react";
import MarketPriceTable from "../Components/MarketPriceTable";
import MandiLocator from "../Components/MandiLocator";
import PriceForecastChart from "../Components/PriceForecastChart";
import { getMarketPrices, getMandiLocations, getPriceForecast } from "../services/marketApi";

const MarketLinkage = () => {
  const [prices, setPrices] = useState([]);
  const [mandis, setMandis] = useState([]);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    getMarketPrices().then(setPrices);
    getMandiLocations().then(setMandis);
    getPriceForecast().then(setForecast);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-green-700">🌾 Market Linkage & Price Forecasts</h1>

      <MarketPriceTable data={prices} />
      <MandiLocator data={mandis} />
      <PriceForecastChart data={forecast} />
    </div>
  );
};

export default MarketLinkage;
