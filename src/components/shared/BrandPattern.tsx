export default function BrandPattern() {
  return (
    <>
      {/* Concentric circles — top right */}
      <svg
        className="absolute top-0 right-0 w-[480px] h-[480px] opacity-10 pointer-events-none"
        viewBox="0 0 480 480"
        fill="none"
      >
        <circle cx="380" cy="100" r="220" stroke="#3A7D5A" strokeWidth="1.5" />
        <circle cx="380" cy="100" r="160" stroke="#3A7D5A" strokeWidth="1" />
        <circle cx="380" cy="100" r="90"  stroke="#6DBE8C" strokeWidth="1" />
      </svg>

      {/* Dot grid — bottom left */}
      <svg
        className="absolute bottom-0 left-0 w-56 h-56 opacity-10 pointer-events-none"
        viewBox="0 0 200 200"
        fill="#6DBE8C"
      >
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={col * 34 + 10} cy={row * 34 + 10} r="2" />
          ))
        )}
      </svg>

      {/* Arc — bottom right */}
      <svg
        className="absolute bottom-0 right-0 w-72 h-72 opacity-[0.07] pointer-events-none"
        viewBox="0 0 300 300"
        fill="none"
      >
        <path d="M300 300 Q 100 300 100 100" stroke="#3A7D5A" strokeWidth="60" strokeLinecap="round" />
      </svg>

      {/* Horizontal rule accent */}
      <div className="absolute top-1/2 left-0 w-24 h-px bg-[#3A7D5A]/30" />
    </>
  );
}
