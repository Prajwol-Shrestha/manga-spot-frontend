import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export function getAgo(date: string) {
    const dateObj = new Date(date);
    if (typeof dateObj === 'object') {
        const formatted = dateObj.toISOString();
        const ago = dayjs(formatted).fromNow();
        return ago
    }
    return ''
}

export function getLongDate(date: string) {
    const dateObj = new Date(date);
    if (typeof dateObj === 'object') {
        const formatted = dateObj.toISOString();
        const longDate = dayjs(formatted).format('MMMM D, YYYY');
        return longDate
    }
    return ''
}