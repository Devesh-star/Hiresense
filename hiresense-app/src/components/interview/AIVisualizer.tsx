export function AIVisualizer() {
  const bars = [
    { opacity: 80, height: "h-4", delay: "0.1s" },
    { opacity: 100, height: "h-8", delay: "0.2s" },
    { opacity: 90, height: "h-12", delay: "0.3s" },
    { opacity: 70, height: "h-6", delay: "0.4s" },
    { opacity: 50, height: "h-10", delay: "0.5s" },
    { opacity: 100, height: "h-8", delay: "0.2s" },
    { opacity: 90, height: "h-12", delay: "0.3s" },
    { opacity: 70, height: "h-6", delay: "0.4s" },
  ];

  return (
    <div className="flex justify-center mb-16">
      <div className="relative w-64 h-32 flex items-center justify-center">
        <div className="flex items-center gap-1.5 h-12">
          {bars.map((bar, i) => (
            <div
              key={i}
              className={`w-1.5 rounded-full ${bar.height} audio-bar`}
              style={{
                animationDelay: bar.delay,
                backgroundColor: `rgba(105, 246, 184, ${bar.opacity / 100})`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-secondary/5 blur-[80px] rounded-full" />
      </div>
    </div>
  );
}
