import Image from "next/image";

export type SocialIconName =
  | "tiktok"
  | "x"
  | "instagram"
  | "facebook"
  | "youtube"
  | "linkedin";

type SocialIconProps = {
  name: SocialIconName;
  className?: string;
};

const icons = {
  tiktok: {
    src: "/tic-toc.svg",
    width: 14,
    height: 16,
  },
  x: {
    src: "/x.svg",
    width: 15,
    height: 14,
  },
  instagram: {
    src: "/insta.svg",
    width: 15,
    height: 15,
  },
  facebook: {
    src: "/facebook.svg",
    width: 10,
    height: 19,
  },
  youtube: {
    src: "/youtube.svg",
    width: 20,
    height: 14,
  },
  linkedin: {
    src: "/linkedin.svg",
    width: 16,
    height: 16,
  },
} as const;

export default function SocialIcon({ name, className }: SocialIconProps) {
  const icon = icons[name];

  return (
    <Image
      className={className}
      src={icon.src}
      width={icon.width}
      height={icon.height}
      style={{
        width: `${icon.width}rem`,
        height: `${icon.height}rem`,
      }}
      alt=""
      aria-hidden="true"
    />
  );
}
