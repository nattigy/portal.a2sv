import { ReactNode } from "react";
import { WithChildren } from "../../types/common";

interface LayoutProps extends WithChildren {
    message?: string;
    show: boolean
}


export const CustomTooltip = ({
    message,
    show,
    children,
}: LayoutProps) => {
    return (
        <div className="relative flex flex-col items-center group">
            {
                show && (
                    <div className="absolute bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
                        <span className="relative z-10 p-2 text-xs text-center leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">{message}</span>
                        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
                    </div>
                )
            }
            {children}
        </div>
    );
};
