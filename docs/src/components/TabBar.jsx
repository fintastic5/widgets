import { Button } from "flowbite-react";

const TABS = [
  { id: "progressring", label: "Progress Ring" },
  { id: "countdown", label: "Countdown" },
  { id: "gauge", label: "Gauge" },
  { id: "distribution", label: "Distribution" },
  { id: "goalrings", label: "Goal Rings" },
];

export default function TabBar({ activeTab, setActiveTab }) {
  return (
    <div 
      className="flex justify-start flex-wrap gap-2 pb-10"
      role="group"
      aria-label="Widget demonstrations"
    >
        {TABS.map((tab) => (
          <Button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            aria-pressed={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
            px-4 py-1.5 font-medium border transition-colors cursor-pointer tabBtn
            ${
              activeTab === tab.id
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }
          `}
          >
            {tab.label}
          </Button>
        ))}

    </div>
    
  );
}
