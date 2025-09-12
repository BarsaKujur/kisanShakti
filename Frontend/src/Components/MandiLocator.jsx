import React, { useState } from "react";
import axios from "axios";
import { MapPin, LocateFixed, Loader2 } from "lucide-react";

// --- helpers ---
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Haversine distance (km)
const kmDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return +(R * c).toFixed(1);
};

// Merge results by unique place_id
const mergeUnique = (arrays) => {
  const map = new Map();
  arrays.flat().forEach((p) => {
    if (!map.has(p.place_id)) map.set(p.place_id, p);
  });
  return Array.from(map.values());
};

const MandiLocator = () => {
  const [placeInput, setPlaceInput] = useState("");
  const [results, setResults] = useState([]);
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const geocode = async (query) => {
    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      { params: { address: query, region: "in", key: GOOGLE_API_KEY } }
    );
    const hit = res?.data?.results?.[0];
    if (!hit) throw new Error("Location not found. Try a more specific name.");
    return hit.geometry.location; // { lat, lng }
  };

  const nearbySearch = async ({ lat, lng, keyword }) => {
    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: `${lat},${lng}`,
          radius: 50000, // 50 km
          keyword,
          key: GOOGLE_API_KEY,
        },
      }
    );
    return res?.data?.results || [];
  };

  const handleFind = async () => {
    setErr("");
    setResults([]);
    setCenter(null);

    if (!placeInput.trim()) {
      setErr("Please enter your village/town/city.");
      return;
    }

    setLoading(true);
    try {
      // 1) geocode input -> lat/lng
      const { lat, lng } = await geocode(placeInput);
      setCenter({ lat, lng });

      // 2) multiple keyword searches → merge unique
      const keywords = [
        "mandi",
        "APMC market",
        "market yard",
        "krishi upaj mandi",
      ];

      const batches = await Promise.all(
        keywords.map((k) => nearbySearch({ lat, lng, keyword: k }))
      );

      let merged = mergeUnique(batches);

      // 3) compute straight-line distances, sort by nearest
      merged = merged
        .map((p) => ({
          ...p,
          distance_km: kmDistance(
            lat,
            lng,
            p.geometry.location.lat,
            p.geometry.location.lng
          ),
        }))
        .sort((a, b) => a.distance_km - b.distance_km);

      setResults(merged.slice(0, 12)); // show top 12
    } catch (e) {
      console.error(e);
      setErr(
        e?.message ||
          "Could not fetch mandis. Check your API key, billing, or quota."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-emerald-50 via-amber-50 to-orange-50">
      <div className="w-full max-w-4xl rounded-3xl shadow-2xl bg-white/90 border border-emerald-200 p-8 backdrop-blur">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-emerald-700 flex items-center justify-center gap-3">
            <MapPin className="w-8 h-8" /> Find Nearest Mandi
          </h2>
          <p className="text-emerald-800/70 mt-2">
            Type your <b>village / town / city</b>. We’ll search 50 km around
            you for APMC/mandis/market yards and sort by distance.
          </p>
        </div>

        {/* Input Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <input
            value={placeInput}
            onChange={(e) => setPlaceInput(e.target.value)}
            placeholder="e.g., Azamgarh, UP"
            className="w-full sm:flex-1 rounded-xl border-2 border-emerald-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 outline-none px-4 py-3 text-lg"
          />
          <button
            onClick={handleFind}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-white font-semibold shadow-lg bg-gradient-to-r from-emerald-500 to-orange-500 hover:opacity-95"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Searching…
              </>
            ) : (
              <>
                <LocateFixed /> Find Mandi
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {err && (
          <p className="text-center text-red-600 mt-4 font-medium">{err}</p>
        )}

        {/* Center badge */}
        {center && (
          <div className="mt-6 text-center">
            <span className="inline-block rounded-full px-4 py-2 text-sm font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
              Searching near: {center.lat.toFixed(3)}, {center.lng.toFixed(3)}
            </span>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-emerald-800 mb-4 text-center">
              Nearest Mandis 🎯
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((r) => (
                <div
                  key={r.place_id}
                  className="rounded-2xl p-5 bg-gradient-to-tr from-emerald-100 via-amber-100 to-orange-100 border border-emerald-200 shadow hover:shadow-xl transition-all text-center"
                >
                  <div className="text-lg font-extrabold text-emerald-900">
                    {r.name}
                  </div>
                  <div className="text-sm text-emerald-800/80 mt-1">
                    {r.vicinity || r.formatted_address || "Address unavailable"}
                  </div>
                  <div className="text-orange-700 font-bold text-xl mt-3">
                    {r.distance_km} km away
                  </div>

                  <a
                    className="mt-4 inline-block rounded-lg px-4 py-2 text-white font-semibold bg-gradient-to-r from-emerald-500 to-orange-500 hover:opacity-95 shadow"
                    href={`https://www.google.com/maps/place/?q=place_id:${r.place_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !err && results.length === 0 && center && (
          <p className="text-center text-emerald-700 mt-8">
            No mandis found within 50 km. Try a nearby town or a larger radius.
          </p>
        )}
      </div>
    </div>
  );
};

export default MandiLocator;
