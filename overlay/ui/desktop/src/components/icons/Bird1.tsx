import { LiquidityL1Mark } from './LiquidityLogo';

export function Bird1({ className = '' }: { className?: string }) {
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', transform: 'translateY(0.0px)', opacity: 0.40 }}
    >
      <LiquidityL1Mark className="h-full w-auto" />
    </span>
  );
}
