export function timeAgo(isoDate: string): string {
    const date = new Date(isoDate);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals: [number, string][] = [
        [60, "second"],
        [60, "minute"],
        [24, "hour"],
        [7, "day"],
        [4.34524, "week"],
        [12, "month"],
        [Number.POSITIVE_INFINITY, "year"],
    ];

    let unitIndex = 0;
    let count = seconds;

    for (let i = 0; i < intervals.length; i++) {
        if (count < intervals[i][0]) {
            break;
        }
        count = count / intervals[i][0];
        unitIndex = i + 1;
    }

    count = Math.floor(count);
    const unit = intervals[unitIndex - 1][1];
    return `${count} ${unit}${count !== 1 ? "s" : ""} ago`;
}

export const convertDateYYYYMMDDToMonDD = (dateString: string) => {
    const dateObj = new Date(dateString);
    return dateObj
        .toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
        })
        .replace(",", "");
};
