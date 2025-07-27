src/
├── components/
│   ├── Navbar/                 # Top navigation bar
│   ├── HeroSection/            # Homepage intro section
│   ├── FeatureStrip/           # Homepage feature highlights
│   ├── ProductCard/            # Reusable product display
│   ├── ProductForm/            # Add/edit product
│   ├── WeatherWidget/          # Weather display
│   ├── CropAdvisorForm/        # Input for crop recommendation
│   ├── CropAdvisorResult/      # Output for crop recommendation
│   ├── EducationCard/          # Farming technique content
│   ├── MarketTable/            # Live market prices (optional)
│   ├── ChatInterface/          # Chatbot UI
│   ├── Footer/                 # Bottom section
│   ├── LanguageSwitcher/       # Multilingual toggle
│   └── VoiceInput/             # Voice input (optional)
├── pages/
│   ├── HomePage.jsx
│   ├── BuyPage.jsx
│   ├── SellPage.jsx
│   ├── CropAdvisorPage.jsx
│   ├── WeatherPage.jsx
│   ├── LearnPage.jsx
│   ├── LoginPage.jsx
│   ├── SigninPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── ChatPage.jsx
│   └── ProfilePage.jsx
├── services/                   # API calls
├── utils/                      # Helper functions
├── App.jsx
└── main.jsx



src/
├── components/
│   ├── Navbar/
│   ├── HeroSection/
│   ├── FeatureStrip/
│   ├── ProductCard/
│   ├── ProductForm/
│   ├── WeatherWidget/
│   ├── CropAdvisorForm/
│   ├── CropAdvisorResult/
│   ├── PestDetectionTool/           # NEW: Pest identification and advice
│   ├── FertilizerAdvisor/          # NEW: Nutrient and fertilizer guidance
│   ├── SchemeFinder/               # NEW: Government schemes and subsidies
│   ├── CropCalendarAssistant/      # NEW: Crop timeline and planning
│   ├── SectionTabs/                # NEW: Tab navigation for advisory modules
│   ├── EducationCard/
│   ├── MarketTable/
│   ├── ChatInterface/
│   ├── LanguageSwitcher/
│   └── VoiceInput/
├── pages/
│   ├── HomePage.jsx
│   ├── BuyPage.jsx
│   ├── SellPage.jsx
│   ├── CropAdvisorPage.jsx         # Expanded to include all advisory tools
│   ├── WeatherPage.jsx
│   ├── LearnPage.jsx
│   ├── LoginPage.jsx
│   ├── SigninPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── ChatPage.jsx
│   └── ProfilePage.jsx
├── services/
│   ├── cropService.js              # Handles crop recommendation API
│   ├── pestService.js              # Pest detection logic/API
│   ├── fertilizerService.js        # Fertilizer advisory API
│   ├── schemeService.js            # Government schemes API
│   └── calendarService.js          # Crop calendar logic
├── utils/
│   ├── formValidation.js
│   ├── scoreCalculator.js
│   ├── localizationHelper.js
│   └── dateUtils.js
├── contexts/                       # NEW: Global state management
│   ├── AdvisoryContext.jsx
│   ├── AuthContext.jsx
│   └── LanguageContext.jsx
├── hooks/                          # NEW: Custom logic hooks
│   ├── useCropRecommendation.js
│   ├── usePestDetection.js
│   ├── useFertilizerAdvice.js
│   ├── useSchemeFinder.js
│   └── useCropCalendar.js
├── data/                           # NEW: Static or seed data
│   ├── cropTypes.json
│   ├── pestList.json
│   ├── fertilizerGuide.json
│   ├── schemes.json
│   └── cropCalendarTemplates.json
├── translations/                   # NEW: Multilingual support
│   ├── en.json
│   ├── hi.json
│   └── or.json
├── App.jsx
└── main.jsx
