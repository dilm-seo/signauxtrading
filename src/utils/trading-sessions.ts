interface TradingSession {
  name: string;
  hours: string;
  isOpen: boolean;
  startHour: number;
  endHour: number;
}

export function getTradingSessions(currentTime: Date): TradingSession[] {
  const hour = currentTime.getUTCHours();

  const sessions: TradingSession[] = [
    {
      name: 'Sydney',
      hours: '22:00-07:00',
      startHour: 22,
      endHour: 7,
      isOpen: false
    },
    {
      name: 'Tokyo',
      hours: '00:00-09:00',
      startHour: 0,
      endHour: 9,
      isOpen: false
    },
    {
      name: 'Londres',
      hours: '08:00-17:00',
      startHour: 8,
      endHour: 17,
      isOpen: false
    },
    {
      name: 'New York',
      hours: '13:00-22:00',
      startHour: 13,
      endHour: 22,
      isOpen: false
    }
  ];

  return sessions.map(session => ({
    ...session,
    isOpen: isSessionOpen(hour, session.startHour, session.endHour)
  }));
}

function isSessionOpen(currentHour: number, startHour: number, endHour: number): boolean {
  if (startHour < endHour) {
    return currentHour >= startHour && currentHour < endHour;
  } else {
    // Session crosses midnight
    return currentHour >= startHour || currentHour < endHour;
  }
}