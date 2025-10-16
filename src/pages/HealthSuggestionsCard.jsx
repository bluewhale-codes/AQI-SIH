import React from "react";

const HealthSuggestionsCard = ({ 
  aqi = 157,
  userProfile = {
    isChildren: false,
    isSenior: false,
    hasBreathingProblem: false
  }
}) => {
  
  // Determine AQI level and get simple recommendations
  const getAQILevel = (value) => {
    if (value <= 50) return "good";
    if (value <= 100) return "okay";
    if (value <= 150) return "careful";
    if (value <= 200) return "bad";
    if (value <= 300) return "verybad";
    return "danger";
  };

  const level = getAQILevel(aqi);
  const isSensitive = Object.values(userProfile).some(v => v === true);

  // Get color scheme
  const getColors = () => {
    switch(level) {
      case "good": return { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", badge: "bg-green-500" };
      case "okay": return { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", badge: "bg-yellow-500" };
      case "careful": return { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", badge: "bg-orange-500" };
      case "bad": return { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "bg-red-500" };
      case "verybad": return { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", badge: "bg-purple-500" };
      case "danger": return { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", badge: "bg-rose-900" };
      default: return { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700", badge: "bg-gray-500" };
    }
  };

  const colors = getColors();

  // Simple action cards with large icons
  const getActions = () => {
    const actions = [];

    if (level === "good") {
      return [
        { emoji: "🏃‍♂️", title: "बाहर खेलें", subtitle: "Play Outside", desc: "आज हवा बहुत अच्छी है", color: "green" },
        { emoji: "🚴‍♀️", title: "व्यायाम करें", subtitle: "Exercise", desc: "दौड़ना और साइकिल चलाना सुरक्षित है", color: "green" },
        { emoji: "🪟", title: "खिड़कियाँ खोलें", subtitle: "Open Windows", desc: "ताजी हवा अंदर आने दें", color: "green" }
      ];
    }

    if (level === "okay") {
      if (isSensitive) {
        return [
          { emoji: "⚠️", title: "सावधान रहें", subtitle: "Be Careful", desc: "ज्यादा देर बाहर न रहें", color: "yellow" },
          { emoji: "🏠", title: "घर में रहें", subtitle: "Stay Inside", desc: "बुजुर्ग और बच्चे घर में रहें", color: "yellow" },
          { emoji: "🪟", title: "खिड़कियाँ बंद करें", subtitle: "Close Windows", desc: "शाम को खिड़कियाँ बंद रखें", color: "yellow" }
        ];
      }
      return [
        { emoji: "👍", title: "सामान्य गतिविधि", subtitle: "Normal Activity", desc: "सामान्य लोग बाहर जा सकते हैं", color: "yellow" },
        { emoji: "⏰", title: "समय सीमित करें", subtitle: "Limit Time", desc: "बहुत ज्यादा देर बाहर न रहें", color: "yellow" }
      ];
    }

    if (level === "careful" || level === "bad") {
      actions.push(
        { emoji: "😷", title: "मास्क पहनें", subtitle: "Wear Mask", desc: "बाहर जाते समय N95 मास्क जरूर पहनें", color: "orange", critical: true },
        { emoji: "🏠", title: "घर में रहें", subtitle: "Stay Indoors", desc: "जितना हो सके घर में रहें", color: "orange", critical: true }
      );
      
      if (isSensitive) {
        actions.push(
          { emoji: "🚫", title: "बाहर न जाएं", subtitle: "Don't Go Out", desc: "बच्चे, बुजुर्ग और बीमार घर में रहें", color: "red", critical: true },
          { emoji: "💊", title: "दवाई पास रखें", subtitle: "Keep Medicine", desc: "अपनी दवाई हमेशा पास रखें", color: "red", critical: true }
        );
      }
      
      actions.push(
        { emoji: "🪟", title: "खिड़की बंद", subtitle: "Windows Closed", desc: "सभी खिड़कियाँ और दरवाजे बंद रखें", color: "orange" },
        { emoji: "💨", title: "शुद्धिकरण यंत्र", subtitle: "Air Purifier", desc: "अगर हो तो शुद्धिकरण यंत्र चलाएं", color: "orange" }
      );
    }

    if (level === "verybad" || level === "danger") {
      return [
        { emoji: "🚨", title: "आपातकाल", subtitle: "EMERGENCY", desc: "बिल्कुल बाहर न जाएं", color: "red", critical: true },
        { emoji: "😷", title: "मास्क अनिवार्य", subtitle: "Mask Required", desc: "बाहर जाना जरूरी हो तो मास्क पहनें", color: "red", critical: true },
        { emoji: "🪟", title: "सब बंद करें", subtitle: "Seal Everything", desc: "खिड़की, दरवाजे सब बंद रखें", color: "red", critical: true },
        { emoji: "🏥", title: "डॉक्टर से मिलें", subtitle: "See Doctor", desc: "परेशानी हो तो तुरंत डॉक्टर को दिखाएं", color: "red", critical: true }
      ];
    }

    return actions;
  };

  const actions = getActions();

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
      {/* Large Visual Header */}
      <div className={`${colors.bg} ${colors.border} border-b-2 px-5 py-6`}>
        <div className="text-center">
          {/* Big Emoji Status */}
          <div className="text-7xl mb-3">
            {level === "good" && "😊"}
            {level === "okay" && "😐"}
            {level === "careful" && "😟"}
            {level === "bad" && "😷"}
            {level === "verybad" && "😨"}
            {level === "danger" && "☠️"}
          </div>
          
          {/* Simple Status Text */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {level === "good" && "हवा बहुत अच्छी है"}
            {level === "okay" && "हवा ठीक है"}
            {level === "careful" && "हवा खराब है"}
            {level === "bad" && "हवा बहुत खराब है"}
            {level === "verybad" && "हवा बेहद खराब है"}
            {level === "danger" && "बहुत खतरनाक"}
          </h2>
          
          <p className="text-sm text-gray-600">
            {level === "good" && "Air is Very Good"}
            {level === "okay" && "Air is Okay"}
            {level === "careful" && "Air is Bad"}
            {level === "bad" && "Air is Very Bad"}
            {level === "verybad" && "Air is Extremely Bad"}
            {level === "danger" && "Very Dangerous"}
          </p>

          {/* AQI Number Badge */}
          <div className={`inline-block ${colors.badge} text-white text-3xl font-bold px-6 py-3 rounded-xl mt-4`}>
            {aqi}
          </div>
        </div>
      </div>

      {/* Sensitive Group Warning */}
      {isSensitive && (level === "careful" || level === "bad" || level === "verybad" || level === "danger") && (
        <div className="mx-5 mt-5 bg-red-100 border-2 border-red-300 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">⚠️</div>
            <div>
              <p className="text-lg font-bold text-red-800">विशेष सावधानी</p>
              <p className="text-sm text-red-700">बच्चे, बुजुर्ग और बीमार लोग बहुत सावधान रहें</p>
              <p className="text-xs text-red-600">Special care for children, elderly & sick people</p>
            </div>
          </div>
        </div>
      )}

      {/* Large Action Cards */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
          क्या करें / What To Do
        </h3>
        
        <div className="space-y-3">
          {actions.map((action, index) => (
            <div 
              key={index}
              className={`${
                action.critical 
                  ? 'bg-red-50 border-2 border-red-300' 
                  : 'bg-gray-50 border-2 border-gray-200'
              } rounded-xl p-4 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center gap-4">
                {/* Large Emoji Icon */}
                <div className="flex-shrink-0 text-5xl">
                  {action.emoji}
                </div>
                
                {/* Text Content */}
                <div className="flex-1">
                  <p className="text-lg font-bold text-gray-900 mb-1">
                    {action.title}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    {action.subtitle}
                  </p>
                  <p className="text-sm text-gray-700">
                    {action.desc}
                  </p>
                </div>

                {/* Check or Alert Icon */}
                {action.critical ? (
                  <div className="flex-shrink-0 text-3xl">❗</div>
                ) : (
                  <div className="flex-shrink-0 text-3xl">✓</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Guide - What NOT to do */}
      {(level === "careful" || level === "bad" || level === "verybad" || level === "danger") && (
        <div className="px-5 pb-5">
          <div className="bg-gray-100 rounded-xl p-4 border-2 border-gray-300">
            <h4 className="text-lg font-bold text-gray-900 mb-3 text-center">
              मत करें / Don't Do
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 text-center border-2 border-red-200">
                <div className="text-4xl mb-2">🚫🏃</div>
                <p className="text-sm font-semibold text-gray-800">भागना मत</p>
                <p className="text-xs text-gray-600">No Running</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 text-center border-2 border-red-200">
                <div className="text-4xl mb-2">🚫🪟</div>
                <p className="text-sm font-semibold text-gray-800">खिड़की खोलना मत</p>
                <p className="text-xs text-gray-600">Don't Open Windows</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 text-center border-2 border-red-200">
                <div className="text-4xl mb-2">🚫🚬</div>
                <p className="text-sm font-semibold text-gray-800">धूम्रपान मत करें</p>
                <p className="text-xs text-gray-600">No Smoking</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 text-center border-2 border-red-200">
                <div className="text-4xl mb-2">🚫🔥</div>
                <p className="text-sm font-semibold text-gray-800">जलाना मत</p>
                <p className="text-xs text-gray-600">No Burning</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contact Button */}
      {(level === "bad" || level === "verybad" || level === "danger") && (
        <div className="px-5 pb-5">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-3 text-lg">
            <span className="text-2xl">🏥</span>
            <span>मदद के लिए कॉल करें / Call for Help</span>
          </button>
        </div>
      )}

      {/* Simple Footer */}
      <div className="px-5 pb-5">
        <div className="bg-blue-50 rounded-xl p-3 border-2 border-blue-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <p className="text-sm text-gray-700">
              <strong>सलाह:</strong> अपने और परिवार के स्वास्थ्य का ध्यान रखें
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthSuggestionsCard;
