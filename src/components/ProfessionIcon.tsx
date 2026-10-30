import React from 'react';
import {
  Code2,
  LineChart,
  Bot,
  Sun,
  Microscope,
  Stethoscope,
  Pill,
  Sparkles,
  ShieldAlert,
  Scale,
  ReceiptText,
  Globe2,
  TrendingUp,
  Music,
  UtensilsCrossed,
  PenTool,
  Layout,
  PlaneTakeoff,
  Wheat,
  Dumbbell,
  Leaf,
  Cpu,
  HeartPulse,
  Briefcase,
  Palette,
  Compass,
  LucideProps,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Code2,
  LineChart,
  Bot,
  Sun,
  Microscope,
  Stethoscope,
  Pill,
  Sparkles,
  ShieldAlert,
  Scale,
  ReceiptText,
  Globe2,
  TrendingUp,
  Music,
  UtensilsCrossed,
  PenTool,
  Layout,
  PlaneTakeoff,
  Wheat,
  Dumbbell,
  Leaf,
  Cpu,
  HeartPulse,
  Briefcase,
  Palette,
  Compass,
};

interface ProfessionIconProps extends LucideProps {
  name: string;
}

export const ProfessionIcon: React.FC<ProfessionIconProps> = ({ name, ...props }) => {
  const IconComponent = iconMap[name] || Cpu;
  return <IconComponent {...props} />;
};
