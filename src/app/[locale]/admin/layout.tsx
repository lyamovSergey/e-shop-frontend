import type { PropsWithChildren } from 'react'

import { AdminLayout } from '@/components/layouts/admin-layout/AdminLayout'

export default function layout({ children }: PropsWithChildren<unknown>) {
	return <AdminLayout>{children}</AdminLayout>
}
