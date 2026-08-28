import { Example } from "./Example";

const meta = {
  title: "Widgets/Example",
  component: Example,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    trendDirection: {
      control: "select",
      options: ["positive", "negative", "neutral"],
    },
  },
};

export default meta;

export const Default = {
  args: {
    title: "Monthly revenue",
    value: "$24,500",
    description: "Compared with the previous month",
    trend: "+12.5%",
    trendDirection: "positive",
  },
};

export const NegativeTrend = {
  args: {
    title: "Support tickets",
    value: "184",
    description: "Compared with the previous month",
    trend: "-8.2%",
    trendDirection: "negative",
  },
};

export const NeutralTrend = {
  args: {
    title: "Active users",
    value: "8,420",
    description: "No change from the previous period",
    trend: "0.0%",
    trendDirection: "neutral",
  },
};
