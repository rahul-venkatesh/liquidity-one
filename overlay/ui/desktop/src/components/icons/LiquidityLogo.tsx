/**
 * Official Liquidity brand marks, taken from the wordmark published on
 * liquidity.com. `LiquidityMark` is the "L" glyph — the first subpath of the
 * wordmark, so the mark and the wordmark stay geometrically identical.
 *
 * Both use fill="currentColor" so they inherit the surrounding text color and
 * work on every theme without a second asset.
 */

const MARK_PATH =
  'M12.6471 15.0837V16.6536H0V0.412316H3.1331V12.3717C3.1331 13.2007 2.46062 13.8732 1.63159 13.8732H0.881942V15.0837H12.6471Z';

const WORDMARK_PATH =
  'M12.6471 15.0837V16.6536H0V0.412316H3.1331V12.3717C3.1331 13.2007 2.46062 13.8732 1.63159 13.8732H0.881942V15.0837H12.6471ZM15.6214 16.6558H18.7479V0.412316H15.6214V16.6558ZM57.3108 0.405701H54.1865V9.69714C54.1865 12.6517 54.0102 15.4806 49.8783 15.4806C45.7463 15.4806 45.57 12.6539 45.57 9.69714V0.405701H42.4457V10.1337C42.4104 14.9183 45.3671 17.0262 49.8165 17.0262H49.9378C54.3894 17.0262 57.3461 14.9183 57.3086 10.1337V0.405701H57.3108ZM83.7426 8.50429C83.7426 14.4575 79.8114 16.6536 75.7103 16.6536H68.1719V0.405701H74.9254C80.1465 0.405701 83.7426 2.87739 83.7426 8.50429ZM80.5324 8.34774C80.5324 4.30837 78.2658 1.96677 74.9254 1.96677H72.8065C71.9775 1.96677 71.3072 2.63926 71.3072 3.4661V9.98157C71.3072 10.0984 71.3072 10.2109 71.305 10.3255V12.3761C71.305 13.2029 70.6348 13.8732 69.8079 13.8732H69.0539V15.0837H70.196C70.196 15.0837 70.2026 15.0837 70.2048 15.0837H74.9872C76.2086 15.0837 76.6783 14.9316 76.7598 14.9051C79.1301 14.1687 80.5302 12.1556 80.5302 8.34774H80.5324ZM61.1781 16.6558H64.3046V0.405701H61.1781V16.6558ZM92.82 2.00425H98.7048V16.6558H101.831V2.00425H107.718V0.405701H92.82V2.00425ZM121.571 0.405701L117.565 6.07229L113.535 0.405701H110.082L115.217 7.62674C115.592 8.15371 115.592 8.85928 115.219 9.38625L110.08 16.6536H113.508L125 0.405701H121.571ZM86.717 16.6558H89.8435V0.405701H86.717V16.6558ZM36.1707 8.41168C36.1707 4.22238 34.4839 1.55445 30.6519 1.55445C26.8199 1.55445 25.1354 4.48256 25.1354 8.41168C25.1354 12.5525 26.8221 15.4806 30.6519 15.4806C34.4817 15.4806 36.1707 12.5547 36.1707 8.41168ZM29.34 17.11C29.34 17.11 29.34 17.11 29.1129 17.11V18.3205H31.5515C32.2923 18.3249 33.0111 18.5829 33.5866 19.0547C34.3759 19.7382 37.0769 21.8814 37.0769 21.8814H32.4974C32.4974 21.8814 28.4934 18.7879 25.4044 16.1332C24.1321 15.0396 23.3141 13.9416 22.8313 13.0772C22.8048 13.0287 22.7784 12.9802 22.7519 12.9317C22.7078 12.8501 22.6659 12.7686 22.6284 12.6936C22.6152 12.6649 22.5998 12.6363 22.5865 12.6076C22.2779 11.9682 22.1742 11.5559 22.1742 11.5559H22.1786C21.8876 10.6364 21.7289 9.59571 21.7289 8.42932C21.7244 2.5665 25.6976 0 30.5968 0C35.496 0 39.4713 2.5665 39.4713 8.43153V8.68068C39.4713 14.5435 35.4982 17.1122 30.5968 17.1122H29.34V17.11Z';

export function LiquidityMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12.65 17.07"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d={MARK_PATH} fill="currentColor" />
    </svg>
  );
}

export function LiquidityWordmark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 125 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Liquidity"
    >
      <path d={WORDMARK_PATH} fill="currentColor" />
    </svg>
  );
}

/**
 * The full product lockup: the LIQUIDITY wordmark followed by ONE in the brand
 * accent, as it appears in the product design.
 *
 * ONE is drawn as geometry rather than set in a font: the lockup is a brand
 * asset, and a font-based ONE would reshape itself on any platform without the
 * chosen face. The letterforms derive from the wordmark's own metrics — cap
 * height 16.24 with the baseline at y=16.65, and a 3.13 stem — so the two words
 * sit on one baseline at matching weight.
 *
 * ONE fills with --color-text-warning rather than a literal yellow so it stays
 * legible on the light theme, where #ffde43 washes out.
 */
export function LiquidityOneLockup({ className = '' }: { className?: string }) {
  const capTop = 0.41;
  const capH = 16.24;
  const stem = 3.13;
  return (
    <svg
      viewBox="0 0 182 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Liquidity One"
    >
      <path d={WORDMARK_PATH} fill="currentColor" />
      <g fill="var(--color-text-warning)">
        <path
          fillRule="evenodd"
          d="M136 8.53A8.12 8.12 0 1 1 152.24 8.53A8.12 8.12 0 1 1 136 8.53ZM139.13 8.53A4.99 4.99 0 1 0 149.11 8.53A4.99 4.99 0 1 0 139.13 8.53Z"
        />
        <rect x="154.74" y={capTop} width={stem} height={capH} />
        <rect x="164.61" y={capTop} width={stem} height={capH} />
        <path d="M154.74 0.41H157.87L167.74 16.65H164.61Z" />
        <rect x="170.24" y={capTop} width={stem} height={capH} />
        <rect x="170.24" y={capTop} width="11" height={stem} />
        <rect x="170.24" y="6.97" width="9.5" height={stem} />
        <rect x="170.24" y="13.52" width="11" height={stem} />
      </g>
    </svg>
  );
}

/**
 * Compact L1 mark: the wordmark's own L beside the 1 from the ONE letterform,
 * so it reads as a short form of the LIQUIDITY ONE lockup rather than a
 * separate logo. Colour split matches the lockup — L inherits the surrounding
 * text colour, 1 takes the accent.
 */
export function LiquidityL1Mark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 22.73 17.07"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="L1"
    >
      <path d={MARK_PATH} fill="currentColor" />
      <g fill="var(--color-text-warning)">
        <rect x="19.6" y="0.41" width="3.13" height="16.24" />
        <path d="M19.6 0.41L19.6 4.81L15.4 9.01L15.4 4.61Z" />
      </g>
    </svg>
  );
}
