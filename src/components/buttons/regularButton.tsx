import React from "react";

type Props = {
    buttonText: string;
    disabled: boolean;
    clickHandler: React.MouseEventHandler<HTMLButtonElement>;
};

export default function RegularButton({ buttonText, clickHandler, disabled }: Props) {
    return (
        <button className='bg-white text-black px-4 py-2 rounded-lg cursor-pointer hover:bg-white/50 hover:border-white border-2 ease-in-out duration-500'
            type="button" disabled={disabled} onClick={clickHandler}>{buttonText}</button>
    )
}