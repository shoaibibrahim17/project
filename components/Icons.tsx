import React from 'react';
import { Cloud, MessageSquare } from 'lucide-react-native';

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

const WeatherIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <Cloud size={size} color={color} strokeWidth={strokeWidth} />
);

const FeedbackIcon = ({ size = 24, color = 'currentColor', strokeWidth = 2 }: IconProps) => (
  <MessageSquare size={size} color={color} strokeWidth={strokeWidth} />
);

const Icons = {
  Weather: WeatherIcon,
  Feedback: FeedbackIcon,
};

export default Icons;