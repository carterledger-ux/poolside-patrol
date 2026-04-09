/*
  DESIGN: Sun-Drenched Organic
  Organic wavy SVG dividers between sections. Smooth bezier curves.
*/

interface WaveDividerProps {
  fill?: string;
  flip?: boolean;
  className?: string;
}

export default function WaveDivider({ fill = "currentColor", flip = false, className = "" }: WaveDividerProps) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px]"
        fill={fill}
      >
        <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" />
      </svg>
    </div>
  );
}

export function WaveDividerAlt({ fill = "currentColor", flip = false, className = "" }: WaveDividerProps) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-[50px] sm:h-[70px] md:h-[85px] lg:h-[100px]"
        fill={fill}
      >
        <path d="M0,40 C360,100 720,0 1080,50 C1260,75 1380,30 1440,40 L1440,100 L0,100 Z" />
      </svg>
    </div>
  );
}
