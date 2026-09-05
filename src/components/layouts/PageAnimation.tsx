'use client'
import { type PropsWithChildren, ViewTransition } from 'react'

export function PageAnimation({ children }: PropsWithChildren<unknown>) {
	return (
		<ViewTransition enter='page-enter' exit='page-exit'>
			{children}
		</ViewTransition>
	)
}
