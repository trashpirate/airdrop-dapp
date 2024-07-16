import { tokenABI } from '@/assets/tokenABI';
import { config } from '@/lib/config';
import { useState } from 'react';
import { formatEther, formatUnits, parseUnits } from 'viem';
import { readContract } from 'wagmi/actions';

type Props = {};

const TOKEN_CONTRACT = process.env.NEXT_PUBLIC_TOKEN_CONTRACT as `0x${string}`;


// define token contract config


export default function InputTextField({ }: Props) {
    const [inputValue, setInputValue] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [tokenDecimals, setTokenDecimals] = useState<number>(18);
    const [addresses, setAddresses] = useState<string[]>([]);
    const [amounts, setAmounts] = useState<bigint[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInputValue(value);
    };

    const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTokenAddress(value);
    };

    const handleParseClick = async () => {

        const tokenContract = {
            address: tokenAddress as `0x${string}`,
            abi: tokenABI,
            config
        };

        // read token fee
        const symbol = await readContract(config, {
            ...tokenContract,
            functionName: "symbol",
        });
        setTokenSymbol(symbol);

        const decimals = await readContract(config, {
            ...tokenContract,
            functionName: "decimals",
        });
        setTokenDecimals(decimals);


        const lines = inputValue.split('\n');
        const addressArray: string[] = [];
        const amountArray: bigint[] = [];

        for (let i = 0; i < lines.length; i++) {
            if (i >= 100) break;
            const [address, amount] = lines[i].split(',').map(item => item.trim());
            if (address && amount) {
                addressArray.push(address);
                amountArray.push(parseUnits(amount, decimals));
            }
        }

        setAddresses(addressArray);
        setAmounts(amountArray);
    };

    const handleAirdropClick = () => {

    }

    return (
        <div className='max-w-3xl mx-auto w-full'>
            <div>
                <h3 className="mt-4 text-base font-semibold">Enter wallet addresses (max. 100): </h3>
                <input
                    className="w-full h-fit p-2 border border-gray-300 rounded-md resize-none text-black my-2 text-xs font-light
                           whitespace-pre-wrap break-words"
                    value={tokenAddress}
                    onChange={handleTokenChange}
                    placeholder="Enter token address"
                />
            </div>
            <div>
                <h3 className="mt-4 text-base font-semibold">Enter wallet addresses (max. 100): </h3>
                <textarea
                    className="w-full h-40 p-2 border border-gray-300 rounded-md resize-none text-black my-2 text-xs font-light
                           whitespace-pre-wrap break-words"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter comma-delimited text"
                />
            </div>

            <div className='flex flex-row gap-4'>
                <button className='bg-white text-black px-2 py-1 rounded-lg cursor-pointer hover:bg-white/50 hover:border-white border-2'
                    onClick={handleParseClick}>Preview</button>
                <button className='bg-white text-black px-2 py-1 rounded-lg cursor-pointer hover:bg-white/50 hover:border-white border-2'
                    onClick={handleAirdropClick}>Airdrop</button>
            </div>

            <h3 className="mt-8 text-base font-semibold">{`Airdropped Token: ${tokenSymbol}`}</h3>
            <div className='flex flex-row gap-6 w-full justify-between h-64 overflow-y-auto mt-2 min-h-48'>

                <div className='w-[45%] sm:w-full'>
                    <h3 className="text-base font-semibold">Addresses:</h3>
                    <ol className="list-inside overflow-x-auto w-full text-nowrap font-light text-sm">
                        {addresses.map((address, index) => (
                            <li key={index}>{address}</li>
                        ))}
                    </ol>
                </div>
                <div className='w-[45%] sm:w-full'>
                    <h3 className="text-base font-semibold">Amounts:</h3>
                    <ol className="list-inside overflow-x-auto w-full text-nowrap font-light text-sm">
                        {amounts.map((amount, index) => (
                            <li key={index}>{formatUnits(amount, tokenDecimals)}</li>
                        ))}
                    </ol>
                </div>

            </div>
        </div>
    );
}