import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';

//#region src/lib/utils/datetime.ts
dayjs.extend(relativeTime);
function formatGameTime(isoString) {
	const targetDate = dayjs(isoString);
	const today = dayjs().startOf("day");
	const tomorrow = dayjs().add(1, "day").startOf("day");
	if (targetDate.isSame(today, "d")) return `Today at ${targetDate.format("h:mm A")}`;
	else if (targetDate.isSame(tomorrow, "d")) return `Tomorrow at ${targetDate.format("h:mm A")}`;
	else return targetDate.format("MMM D, YYYY [at] h:mm A");
}

export { formatGameTime as f };
//# sourceMappingURL=datetime-B0KKqfXg.js.map
