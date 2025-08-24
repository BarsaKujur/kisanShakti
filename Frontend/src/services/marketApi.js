export const getMarketPrices = async () => {
    return [
      { crop: "Wheat", price: "₹2200/qtl" },
      { crop: "Paddy", price: "₹1900/qtl" },
      { crop: "Maize", price: "₹1700/qtl" },
    ];
  };
  
  export const getMandiLocations = async () => {
    return [
      { mandi: "Ranchi Mandi", distance: "12 km" },
      { mandi: "Hazaribagh Mandi", distance: "45 km" },
    ];
  };
  
  export const getPriceForecast = async () => {
    return [
      { month: "Aug", price: 2100 },
      { month: "Sep", price: 2150 },
      { month: "Oct", price: 2250 },
      { month: "Nov", price: 2300 },
    ];
  };
  