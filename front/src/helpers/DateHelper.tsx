export function formatDate(date: string, includeYear: boolean = true, includeWeekday: boolean = false): string {
    const [year, month, day] = date.split('-');
    let formattedDate = `${day}/${month}`;

    if (includeYear) formattedDate += `/${year}`;

    if (includeWeekday) {
        const weekdays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
        const weekdayIndex = new Date(date).getDay();
        const weekday = weekdays[weekdayIndex];
        return `${weekday}, ${formattedDate}`;
    }

    return formattedDate;
}