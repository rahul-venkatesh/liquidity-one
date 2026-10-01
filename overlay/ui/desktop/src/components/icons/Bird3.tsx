import { LiquidityL1Mark } from './LiquidityLogo';

export function Bird3({ className = '' }: { className?: string }) {
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', transform: 'translateY(-1.0px)', opacity: 0.90 }}
    >
      <LiquidityL1Mark className="h-full w-auto" />
    </span>
  );
}
