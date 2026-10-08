import { DemoPanel } from "../components/DemoPanel";

export default {
  title: "Demo/Full Panel",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "All five widgets in the panel grid. Drag a widget to reorder it." } } },
};

export const AllWidgets = { render: () => <DemoPanel /> };
