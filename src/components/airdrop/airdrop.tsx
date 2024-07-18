import { tokenABI } from '@/assets/tokenABI';
import { config } from '@/lib/config';
import { useState } from 'react';
import { parseUnits } from 'viem';
import { readContract } from 'wagmi/actions';
import { ConnectKitButton } from 'connectkit';

import Preview from './preview';
import AirdropListInput from './airdropListInput';
import TokenAddressInput from './tokenAddressInput';
import RegularButton from '../buttons/regularButton';
import SubmitAirdrop from './submitAirdrop';

import { FEE_TOKEN_CONTRACT } from '@/lib/metadata';


type Props = {};
type AirdropInfoType = [`0x${string}`, `0x${string}`[], bigint[]];

function calcTotalAirdropAmount(amountArray: bigint[]): bigint {
    let total: bigint = BigInt(0);
    for (let i = 0; i < amountArray.length; i++) {
        total += amountArray[i];
    }
    return total;
}

export default function Airdrop({ }: Props) {
    const [inputValue, setInputValue] = useState('');
    const [inputTokenValue, setInputTokenValue] = useState('');
    const [tokenAddress, setTokenAddress] = useState<`0x${string}`>(FEE_TOKEN_CONTRACT);
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [tokenDecimals, setTokenDecimals] = useState<number>(18);
    const [addresses, setAddresses] = useState<`0x${string}`[]>([]);
    const [amounts, setAmounts] = useState<bigint[]>([]);
    const [totalAmount, setTotalAmount] = useState<bigint>(BigInt(0));
    const [previewed, setPreviewed] = useState<boolean>(false);
    const [parseError, setParseError] = useState<boolean>(false);
    const [parseErrorMessage, setParseErrorMessage] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setPreviewed(false);
    };

    const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputTokenValue(value);
        setPreviewed(false);
    };

    const handleParseClick = async () => {

        try {
            const airdropTokenAddress = inputTokenValue as `0x${string}`;
            setTokenAddress(airdropTokenAddress)

            const tokenContract = {
                address: airdropTokenAddress,
                abi: tokenABI,
                config
            };

            // read token fee
            let symbol: string;
            let decimals: number;
            try {
                symbol = await readContract(config, {
                    ...tokenContract,
                    functionName: "symbol",
                });
                setTokenSymbol(symbol);

                decimals = await readContract(config, {
                    ...tokenContract,
                    functionName: "decimals",
                });
                setTokenDecimals(decimals);
                setParseError(false);
            } catch (error) {
                setParseError(true);
                setParseErrorMessage("Could not fetch airdrop token info. Check contract address.")
                return;
            }


            const lines = inputValue.split('\n');
            const addressArray: `0x${string}`[] = [];
            const amountArray: bigint[] = [];

            for (let i = 0; i < 500; i++) {
                const [address, amount] = lines[i].split(',').map(item => item.trim());
                if (address && amount) {
                    addressArray.push(address as `0x${string}`);
                    amountArray.push(parseUnits(amount, decimals));
                }
            }

            const total = calcTotalAirdropAmount(amountArray);
            setTotalAmount(total);

            setAddresses(addressArray);
            setAmounts(amountArray);
            setPreviewed(true);
            setParseError(false);
        } catch (error) {
            console.log(error);
            setParseError(true);
            setParseErrorMessage("Invalid input format. Check airdrop list.")
            return;
        }

    };

    function handleAirdropClick(): AirdropInfoType {
        return [tokenAddress, addresses, amounts];
    }

    return (
        <div className='max-w-3xl mx-auto w-full '>
            <div className='mx-auto w-full my-8 flex justify-center'>
                <ConnectKitButton showAvatar={false} showBalance={true} />
            </div>
            <TokenAddressInput value={inputTokenValue} handler={handleTokenChange}></TokenAddressInput>
            <AirdropListInput value={inputValue} handler={handleInputChange}></AirdropListInput>

            <div className='flex flex-row gap-4'>
                {previewed ? <SubmitAirdrop airdropInfo={handleAirdropClick}></SubmitAirdrop> : <RegularButton disabled={false} clickHandler={handleParseClick} buttonText="Preview"></RegularButton>}
                {parseError && <div className='text-red-600 text-xs font-light my-auto'>{parseErrorMessage}</div>}

            </div>

            <Preview addresses={addresses} amounts={amounts} totalAmount={totalAmount} tokenSymbol={tokenSymbol} tokenDecimals={tokenDecimals}></Preview>

        </div>
    );
}