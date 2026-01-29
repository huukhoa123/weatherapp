import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
    return (
        <div
            className={twMerge(
                "glass rounded-3xl p-6 shadow-lg text-white transition-all duration-300",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
