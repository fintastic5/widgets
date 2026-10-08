import { Panel, Widget, ProgressRing } from "../index";

export default { title: "Widgets/Progress", component: ProgressRing, tags: ["autodocs"] };

export const Default = {
  render: () => <Panel><Widget title="Progress" subtitle="This week"><ProgressRing value={78} /></Widget></Panel>,
};
