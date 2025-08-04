export const fetchSoilData = async (lat, lon) => {
    const url = `https://rest.soilgrids.org/query?lon=${lon}&lat=${lat}`;
    const response = await fetch(url);
    const data = await response.json();
  
    const soilType = data.properties?.taxonname || 'Unknown';
    const soilPH = data.properties?.phh2o?.mean || null;
  
    return { soilType, soilPH };
  };