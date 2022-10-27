import { Transition } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { MdSignalWifiConnectedNoInternet4 } from "react-icons/md"
import { HiLightningBolt } from "react-icons/hi"
import { MdOutlineClose } from "react-icons/md"
import { useReactiveVar } from '@apollo/client'
import { hasNetworkError } from '../../lib/constants/authenticated'

type Props = {
    title?: string;
    message?: string;
    show?: boolean
}

const NetworkErrorToaster = (props: Props) => {
    const [showToast, setShowToast] = useState(false)
    const hasNetError = useReactiveVar(hasNetworkError)

    useEffect(() => {
        setTimeout(() => {
            setShowToast(false)
        }, 3000);
    }, [])

    return hasNetError ? (
        <div className="absolute z-50 right-5 top-5 ">
            <Transition
                appear
                show={showToast}
                className="transform p-5 gap-x-5 flex items-center bg-white rounded-lg shadow-2xl drop-shadow-lg"
                enter="transition-all duration-150"
                enterFrom="translate-x-400 opacity-0 scale-50"
                enterTo="opacity-100 scale-100"
                leave="transition-all duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-75"
            >
                <div >
                    {/* <HiLightningBolt /> */}
                    <MdSignalWifiConnectedNoInternet4 className="text-red-500" size={30} />

                </div>
                <div >
                    <h1>{props.title || "Connection Error"}</h1>
                    <p className="text-xs">
                        {props.message || `You don't seem to have an active internet connection. <br/>
                        please check your connection and try again.`}
                    </p>
                </div>
                <div onClick={() => { setShowToast(false) }}>
                    <MdOutlineClose />
                </div>

                {/* <MdSignalWifiConnectedNoInternet4 className="text-red-500" size={30} /> */}
                {/* <p className="px-2 ">{props.message}</p> */}
            </Transition>
        </div>
    ) : (
        <></>
    )
}

export default NetworkErrorToaster