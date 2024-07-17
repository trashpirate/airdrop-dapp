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
                <h3 className="w-full text-sm sm:text-base font-semibold">{`Token: ${tokenSymbol}`}</h3>
                <h3 className="w-full text-sm sm:text-base font-semibold">{`Total Amount: ${Number(formatUnits(totalAmount, tokenDecimals)).toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                })}${String.fromCharCode(8239)} ${tokenSymbol}`}</h3>
            </div>

            <div className='bg-white/10 px-2 py-2 rounded-lg flex flex-row w-full justify-between gap-4 mt-2 '>
                <div className='w-12'>
                    <h3 className="text-base font-semibold text-left opacity-0"></h3>
                </div>
                <div className='w-[45%] sm:w-full'>
                    <h3 className="text-sm sm:text-base font-semibold text-left">Addresses:</h3>
                </div>
                <div className='w-[45%] sm:w-full max-w-[310px]'>
                    <h3 className="text-sm sm:text-base font-semibold text-left">Amounts:</h3>
                </div>

            </div>
            <div className='flex flex-row gap-4 w-full justify-between h-64 overflow-y-auto mt-2 min-h-48 px-2'>
                <div className='w-12'>
                    <ol className="list-inside overflow-x-auto w-full text-nowrap font-light text-sm">
                        {addresses.map((address, index) => (
                            <li key={index}>{index}</li>
                        ))}
                    </ol>
                </div>
                <div className='w-[45%] sm:w-full '>
                    <ol className="list-inside overflow-x-auto w-full text-nowrap font-light text-sm">
                        {addresses.map((address, index) => (
                            <li key={index}>{address}</li>
                        ))}
                    </ol>
                </div>
                <div className='w-[45%] sm:w-full pr-2'>
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