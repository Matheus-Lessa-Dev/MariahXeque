export function Icon({ name, className }: { name: "courses" | "jewel" | "youtube" | "instagram" | "play" | "materials" | "updates"; className?: string }) {
  const paths = {
    courses: "m2 9 10-5 10 5-10 5L2 9 M6 11v6c4 3 8 3 12 0v-6 M22 9v7",
    jewel: "M3 8 7 3h10l4 5-9 13L3 8 M3 8h18 M7 3l5 18 5-18 M7 8l5-5 5 5",
    youtube: "M5 5h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3 M10 8l6 4-6 4V8",
    instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M17.5 6.5h.01",
    play: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0 M10 8l6 4-6 4V8",
    materials: "M5 3h10l4 4v14H5V3 M15 3v5h4 M8 11h8 M8 15h8 M8 18h6",
    updates: "M20 10a8 8 0 0 0-14-4 M4 3v5h5 M4 14a8 8 0 0 0 14 4 M20 21v-5h-5",
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
