// Pill-style tab buttons for switching between widget demos
const TABS = [
  { id: "progressring", label: "Progress Ring" },
  { id: "countdown", label: "Countdown" },
  { id: "gauge", label: "Gauge" },
  { id: "distribution", label: "Distribution" },
  { id: "goalrings", label: "Goal Rings" },
];

export default function TabBar({ activeTab, setActiveTab }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            px-4 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer
            ${
              activeTab === tab.id
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
