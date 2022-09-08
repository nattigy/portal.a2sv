import clsx from 'clsx';
import React, { useEffect, useState } from 'react'

type Props = {
    label?: string;
    helperText?: string;
    selectMenuItems: { value: number, label: string }[];
    handleSelect: (val: any) => void
}

function SeasonSelecBox(props: Props) {
    const [seasonVal, setSeasonVal] = useState<{ value: number, label: string } | null>(null)
    const [showMenu, setShowMenu] = useState(false)

    const onMenuSelect = (item: { value: number, label: string }) => {
        setSeasonVal(item)
        setShowMenu(false)
        props.handleSelect(item)
    }

    useEffect(() => {
        const onClick = (event: any) => {
            setShowMenu(false)
        };
        window.addEventListener('click', onClick);
        return () => {
            window.removeEventListener('click', onClick);
        }
    }, [])


    return (
        <div className="relative">
            <div className="relative w-40 border border-gray-300 rounded outline-none">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setShowMenu(prev => !prev)
                    }}
                    className="relative flex items-center justify-between w-full px-3 py-2 "
                >
                    <span
                        className="pr-4 text-sm font-medium text-gray-600"
                    >
                        {seasonVal ? seasonVal.label : "Select Season"}
                    </span>
                    <svg
                        id="rotate"
                        className="absolute z-10 cursor-pointer right-5"
                        width={10}
                        height={6}
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0.5 0.75L5 5.25L9.5 0.75"
                            stroke="#4B5563"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <div
                    className={clsx(
                        "absolute z-20 right-0 w-full px-1 py-2 bg-white border-t border-gray-200 rounded shadow top-12",
                        showMenu ? "block" : "hidden",
                    )}
                >
                    {
                        props.selectMenuItems && props.selectMenuItems.map((menuItem, index) => {
                            return (
                                <a key={index} href="javascript:void(0)" className="hover">
                                    <p
                                        className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded"
                                        onClick={() => onMenuSelect(menuItem)}
                                    >
                                        {menuItem.label}
                                    </p>
                                </a>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SeasonSelecBox
