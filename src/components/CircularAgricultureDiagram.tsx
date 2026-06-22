import Image from "next/image";

const GREEN = "#2D6A35";

const nodes = [
  {
    key: "dairy",
    label: "DAIRY CATTLE",
    captionLines: ["Healthy cows produce", "milk and manure."],
    image: "/images/bg-img.png",
    alt: "Dairy cow in a green pasture",
    cx: 340,
    cy: 110,
  },
  {
    key: "fertilizer",
    label: "ORGANIC FERTILIZER",
    captionLines: ["Manure is processed into", "natural fertilizer to enrich the soil."],
    image: "/images/bg-2.png",
    alt: "Rich organic compost fertilizer",
    cx: 570,
    cy: 340,
  },
  {
    key: "crops",
    label: "CROP PRODUCTION",
    captionLines: ["Healthy soil grows", "nutritious crops."],
    image: "/images/bg-3.png",
    alt: "Rows of healthy crops growing in a field",
    cx: 340,
    cy: 570,
  },
  {
    key: "feed",
    label: "ANIMAL FEED",
    captionLines: ["Crops and crop residues", "are used as feed for the cattle."],
    image: "/images/bg-img.png",
    alt: "Cattle feeding on crop residue",
    cx: 110,
    cy: 340,
  },
];

const NODE_R = 95;
const CENTER = { x: 340, y: 340 };
const HUB_R = 92;
const BAND_H = 34;
const BAND_W = 190;

export default function CircularAgricultureDiagram() {
  return (
    <svg
      viewBox="0 0 680 680"
      className="mx-auto h-auto w-full max-w-xl"
      role="img"
      aria-label="Ingaju circular agriculture system"
    >
      <defs>
        <marker
          id="cycle-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path
            d="M1 1L9 5L1 9"
            fill="none"
            stroke={GREEN}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>

        {nodes.map((n) => (
          <clipPath id={`clip-${n.key}`} key={n.key}>
            <circle cx={n.cx} cy={n.cy} r={NODE_R} />
          </clipPath>
        ))}
      </defs>

      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={HUB_R}
        fill="#fff"
        stroke={GREEN}
        strokeWidth="1"
        strokeDasharray="2 7"
        opacity="0.9"
      />
      <text x={CENTER.x} y={CENTER.y - 22} textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="27" fill={GREEN}>
        Ingaju
      </text>
      <text x={CENTER.x} y={CENTER.y + 6} textAnchor="middle" fontWeight="700" fontSize="14" letterSpacing="0.4" fill={GREEN}>
        CIRCULAR
      </text>
      <text x={CENTER.x} y={CENTER.y + 24} textAnchor="middle" fontWeight="700" fontSize="14" letterSpacing="0.4" fill={GREEN}>
        AGRICULTURE
      </text>
      <text x={CENTER.x} y={CENTER.y + 42} textAnchor="middle" fontWeight="700" fontSize="14" letterSpacing="0.4" fill={GREEN}>
        SYSTEM
      </text>

      <path d="M 405 175 A 240 240 0 0 1 505 275" fill="none" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#cycle-arrow)" />
      <path d="M 505 405 A 240 240 0 0 1 405 505" fill="none" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#cycle-arrow)" />
      <path d="M 275 505 A 240 240 0 0 1 175 405" fill="none" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#cycle-arrow)" />
      <path d="M 175 275 A 240 240 0 0 1 275 175" fill="none" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#cycle-arrow)" />

      {nodes.map((n) => {
        const bandY = n.cy + NODE_R - BAND_H - 38;
        const bandX = n.cx - BAND_W / 2;
        return (
          <g key={n.key}>
            <circle cx={n.cx} cy={n.cy} r={NODE_R} fill="#d9d9d9" />

            <foreignObject
              x={n.cx - NODE_R}
              y={n.cy - NODE_R}
              width={NODE_R * 2}
              height={NODE_R * 2}
              clipPath={`url(#clip-${n.key})`}
            >
              <div style={{ width: "100%", height: "100%", position: "relative" }}>
                <Image
                  src={n.image}
                  alt={n.alt}
                  fill
                  sizes="200px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </foreignObject>

            <g clipPath={`url(#clip-${n.key})`}>
              <rect x={bandX} y={bandY} width={BAND_W} height={BAND_H} fill={GREEN} />
              <rect
                x={n.cx - NODE_R}
                y={bandY + BAND_H}
                width={NODE_R * 2}
                height={NODE_R * 2 - (bandY + BAND_H - (n.cy - NODE_R))}
                fill="#ffffff"
              />
            </g>

            <text
              x={n.cx}
              y={bandY + BAND_H / 2 + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="13"
              fontWeight="700"
              letterSpacing="0.3"
              fill="#ffffff"
            >
              {n.label}
            </text>

            {n.captionLines.map((line, i) => (
              <text key={i} x={n.cx} y={bandY + BAND_H + 16 + i * 14} textAnchor="middle" fontSize="10.5" fill="#333333">
                {line}
              </text>
            ))}

            <circle cx={n.cx} cy={n.cy} r={NODE_R} fill="none" stroke={GREEN} strokeWidth="4" />
          </g>
        );
      })}
    </svg>
  );
}
