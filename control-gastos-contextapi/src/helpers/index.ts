export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
    }).format(amount)
}

export function formatDate(date: string): string {
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}
