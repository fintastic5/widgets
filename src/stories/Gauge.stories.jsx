import { Panel, Widget, Gauge } from "../index";

export default { title: "Widgets/Gauge", component: Gauge, tags: ["autodocs"] };

export const Default = {
  render: () => <Panel><Widget title="Gauge" subtitle="This week"><Gauge value={42} actualLabel="Actual: $17,640" target="$42,000" /></Widget></Panel>,
};

export const FullValue = {
  render: () => <Panel><Widget title="Gauge" subtitle="Target met"><Gauge value={100} actualLabel="Actual: $42,000" target="$42,000" /></Widget></Panel>,
};
