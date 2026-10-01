import { LiquidityL1Mark } from './LiquidityLogo';

export function Bird4({ className = '' }: { className?: string }) {
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', transform: 'translateY(-0.6px)', opacity: 1.00 }}
    >
      <LiquidityL1Mark className="h-full w-auto" />
    </span>
  );
}
