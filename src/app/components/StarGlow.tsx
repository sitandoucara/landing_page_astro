export default function StarGlow() {
  return (
    <svg
      className="animate-pulse star absolute w-6 h-6 drop-shadow-[0_0_12px_rgba(239,134,68,0.7)]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g style={{ mixBlendMode: "color-dodge" }}>
        <rect width="24" height="24" fill="none" />
        <ellipse
          cx="12.1818"
          cy="12"
          rx="1.72668"
          ry="12"
          fill="url(#paint0_radial)"
        />
        <ellipse
          cx="12"
          cy="12.1824"
          rx="1.72668"
          ry="12"
          transform="rotate(-90 12 12.1824)"
          fill="url(#paint1_radial)"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12.1818 12) rotate(90) scale(12 1.72668)"
        >
          <stop offset="0.145833" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint1_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 12.1824) rotate(90) scale(12 1.72668)"
        >
          <stop offset="0.145833" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
