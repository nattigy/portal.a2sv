import { ReactNode } from "react";
export const Tooltip = ({
    message, children
}: {
    message?: string,
    children?: ReactNode
}) => {
    return (
        <div className="cursor-pointer w-3 h-3 relative flex flex-col border-1 items-center group">
            {children}
            {
                message && (
                    <div className="w-max shadow-xl z-50 drop-shadow-xl absolute bottom-0 flex-col items-center hidden text-black  mb-6 group-hover:flex">
                        <span className=" w-max h-max flex items-center justify-center relative z-40 p-2 text-xs leading-none text-black whitespace-no-wrap bg-gray-100 shadow-lg rounded-md">{message}</span>
                    </div>
                )
            }
        </div>
    );
};
