import React from 'react';
import { Calendar } from 'lucide-react';
import { FloatingButton } from './FloatingButton';

interface CalendarButtonProps {
  onClick: () => void;
}

export function CalendarButton({ onClick }: CalendarButtonProps) {
  return (
    <FloatingButton
      icon={Calendar}
      label="Calendrier Économique"
      onClick={onClick}
      position="left"
      className="bg-orange-500/20 hover:bg-orange-500/30"
    />
  );
}