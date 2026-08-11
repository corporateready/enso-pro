import Image from "next/image";

export type EnsoFeatureIconName =
  | "tag"
  | "property"
  | "message"
  | "construction";

type EnsoFeatureIconProps = {
  name: EnsoFeatureIconName;
  className?: string;
};

const icons = {
  tag: {
    src: "/cost-icon.svg",
    width: 18,
    height: 18,
  },
  property: {
    src: "/diagram-icon.svg",
    width: 19,
    height: 17,
  },
  message: {
    src: "/chat-icon.svg",
    width: 19,
    height: 18,
  },
  construction: {
    src: "/machine-icon.svg",
    width: 26,
    height: 21,
  },
} as const;

export default function EnsoFeatureIcon({
  name,
  className,
}: EnsoFeatureIconProps) {
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
