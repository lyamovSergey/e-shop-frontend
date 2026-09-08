import dayjs from 'dayjs'

export function formatDate(date: string, format: string = 'DD.MM.YYYY') {
	return dayjs(date).format(format)
}
