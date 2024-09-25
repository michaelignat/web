import type { SVGProps } from "react";

export const LinePattern = (props: SVGProps<SVGSVGElement>) => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <pattern
        id="linePattern"
        patternUnits="userSpaceOnUse"
        width="80"
        height="80"
        patternTransform="scale(1) rotate(0)"
      >
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="hsla(0, 0%, 0%, 0)"
        />
        <path
          d="M50 50H30v10H20m30-10v10h10V50h10V30H60V20H50v10H30V20H20v10H10v20h10v10m60 20H50V70h10V60h10v10h10M20 60v10h10v10M0 70h10V60h10M50 0v10h10v10h10V10h10M0 10h10v10h10V10h10V0M0 40V0h40m40 40H0v40h40V0h40v80H40"
          strokeLinecap="square"
          strokeWidth="1"
          stroke="currentColor"
          fill="none"
        />
      </pattern>
    </defs>
    <rect
      width="800%"
      height="800%"
      transform="translate(0,0)"
      fill="url(#linePattern)"
    />
  </svg>
);
