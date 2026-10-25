import { Panel, Widget, GoalRings } from "../index";

export default { title: "Widgets/GoalRings", component: GoalRings, tags: ["autodocs"] };

export const Default = {
  render: () => (
    <Panel><Widget size="full" title="Goal Rings" subtitle="This week">
      <GoalRings overall={78} items={[{ label: "Website", amount: "$12,579", change: 12, pct: 78 }, { label: "Marketplace", amount: "$4,579", change: -12, pct: 42 }, { label: "Affiliates", amount: "$12,579", change: 0, pct: 55 }]} />
    </Widget></Panel>
  ),
};
