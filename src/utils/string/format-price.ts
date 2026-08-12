export function formatPrice(
	price: number,
	code: string = 'en-EN',
	currency: string = 'USD'
) {
	return price.toLocaleString(code, {
		style: 'currency',
		currency: currency,
		minimumFractionDigits: 0
	})
}
