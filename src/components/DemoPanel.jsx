import { Panel, Widget } from "./Panel";
import { ProgressRing } from "./widgets/ProgressRing";
import { Countdown } from "./widgets/Countdown";
import { Gauge } from "./widgets/Gauge";
import { Distribution } from "./widgets/Distribution";
import { GoalRings } from "./widgets/GoalRings";

export function DemoPanel() {
  return (
    <Panel>
      <Widget title="Progress" subtitle="This week">
        <ProgressRing value={78} />
      </Widget>
      <Widget title="Countdown" subtitle="Product Launch">
        <Countdown launchDate="2026-10-28" />
      </Widget>
      <Widget title="Gauge" subtitle="This week">
        <Gauge value={42} actualLabel="Actual: $17,640" target="$42,000" />
      </Widget>
      <Widget title="Distribution" subtitle="This week">
        <Distribution segments={[{ label: "HTML", pct: 26 }, { label: "CSS", pct: 34 }, { label: "JavaScript", pct: 40 }]} />
      </Widget>
      <Widget size="full" title="Goal Rings" subtitle="This week">
        <GoalRings overall={78} items={[{ label: "Website", amount: "$12,579", change: 12, pct: 78 }, { label: "Marketplace", amount: "$4,579", change: -12, pct: 42 }, { label: "Affiliates", amount: "$12,579", change: 0, pct: 55 }]} />
      </Widget>
    </Panel>
  );
}
