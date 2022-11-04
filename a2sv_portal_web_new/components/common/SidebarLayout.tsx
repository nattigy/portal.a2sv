import clsx from 'clsx'
import React, { useState } from 'react'

type Props = {
    sidebarItems: any
}

const SidebarLayout = (props: Props) => {
    const [sidebarHandler, setSidebarHandler] = useState<boolean>(true)
    return (
        <div className={clsx(
            "bg-white flex min-h-screen lg:w-72 drop-shadow-xl relative z-40",
        )}>
            <div className={
                clsx(
                    "w-full p-5 absolute right-0 lg:relative shadow lg:h-full flex-col justify-between hidden lg:flex ",
                )
            }
            >
                {props.sidebarItems}
            </div>

            <div className={
                clsx(
                    "w-72 z-40 absolute p-5 right-0 lg:relative bg-white shadow lg:h-full flex-col justify-between lg:hidden transition duration-150 ease-in-out",
                    sidebarHandler ? "transition duration-150  ease-in-out translate-x-72" : ""
                )
            } id="mobile-nav">
                <button aria-label="open sidebar" id="openSideBar" className={
                    clsx(
                        "h-10 w-10  bg-primary absolute right-0 mt-16 flex items-center shadow rounded-tl rounded-l-lg justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/40"
                        ,
                        sidebarHandler ? "hidden" : "-translate-x-72"
                    )
                }
                    onClick={
                        () => {
                            setSidebarHandler(true)
                        }
                    }
                >
                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom_alternate_style-svg8.svg" alt="cross" />
                </button>
                <div id="closeSideBar"
                    className={
                        clsx(
                            "h-10 w-10 bg-primary absolute right-0 mt-16 flex items-center transition delay-150 shadow rounded-l  justify-center cursor-pointer text-white ",
                            sidebarHandler ? "-translate-x-72" : "hidden"
                        )
                    }
                    onClick={
                        () => {
                            setSidebarHandler(false)
                        }
                    }
                >
                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom_alternate_style-svg7.svg" alt="toggler" />
                </div>
                <div className="min-h-screen lg:hidden ">
                    {props.sidebarItems}
                </div>
            </div>
        </div>
    )
}

export default SidebarLayout
