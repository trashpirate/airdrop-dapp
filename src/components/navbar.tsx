import NavButton from "./buttons/navButton";
import { FEE_TOKEN_CONTRACT } from "@/lib/metadata";

type Props = {};

export default function Navbar({ }: Props) {
    return (
        <nav className="top-0 mx-auto my-2 flex justify-between gap-5 align-middle w-full">
            <NavButton externalLink="https://buyholdearn.com" imagePath="/logo.png" buttonText="Home"></NavButton>
            <NavButton externalLink={`https://app.uniswap.org/swap?chain=base&outputCurrency=${FEE_TOKEN_CONTRACT}`} imagePath="/uniswap.png" buttonText="BUY EARN"></NavButton>
        </nav>
    );
}