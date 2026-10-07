const icon = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-7 h-7",
  viewBox: "0 0 24 24",
};

const items = [
  {
    label: "Premios exclusivos",
    svg: (
      <svg {...icon}>
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M5 12v8h14v-8M12 8v12M12 8c-2-4-6-3-5 0M12 8c2-4 6-3 5 0" />
      </svg>
    ),
  },
  {
    label: "Promociones anticipadas",
    svg: (
      <svg {...icon}>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 15l6-6" />
        <circle cx="9.5" cy="9.5" r=".8" />
        <circle cx="14.5" cy="14.5" r=".8" />
      </svg>
    ),
  },
  {
    label: "Información de primera mano",
    svg: (
      <svg {...icon}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8v.01" />
      </svg>
    ),
  },
  {
    label: "Una nueva forma de comprar",
    svg: (
      <svg {...icon}>
        <path d="M3 4h2l2.5 11h10L20 7H6" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="17" cy="19" r="1" />
      </svg>
    ),
  },
];

export default function Benefits() {
  return (
    <ul className="grid grid-cols-4 divide-x divide-gray-300 bg-white rounded-3xl shadow-sm py-4">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex flex-col items-center gap-2 px-1 text-center"
        >
          <span className="bg-peach text-secondary rounded-2xl p-3">
            {item.svg}
          </span>
          <span className="text-[11px] leading-tight text-gray-700">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
