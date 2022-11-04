import React from "react";
import { WithChildren } from "../../types/common";

interface TagProps extends WithChildren {
  value: string;
}

const Tag = (props: TagProps) => {
    return (
        <div className='w-fit h-8 justify-between px-4 py-2 border rounded-full gap-x-2 bg-[#5956E91A]'>
            {props.children}
        </div>
    )
}

export default Tag;
