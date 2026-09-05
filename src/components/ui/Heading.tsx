import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'

interface HeadingProps {
	title: string
	description?: string
	className?: string
	hasBack?: boolean
}
export function Heading({
	title,
	description,
	className,
	hasBack = false
}: HeadingProps) {
	const router = useRouter()
	return (
		<>
			{hasBack ? (
				<div
					className='space-y-1 hover:cursor-pointer group'
					onClick={() => router.back()}
				>
					<h2
						className={cn(
							'text-2xl font-medium flex items-center gap-2 group-hover:text-blue-500 transition-all',
							className
						)}
					>
						<ArrowLeft className=' group-hover:-translate-x-1 transition-all' />
						{title}
					</h2>
					{description && (
						<p className='text-sm text-muted-foreground'>{description}</p>
					)}
				</div>
			) : (
				<div className='space-y-1'>
					<h2 className={cn('text-2xl font-medium', className)}>{title}</h2>
					{description && (
						<p className='text-sm text-muted-foreground'>{description}</p>
					)}
				</div>
			)}
		</>
	)
}
