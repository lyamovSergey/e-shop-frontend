export const APP_URL = process.env.APP_URL as string

export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,
	home: () => PUBLIC_URL.root(`/`),
	auth: () => PUBLIC_URL.root(`/auth`),
	explorer: (query = '') => PUBLIC_URL.root(`/explorer${query}`),
	product: (id = '') => PUBLIC_URL.root(`/product/${id}`),
	category: (id = '') => PUBLIC_URL.root(`/category/${id}`)
}
export const DASHBOARD_URL = {
	root: (url = '') => `/dashboard${url ? url : ''}`,
	home: () => DASHBOARD_URL.root(`/`),
	favorites: () => DASHBOARD_URL.root(`/favorites`)
}
export const SALER_URL = {
	root: (url = '') => `/saler${url ? url : ''}`,
	home: (storeId = '') => SALER_URL.root(`/${storeId}`),
	createStore: () => SALER_URL.root(`/create`),

	products: (storeId = '') => SALER_URL.root(`/${storeId}/products`),
	productCreate: (storeId = '') =>
		SALER_URL.root(`/${storeId}/products/create`),
	productEdit: (storeId = '', id = '') =>
		SALER_URL.root(`/${storeId}/products/${id}`),

	categories: (storeId = '') => SALER_URL.root(`/${storeId}/categories`),
	categoryCreate: (storeId = '') =>
		SALER_URL.root(`/${storeId}/categories/create`),
	categoryEdit: (storeId = '', id = '') =>
		SALER_URL.root(`/${storeId}/categories/${id}`),

	reviews: (storeId = '') => SALER_URL.root(`/${storeId}/reviews`),

	settings: (storeId = '') => SALER_URL.root(`/${storeId}/settings`)
}
export const ADMIN_URL = {
	root: (url = '') => `/admin${url ? url : ''}`,
	home: () => ADMIN_URL.root(`/stores`),
	categories: () => ADMIN_URL.root(`/categories`),
	subCategories: (categoryId = '') =>
		ADMIN_URL.root(`/categories/${categoryId}`)
}

export const TEST_URL = {
	root: (url = '') => `/${url ? url : ''}`,
	home: () => TEST_URL.root(`test`),
	subPage: (id = '') => TEST_URL.root(`test/${id}`)
}
