import Link from "next/link"

export default function CustomButton({
  text,
  href,
}: {
  text: string
  href: string
}) {
  return (
      <Link
      href={href}
      className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#22C55E_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-6 py-2 text-base font-normal text-black backdrop-blur-3xl">
          {text}
        </span>
      </Link>
  )
}
