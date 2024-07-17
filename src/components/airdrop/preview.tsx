import { formatUnits } from "viem";

type Props = {
    addresses: string[];
    amounts: bigint[];
    totalAmount: bigint;
    tokenSymbol: string;
    tokenDecimals: number;
};

export default function Preview({ addresses, amounts, totalAmount, tokenSymbol, tokenDecimals }: Props) {
    return (
        <div className=" bg-white/10 p-4 rounded-lg mt-4 border-2 border-secondary">
            <div className=" w-full bg-white/10 p-4 rounded-lg flex flex-row justify-between gap-6">
                <h3 className="w-full text-base font-semibold">{`Airdropped Token: ${tokenSymbol}`}</h3>
                <h3 className="w-full text-base font-semibold">{`Total Airdrop Amount: ${formatUnits(totalAmount, tokenDecimals)} ${tokenSymbol}`}</h3>
            </div>

            <div className='bg-white/10 px-4 py-2 rounded-lg flex flex-row w-full justify-between gap-6 mt-2'>
                <div className='w-[45%] sm:w-full'>
                    <h3 className="text-base font-semibold text-left">Addresses:</h3>
                </div>
                <div className='w-[45%] sm:w-full'>
                    <h3 className="text-base font-semibold text-left">Amounts:</h3>
                </div>

            </div>
            <div className='flex flex-row gap-6 w-full justify-between h-64 overflow-y-auto mt-2 min-h-48 px-2'>
                <div className='w-[45%] sm:w-full'>
                    <ol className="list-inside overflow-x-auto w-full text-nowrap font-light text-sm">
                        {addresses.map((address, index) => (
                            <li key={index}>{address}</li>
                        ))}
                    </ol>
                </div>
                <div className='w-[45%] sm:w-full'>

                    <ol className="list-inside overflow-x-auto w-full text-nowrap font-light text-sm">
                        {amounts.map((amount, index) => (
                            <li key={index}>{formatUnits(amount, tokenDecimals)}</li>
                        ))}
                    </ol>
                </div>

            </div>
        </div>
    )
}