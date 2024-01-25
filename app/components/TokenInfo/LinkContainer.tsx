import Image from "next/image";
import Link from "next/link";

interface LinkContainerProps {
  link: string;
  currentTheme: string;
}

const LinkContainer = ({ link, currentTheme }: LinkContainerProps) => {
  return (
    <div className="flex justify-center items-center gap-4 bg-chart-volume px-6 py-4 rounded-xl">
      <Image
        src={`/images/token-info/${currentTheme}/link.svg`}
        alt="Link symbol"
        width={20}
        height={20}
      ></Image>
      <Link href={link} target="_blank">
        {link}
      </Link>
      <Image
        src={`/images/token-info/${currentTheme}/copy.svg`}
        alt="Copy symbol"
        width={20}
        height={20}
      ></Image>
    </div>
  );
};

export default LinkContainer;
