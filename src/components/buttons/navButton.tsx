import Image from "next/image";

type Props = {
    externalLink: string;
    imagePath: string;
    buttonText: string;
};

export default function NavButton({ externalLink, imagePath, buttonText }: Props) {
    return (
        <div className="sm:pl-1 sm:pr-4 my-auto h-12 w-12 sm:w-fit flex rounded-xl border-2 border-black bg-bgNavButton font-bold text-textNavButton hover:bg-bgNavButton/50 sm:justify-between transition duration-500">
            <a
                className="pointer-events-auto mx-auto flex items-center text-right align-middle text-lg uppercase sm:gap-2 lg:p-0"
                href={externalLink}
                rel="noopener noreferrer"
                target="_blank"
            >
                <Image
                    src={imagePath}
                    alt="nav button"
                    className="ml-0 h-full w-auto overflow-hidden rounded-xl p-1"
                    width={40}
                    height={40}
                    priority
                />
                <div className="w-0 scale-0 sm:w-fit sm:scale-100 leading-4 my-auto">{buttonText}</div>
            </a>
        </div>
    );
}