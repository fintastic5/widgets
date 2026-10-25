import { Panel, Widget, Distribution } from "../index";

export default { title: "Widgets/Distribution", component: Distribution, tags: ["autodocs"] };

export const Default = {
  render: () => (
    <Panel><Widget title="Distribution" subtitle="This week">
      <Distribution segments={[{ label: "HTML", pct: 26 }, { label: "CSS", pct: 34 }, { label: "JavaScript", pct: 40 }]} />
    </Widget></Panel>
  ),
};
