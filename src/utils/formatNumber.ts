export function formatNumber(
    value: number | undefined,
): string {
    return new Intl.NumberFormat('en-US').format(value || 0)
}