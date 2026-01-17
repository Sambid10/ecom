import { IconType } from "react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  Icon: IconType;
  href: string;
  className?: string;
}

export default function SocialButton({ href, Icon, className }: Props) {
  return (
    <Link
        target="_blank"
      className={cn(
        "rounded-full border border-gray-800 h-8 w-8 bg-white flex justify-center items-center hover:bg-gray-100 cursor-pointer",
      )}
      href={href}
    >
      <Icon className={cn("size-5",className)}/>
    </Link>
  );
}
