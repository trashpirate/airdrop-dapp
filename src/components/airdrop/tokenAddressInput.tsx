import React from "react";

type Props = {
    value: string;
    handler: React.ChangeEventHandler<HTMLInputElement>;
};

export default function TokenAddressInput({ value, handler }: Props) {
    return (
        <div className="w-full">
            <h3 className="mt-4 text-base font-semibold">Enter token contract address: </h3>
            <input
                className="w-full h-fit p-2 border border-gray-300 rounded-md resize-none text-black my-2 text-xs font-light
                           whitespace-pre-wrap break-words"
                value={value}
                onChange={handler}
                placeholder="Enter token address"
            />
        </div>
    )
}