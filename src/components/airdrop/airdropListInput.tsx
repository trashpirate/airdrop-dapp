import React from "react";

type Props = {
    value: string;
    handler: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export default function AirdropListInput({ value, handler }: Props) {
    return (
        <div>
            <h3 className="mt-4 text-base font-semibold">Enter airdrop wallet list and amounts (max. 100): </h3>
            <textarea
                className="w-full h-40 p-2 border border-gray-300 rounded-md resize-none text-black my-2 text-xs font-light
                           whitespace-pre-wrap break-words"
                value={value}
                onChange={handler}
                placeholder="Enter wallets and amounts (ONE entry per line: address,amount)"
            />
        </div>
    )
}