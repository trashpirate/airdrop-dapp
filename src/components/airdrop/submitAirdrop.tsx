
import { tokenABI } from '@/assets/tokenABI';
import { airdropABI } from '@/assets/airdropABI';
import { config } from '@/lib/config';

import { Dialog, Transition } from '@headlessui/react'
import { MoonLoader } from 'react-spinners';
import { Fragment, useEffect, useState } from 'react'
import { formatEther, formatUnits } from 'viem';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { readContract, } from 'wagmi/actions';
import Image from 'next/image';

import RegularButton from '../buttons/regularButton';

import { AIRDROP_CONTRACT, FEE_TOKEN_CONTRACT } from '@/lib/metadata';


// define token contract config
const airdropContract = {
    address: AIRDROP_CONTRACT,
    abi: airdropABI,
    config
};

async function getTokenNumberString(amount: bigint, tokenAddress: `0x${string}`) {

    const [symbol, decimals] = await getTokenInfo(tokenAddress);
    const decimalAmount = Number(formatUnits(amount, decimals));
    let text: string = "---";
    if (amount != null) {

        text = `${decimalAmount.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })}${String.fromCharCode(8239)} ${symbol}`;
        return text;
    }
}

async function hasTokensApproved(account: `0x${string}`, amount: bigint, token: `0x${string}`): Promise<[boolean, boolean]> {

    const contract = {
        address: token,
        abi: tokenABI,
        config
    };

    const symbol = await readContract(config, {
        ...contract,
        functionName: "symbol",
    });

    // read allowance
    const balance = await readContract(config, {
        ...contract,
        functionName: "balanceOf",
        args: [account]
    });

    const sufficientBalance = balance >= amount;

    // read allowance
    const allowance = await readContract(config, {
        ...contract,
        functionName: "allowance",
        args: [account, AIRDROP_CONTRACT]
    });

    const approved = allowance >= amount;

    return [sufficientBalance, approved];
}

async function getTokenInfo(token: `0x${string}`): Promise<[string, number]> {
    const contract = {
        address: token,
        abi: tokenABI,
        config
    };

    // read allowance
    const symbol = await readContract(config, {
        ...contract,
        functionName: "symbol",
    });

    const decimals = await readContract(config, {
        ...contract,
        functionName: "decimals",
    });

    return [symbol, decimals];
}

type Props = {
    airdropInfo: () => ([`0x${string}`, `0x${string}`[], bigint[]]);
};

export default function SubmitAirdrop({ airdropInfo }: Props) {

    const [airdropToken, addresses, amounts] = airdropInfo();

    // states
    let [isOpen, setIsOpen] = useState(false);
    let [isApproving, setIsApproving] = useState<boolean>(false);
    let [isAirdropping, setIsAirdropping] = useState<boolean>(false);
    let [airdropCompleted, setAirdropCompleted] = useState<boolean>(false);
    let [airdropAmount, setAirdropAmount] = useState<bigint>(BigInt(0));
    let [amountToApprove, setAmountToApprove] = useState<bigint>(BigInt(0));
    let [tokenToApprove, setTokenToApprove] = useState<`0x${string}`>("0x0");
    let [showError, setShowError] = useState<boolean>(false);
    let [errorMessage, setErrorMessage] = useState<string>("An Error occured.");

    // connected account
    const { address, isConnected, isConnecting, chainId } = useAccount();

    // set up write contract hooks
    const { data: airdropHash,
        isPending: airdropPending,
        isError: airdropError,
        writeContract: callAirdrop } = useWriteContract();

    const { data: approveHash,
        isPending: approvePending,
        isError: approveError,
        writeContract: callApprove } = useWriteContract();

    // approve fee tokens
    async function approve(tokenAddress: `0x${string}`, amount: bigint) {
        callApprove({
            address: tokenAddress,
            abi: tokenABI,
            functionName: "approve",
            args: [AIRDROP_CONTRACT, amount],
            account: address,
        });
    }

    // airdrop
    async function airdrop() {
        callAirdrop({
            ...airdropContract,
            functionName: "airdrop",
            args: [airdropToken, addresses, amounts],
            account: address,
        });
    }


    async function approveOrAirdrop() {
        // read token fee
        const airdropFee = await readContract(config, {
            ...airdropContract,
            functionName: "getAirdropFee",
        });

        // read token fee
        const excludedFromFee = await readContract(config, {
            ...airdropContract,
            functionName: "isExcluded",
            args: [address as `0x${string}`],
        });



        let sufficientFeeBalance: boolean;
        let feeTokenApproved: boolean;
        if (excludedFromFee) {
            sufficientFeeBalance = true;
            feeTokenApproved = true;
        }
        else {
            [sufficientFeeBalance, feeTokenApproved] = await hasTokensApproved(address as `0x${string}`, airdropFee, FEE_TOKEN_CONTRACT);
        }

        const [sufficientAirdropBalance, airdropTokenApproved] = await hasTokensApproved(address as `0x${string}`, airdropAmount, airdropToken);

        if (!sufficientFeeBalance) {
            setErrorMessage(`Insufficient token balance. You need ${getTokenNumberString(airdropFee, FEE_TOKEN_CONTRACT)} to airdrop.`);
            setShowError(true);
            return;
        };

        if (!sufficientAirdropBalance) {
            setErrorMessage(`Insufficient token balance. You need ${getTokenNumberString(airdropAmount, airdropToken)} to airdrop.`);
            setShowError(true);
            return;
        };

        /** adjust this if no tokens used for airdroping */
        // setIsAirdropping(true);
        // airdrop();

        if (feeTokenApproved && airdropTokenApproved) {
            setIsApproving(false);
            setIsAirdropping(true);
            airdrop();
        }
        else if (feeTokenApproved && !airdropTokenApproved) {
            setTokenToApprove(airdropToken);
            setAmountToApprove(airdropAmount);
            setIsApproving(true);
            approve(airdropToken, airdropAmount);
        }
        else {
            setTokenToApprove(FEE_TOKEN_CONTRACT);
            setAmountToApprove(airdropFee);
            setIsApproving(true);
            approve(FEE_TOKEN_CONTRACT, airdropFee);
        }
    }

    // on button click
    async function onSubmit() {
        await approveOrAirdrop();
    }

    // transaction hooks
    const { isLoading: isConfirmingAirdrop, isSuccess: isConfirmedAirdrop } =
        useWaitForTransactionReceipt({
            confirmations: 3,
            hash: airdropHash
        })

    const { isLoading: isConfirmingApprove, isSuccess: isConfirmedApprove } =
        useWaitForTransactionReceipt({
            confirmations: 3,
            hash: approveHash,
        })

    // checking if airdroping or approving in process
    useEffect(() => {
        if (isConfirmedApprove) {
            approveOrAirdrop();
        }
    }, [isConfirmedApprove]);

    // delay after airdroping is finished
    useEffect(() => {
        if (isConfirmedAirdrop) {
            setAirdropCompleted(true);
        }
    }, [isConfirmedAirdrop]);

    // open/close popup
    useEffect(() => {
        if (isApproving || isAirdropping || showError || airdropCompleted) {
            setIsOpen(true);
        }
        else {
            setIsOpen(false);
        }
    }, [isApproving, isAirdropping, showError, airdropCompleted])

    // approve error
    useEffect(() => {
        if (approveError) {
            setIsApproving(false);
        }
    }, [approveError])

    // airdroping error
    useEffect(() => {
        if (airdropError) {
            setIsAirdropping(false);
        }
    }, [airdropError])


    useEffect(() => {

        let total: bigint = BigInt(0);
        for (let i = 0; i < amounts.length; i++) {
            total += amounts[i];
        }
        setAirdropAmount(total);

    }, [amounts])

    // close pop up
    function closeModal() {
        setShowError(false);
        setIsApproving(false);
        setIsAirdropping(false);
        setAirdropCompleted(false);
    }

    return (
        <>
            <RegularButton disabled={airdropPending || approvePending || !isConnected} clickHandler={onSubmit} buttonText="Airdrop"></RegularButton>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="flex items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="aspect-square flex flex-col justify-between w-screen max-w-xs transform overflow-hidden rounded-2xl text-white bg-primary/80 backdrop-blur p-6 xxs:p-10 text-center align-middle shadow-xl transition-all">
                                    <div className='h-full w-full flex flex-col justify-between'>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-secondary uppercase"
                                        >
                                            {isAirdropping && !showError && <div>Airdropping Tokens</div>}
                                            {isApproving && !showError && <div>Approving Tokens</div>}
                                            {showError && <div>Error</div>}
                                        </Dialog.Title>
                                        <div className="mt-2 text-xs sm:text-base text-white">
                                            {isApproving && approvePending && <p>{`Approve ${getTokenNumberString(amountToApprove, tokenToApprove)} in your wallet.`}</p>}
                                            {isApproving && isConfirmingApprove && <p>{`Approving ${getTokenNumberString(amountToApprove, tokenToApprove)}...`}</p>}
                                            {isAirdropping && airdropPending && <div><p>Confirm transaction in your wallet.</p></div>}
                                            {isAirdropping && isConfirmingAirdrop && <p>Airdropping your tokens...</p>}
                                            {isAirdropping && isConfirmedAirdrop && <div><p >Airdrop Successful!</p><a className='my-2 font-semibold text-secondary cursor-pointer hover:underline hover:underline-offset-2' target='_blank' href={`https://basescan.org/tx/${airdropHash}`}>Transaction</a></div>}
                                            {showError && <p className='text-secondary'>{errorMessage}</p>}

                                        </div>
                                        <div className='my-4 flex justify-center h-16'>
                                            {(isConfirmingApprove || isConfirmingAirdrop) ? <MoonLoader className='my-auto' color="#FFFFFF" speedMultiplier={0.7} /> :
                                                <Image
                                                    className='h-full w-auto my-auto'
                                                    src='/logo_transparent.png'
                                                    width={50}
                                                    height={50}
                                                    alt="EARN logo"
                                                    priority
                                                >
                                                </Image>}
                                        </div>
                                        <div >
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md bg-white/20 px-4 py-2 text-sm font-medium text-black hover:bg-white/40"
                                                onClick={closeModal}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition >
        </>
    )
}
