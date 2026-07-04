import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "mark" | "wordmark";
  className?: string;
  link?: boolean;
};

export default function Logo({
  variant = "mark",
  className = "",
  link = true,
}: LogoProps) {
  const content =
    variant === "wordmark" ? (
      <Image
        src="/logos/logo-wordmark.svg"
        alt="Lawyertec"
        width={4569}
        height={1000}
        className={`h-7 w-auto sm:h-8 ${className}`}
        priority
      />
    ) : (
      <Image
        src="/logos/icon-mark.svg"
        alt="Lawyertec"
        width={1000}
        height={1000}
        className={`h-8 w-8 ${className}`}
        priority
      />
    );

  if (!link) return <span className="inline-flex shrink-0 items-center">{content}</span>;

  return (
    <Link href="/" className="inline-flex shrink-0 items-center">
      {content}
    </Link>
  );
}
