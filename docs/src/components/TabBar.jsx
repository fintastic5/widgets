import { Button } from "flowbite-react";

import {
  CircleGauge,
  Timer,
  Gauge,
  ChartPie,
  Target,
} from "lucide-react";

const TABS = [
  { id: "progressring", label: "Progress Ring", icon: CircleGauge },
  { id: "countdown", label: "Countdown", icon: Timer },
  { id: "gauge", label: "Gauge", icon: Gauge },
  { id: "distribution", label: "Distribution", icon: ChartPie },
  { id: "goalrings", label: "Goal Rings", icon: Target },
];

export default function TabBar({ activeTab, setActiveTab }) {
  return (
    <div 
      className="flex justify-start flex-wrap gap-2 pb-10"
      role="group"
      aria-label="Widget demonstrations"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;

        return (
          <Button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            aria-pressed={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tabBtn ${activeTab === tab.id ? "active" : ""}`}
          >
            <Icon size={16} strokeWidth={2} />
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
}
