import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
	return (
		<textarea
			data-slot='textarea'
			className={cn(
				'neo-push flex field-sizing-content min-h-16 w-full rounded-lg px-2.5 py-2 text-base  outline-none placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:shadow-[1px_1px_1px_0_rgba(174,174,192,0)_-1px_-1px_1px_0_rgba(255,255,255,0)] disabled:bg-nue-white-1 transition-all duration-500 aria-invalid:border-destructive  md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 ',
				className
			)}
			{...props}
		/>
	)
}

export { Textarea }
