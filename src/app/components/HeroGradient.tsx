interface HeroGradientProps {
  title?: string;
  subtitle?: string;
}

export default function HeroGradient({ 
  title = "Empowering Patients & Improving Outcomes",
  subtitle = "Find the right advocate for your needs"
}: HeroGradientProps) {
  return (
    <header className="hero-gradient">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 text-center text-white">
        <h1 className="display-font text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
          {title}
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="block h-[40px] sm:h-[60px] w-full"
        aria-hidden="true"
      >
        <path d="M0,0 C240,60 1200,0 1440,60 L1440,60 L0,60 Z" fill="#F7FAF9" />
      </svg>
    </header>
  );
}
