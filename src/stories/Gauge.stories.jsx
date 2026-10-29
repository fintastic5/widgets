import { Panel, Widget } from "../components/Panel";
import { Gauge } from "../components/widgets/Gauge";

export default { 
  title: "Widgets/Gauge", 
  component: Gauge, 
  tags: ["autodocs"],
};

export const Default = {
  render: () => 
    <Panel>
      <Widget title="Gauge" subtitle="This week">
        <Gauge 
          value={42} 
          actualLabel="$17,640" 
          target="$42,000" 
        />
      </Widget>
    </Panel>,
};

export const FullValue = {
  render: () => 
    <Panel>
      <Widget title="Gauge" subtitle="This week">
        <Gauge 
          value={100} 
          actualLabel="$17,640" 
          target="$42,000" 
        />
      </Widget>
    </Panel>,
};

export const CustomColor = {
  render: () => 
    <Panel>
      <Widget title="Gauge" subtitle="This week">
        <Gauge 
          value={42} 
          actualLabel=" $17,640" 
          target="$42,000" 
          color="orange"
        />
      </Widget>
    </Panel>,
};