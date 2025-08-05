import { useState, useEffect } from 'react';
import { fetchSoilData } from '../services/soilService';

const useSoilData = (lat, lon) => {
  const [soil, setSoil] = useState(null);

  useEffect(() => {
    if (lat && lon) {
      fetchSoilData(lat, lon).then(setSoil);
    }
  }, [lat, lon]);

  return soil;
};

export default useSoilData;