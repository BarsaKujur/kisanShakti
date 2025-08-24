// cropPlans.js

export const cropPlans = {
  Paddy: {
    duration: "120–150 days",
    stages: [
      { label: "Sowing", icon: "🌱", month: "June", window: "15–25" },
      { label: "Irrigation", icon: "💧", month: "July–Sep", frequency: "Every 20 days" },
      { label: "Fertilizer", icon: "🌿", month: "July–Aug", frequency: "2 doses" },
      { label: "Pest Alert", icon: "🪲", month: "Aug–Sep", window: "Weekly monitoring" },
      { label: "PMFBY Deadline", icon: "📅", month: "July", window: "15–31" },
      { label: "Mandi Fair", icon: "🏬", month: "Oct", window: "10–20" },
      { label: "Harvest", icon: "🌾", month: "Oct", window: "10–20" }
    ]
  },

  Wheat: {
    duration: "140–150 days",
    stages: [
      { label: "Sowing", icon: "🌱", month: "Nov", window: "10–20" },
      { label: "Irrigation", icon: "💧", month: "Dec–Feb", frequency: "Every 25 days" },
      { label: "Fertilizer", icon: "🌿", month: "Dec–Jan", frequency: "2 doses" },
      { label: "Pest Alert", icon: "🪲", month: "Jan", window: "Rust/pest check" },
      { label: "PMFBY Deadline", icon: "📅", month: "Dec", window: "1–15" },
      { label: "Mandi Fair", icon: "🏬", month: "Apr", window: "5–15" },
      { label: "Harvest", icon: "🌾", month: "Mar–Apr", window: "25–10" }
    ]
  },

  Maize: {
    duration: "110–120 days",
    stages: [
      { label: "Sowing", icon: "🌱", month: "July", window: "1–10" },
      { label: "Irrigation", icon: "💧", month: "Jul–Aug", frequency: "Every 15 days" },
      { label: "Fertilizer", icon: "🌿", month: "Jul–Aug", frequency: "2 doses" },
      { label: "Pest Alert", icon: "🪲", month: "Aug", window: "Stem borer check" },
      { label: "PMFBY Deadline", icon: "📅", month: "July", window: "1–15" },
      { label: "Mandi Fair", icon: "🏬", month: "Oct", window: "15–25" },
      { label: "Harvest", icon: "🌾", month: "Oct", window: "15–25" }
    ]
  },

  Mustard: {
    duration: "90–110 days",
    stages: [
      { label: "Sowing", icon: "🌱", month: "Oct–Nov", window: "5–15" },
      { label: "Irrigation", icon: "💧", month: "Nov–Jan", frequency: "Every 20 days" },
      { label: "Fertilizer", icon: "🌿", month: "Nov–Dec", frequency: "2 doses" },
      { label: "Pest Alert", icon: "🪲", month: "Dec–Jan", window: "Aphids check" },
      { label: "PMFBY Deadline", icon: "📅", month: "Nov", window: "1–10" },
      { label: "Mandi Fair", icon: "🏬", month: "Feb", window: "20–28" },
      { label: "Harvest", icon: "🌾", month: "Feb–Mar", window: "15–25" }
    ]
  },

  Soybean: {
    duration: "100–120 days",
    stages: [
      { label: "Sowing", icon: "🌱", month: "June–July", window: "10–20" },
      { label: "Irrigation", icon: "💧", month: "July–Aug", frequency: "Every 15 days" },
      { label: "Fertilizer", icon: "🌿", month: "July", frequency: "2 doses" },
      { label: "Pest Alert", icon: "🪲", month: "Aug", window: "Whitefly monitoring" },
      { label: "PMFBY Deadline", icon: "📅", month: "July", window: "5–15" },
      { label: "Mandi Fair", icon: "🏬", month: "Oct", window: "1–10" },
      { label: "Harvest", icon: "🌾", month: "Oct", window: "1–15" }
    ]
  },

  Cotton: {
    duration: "150–180 days",
    stages: [
      { label: "Sowing", icon: "🌱", month: "Apr–May", window: "15–30" },
      { label: "Irrigation", icon: "💧", month: "May–Aug", frequency: "Every 15 days" },
      { label: "Fertilizer", icon: "🌿", month: "Jun–Jul", frequency: "2 doses" },
      { label: "Pest Alert", icon: "🪲", month: "Jul–Aug", window: "Bollworm check" },
      { label: "PMFBY Deadline", icon: "📅", month: "May", window: "1–15" },
      { label: "Mandi Fair", icon: "🏬", month: "Oct–Nov", window: "10–20" },
      { label: "Harvest", icon: "🌾", month: "Oct–Nov", window: "10–20" }
    ]
  },

  Sugarcane: {
    duration: "270–365 days",
    stages: [
      { label: "Sowing", icon: "🌱", month: "Feb–Mar", window: "15–30" },
      { label: "Irrigation", icon: "💧", month: "Mar–Nov", frequency: "Every 15 days" },
      { label: "Fertilizer", icon: "🌿", month: "Apr–Jun", frequency: "3 doses" },
      { label: "Pest Alert", icon: "🪲", month: "Jul–Sep", window: "Top borer check" },
      { label: "PMFBY Deadline", icon: "📅", month: "Mar", window: "1–15" },
      { label: "Mandi Fair", icon: "🏬", month: "Jan", window: "10–20" },
      { label: "Harvest", icon: "🌾", month: "Dec–Jan", window: "10–20" }
    ]
  },

  Barley: {
    duration: "120–130 days",
    stages: [
      { label: "Sowing", icon: "🌱", month: "Nov", window: "1–15" },
      { label: "Irrigation", icon: "💧", month: "Dec–Feb", frequency: "Every 25 days" },
      { label: "Fertilizer", icon: "🌿", month: "Dec–Jan", frequency: "2 doses" },
      { label: "Pest Alert", icon: "🪲", month: "Jan–Feb", window: "Rust check" },
      { label: "PMFBY Deadline", icon: "📅", month: "Dec", window: "1–10" },
      { label: "Mandi Fair", icon: "🏬", month: "Apr", window: "5–15" },
      { label: "Harvest", icon: "🌾", month: "Mar–Apr", window: "25–10" }
    ]
  },

  Groundnut: {
    duration: "100–120 days",
    stages: [
      { label: "Sowing", icon: "🌱", month: "Jun–Jul", window: "10–20" },
      { label: "Irrigation", icon: "💧", month: "Jul–Sep", frequency: "Every 12 days" },
      { label: "Fertilizer", icon: "🌿", month: "Jul", frequency: "2 doses" },
      { label: "Pest Alert", icon: "🪲", month: "Aug", window: "Leaf spot check" },
      { label: "PMFBY Deadline", icon: "📅", month: "Jul", window: "1–10" },
      { label: "Mandi Fair", icon: "🏬", month: "Oct", window: "5–15" },
      { label: "Harvest", icon: "🌾", month: "Oct", window: "5–15" }
    ]
  },

  Bajra: {
    duration: "80–100 days",
    stages: [
      { label: "Sowing", icon: "🌱", month: "Jun–Jul", window: "15–25" },
      { label: "Irrigation", icon: "💧", month: "Jul–Sep", frequency: "Every 12–15 days" },
      { label: "Fertilizer", icon: "🌿", month: "Jul", frequency: "2 doses" },
      { label: "Pest Alert", icon: "🪲", month: "Aug", window: "Downy mildew check" },
      { label: "PMFBY Deadline", icon: "📅", month: "Jul", window: "10–20" },
      { label: "Mandi Fair", icon: "🏬", month: "Sep–Oct", window: "1–10" },
      { label: "Harvest", icon: "🌾", month: "Sep–Oct", window: "1–10" }
    ]
  },

  Chickpea: {
    duration: "100–120 days",
    stages: [
      { label: "Sowing", icon: "🌱", month: "Oct–Nov", window: "5–15" },
      { label: "Irrigation", icon: "💧", month: "Nov–Feb", frequency: "Every 20 days" },
      { label: "Fertilizer", icon: "🌿", month: "Nov–Dec", frequency: "2 doses" },
      { label: "Pest Alert", icon: "🪲", month: "Dec–Jan", window: "Pod borer check" },
      { label: "PMFBY Deadline", icon: "📅", month: "Nov", window: "1–10" },
      { label: "Mandi Fair", icon: "🏬", month: "Mar", window: "5–15" },
      { label: "Harvest", icon: "🌾", month: "Mar", window: "5–15" }
    ]
  },

  Jute: {
    duration: "120–150 days",
    stages: [
      { label: "Sowing", icon: "🌱", month: "Mar–May", window: "15–30" },
      { label: "Irrigation", icon: "💧", month: "Apr–Jun", frequency: "Every 20 days" },
      { label: "Fertilizer", icon: "🌿", month: "May", frequency: "2 doses" },
      { label: "Pest Alert", icon: "🪲", month: "Jun–Jul", window: "Stem weevil check" },
      { label: "PMFBY Deadline", icon: "📅", month: "Apr", window: "1–10" },
      { label: "Mandi Fair", icon: "🏬", month: "Aug", window: "10–20" },
      { label: "Harvest", icon: "🌾", month: "Aug", window: "10–20" }
    ]
  }
};
