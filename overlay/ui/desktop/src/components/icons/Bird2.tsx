import { LiquidityL1Mark } from './LiquidityLogo';

export function Bird2({ className = '' }: { className?: string }) {
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', transform: 'translateY(-0.6px)', opacity: 0.65 }}
    >
      <LiquidityL1Mark className="h-full w-auto" />
    </span>
  );
}
