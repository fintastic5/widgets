import { Panel, Widget, Countdown } from "../index";

export default { title: "Widgets/Countdown", component: Countdown, tags: ["autodocs"] };

export const Default = {
  render: () => <Panel><Widget title="Countdown" subtitle="Product launch"><Countdown launchDate="2026-10-28" /></Widget></Panel>,
};
