import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// Format ISO string to calendar display (e.g. "Tomorrow at 4:30 PM")
export function formatGameTime(isoString: string | Date): string {
  const targetDate = dayjs(isoString);
  const today = dayjs().startOf('day');
  const tomorrow = dayjs().add(1, 'day').startOf('day');

  if (targetDate.isSame(today, 'd')) {
    return `Today at ${targetDate.format('h:mm A')}`;
  } else if (targetDate.isSame(tomorrow, 'd')) {
    return `Tomorrow at ${targetDate.format('h:mm A')}`;
  } else {
    return targetDate.format('MMM D, YYYY [at] h:mm A');
  }
}

// Checks if the event is currently active based on system clock
export function isEventLive(commenceTime: string | Date): boolean {
  return dayjs().isAfter(dayjs(commenceTime));
}