import type { PropsWithChildren } from 'react'

import { MainLayout } from '@/components/layouts/main-layout/MainLayout'

export default function layout({ children }: PropsWithChildren<unknown>) {
	return <MainLayout>{children}</MainLayout>
}
