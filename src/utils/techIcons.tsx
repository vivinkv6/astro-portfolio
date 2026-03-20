import type { FC, SVGProps } from "react";

const NextjsIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="90" cy="90" r="90" fill="currentColor" />
    <path d="M149.508 157.52L69.142 54H54v125.492h10.615V69.37l75.892 97.52h9.001z" fill="url(#paint0_linear)" />
    <rect x="115" y="54" width="10" height="126" fill="url(#paint1_linear)" />
    <defs>
      <linearGradient id="paint0_linear" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint1_linear" x1="120" y1="54" x2="120" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const ReactIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(-45 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(90 12 12)" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const NodejsIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 0L2.4 5.4v10.8l9.6 5.4 9.6-5.4V5.4L12 0zm0 19.2l-7.2-4V7.2l7.2-4 7.2 4v8l-7.2 4z" fill="currentColor" />
    <path d="M12 6L7.2 8.7v5.4L12 16.8l4.8-2.7V8.7L12 6zm0 9.6l-3.6-2V9.6L12 7.6l3.6 2v4l-3.6 2z" fill="currentColor" />
  </svg>
);

const TypescriptIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="24" height="24" rx="2" fill="currentColor" />
    <path d="M11.5 16.5v-4h-1v-1h3v1h-1v4h-1zM14.5 16.5v-4h1v4h-1z" fill="#fff" />
  </svg>
);

const JavaScriptIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="24" height="24" rx="2" fill="currentColor" />
    <path d="M11.5 13v3.5c0 .8.4 1.2 1.2 1.2.6 0 1-.3 1.2-.8l.9.4c-.3.9-1 1.4-2.1 1.4-1.5 0-2.2-.8-2.2-2.2V13h1zm4 0v3.5c0 .8.4 1.2 1.2 1.2.6 0 1-.3 1.2-.8l.9.4c-.3.9-1 1.4-2.1 1.4-1.5 0-2.2-.8-2.2-2.2V13h1z" fill="#fff" />
  </svg>
);

const TailwindCSS: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12.001 4.8c-2.4 0-3.6 1.2-4.8 2.4s-2.4 2.4-4.8 2.4S0 8.4 0 6C0 3.6 2.4 1.2 6 1.2s4.8 2.4 4.8 4.8c0-2.4 2.4-4.8 6-4.8s6 2.4 6 4.8-2.4 4.8-4.8 4.8-3.6-1.2-4.8-2.4-2.4-2.4-4.8-2.4z" fill="currentColor" />
    <path d="M12.001 19.2c-2.4 0-3.6-1.2-4.8-2.4s-2.4-2.4-4.8-2.4S0 15.6 0 18s2.4 4.8 6 4.8 4.8-2.4 4.8-4.8c0 2.4 2.4 4.8 6 4.8s6-2.4 6-4.8-2.4-4.8-4.8-4.8-3.6 1.2-4.8 2.4-2.4 2.4-4.8 2.4z" fill="currentColor" opacity="0.5" />
  </svg>
);

const ExpressjsIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M2 12L12 2l10 10-10 10L2 12z" stroke="currentColor" strokeWidth="2" />
    <path d="M7 12l5-5 5 5-5 5-5-5z" fill="currentColor" />
  </svg>
);

const NestjsIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const SocketIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="3" fill="currentColor" />
    <path d="M12 2v4m0 12v4M2 12h4m12 0h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
  </svg>
);

const DefaultIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const techIconMap: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  "Next.js": NextjsIcon,
  Nextjs: NextjsIcon,
  React: ReactIcon,
  "React.js": ReactIcon,
  "Node.js": NodejsIcon,
  Nodejs: NodejsIcon,
  TypeScript: TypescriptIcon,
  Typescript: TypescriptIcon,
  JavaScript: JavaScriptIcon,
  Javascript: JavaScriptIcon,
  "Tailwind CSS": TailwindCSS,
  Tailwind: TailwindCSS,
  Express: ExpressjsIcon,
  "Express.js": ExpressjsIcon,
  "Nest.js": NestjsIcon,
  Nestjs: NestjsIcon,
  "Socket.io": SocketIcon,
  Socket: SocketIcon
};

export const getTechIcon = (techName: string): FC<SVGProps<SVGSVGElement>> => techIconMap[techName] || DefaultIcon;
