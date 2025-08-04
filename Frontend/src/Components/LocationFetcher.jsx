// import { useEffect } from 'react';

// const LocationFetcher = ({ setLocation }) => {
//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         async (pos) => {
//           const { latitude, longitude } = pos.coords;
//           const rawLocation = `${latitude}, ${longitude}`;

//           try {
//             const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=KEY_1`);
//             const data = await response.json();
//             const formatted = data.results[0]?.formatted || rawLocation;
//             setLocation(formatted);
//           } catch (err) {
//             console.error("Geocoding failed:", err);
//             setLocation(rawLocation);
//           }
//         },
//         (err) => {
//           console.error("Geolocation error:", err.message);
//         }
//       );
//     } else {
//       console.error("Geolocation not available in browser");
//     }
//   }, [setLocation]);

//   return null;
// };

// export default LocationFetcher;
import { useEffect, useRef } from 'react';

const LocationFetcher = ({ setLocation, setCoords }) => {
  const hasFetched = useRef(false); // 🛑 Prevent multiple fetches

  useEffect(() => {
    if (hasFetched.current) return;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const rawLocation = `${latitude}, ${longitude}`;
          setCoords({ lat: latitude, lon: longitude });
          hasFetched.current = true;

          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=KEY_1`
            );
            const data = await response.json();
            const formatted = data.results[0]?.formatted || rawLocation;
            setLocation(formatted);
          } catch (err) {
            console.error("Geocoding failed:", err);
            setLocation(rawLocation);
          }
        },
        (err) => {
          console.error("Geolocation error:", err.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    } else {
      console.error("Geolocation not available in this browser.");
    }
  }, [setLocation, setCoords]);

  return null;
};

export default LocationFetcher;
