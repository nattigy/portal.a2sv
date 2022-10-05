import React from "react";
import { WithChildren } from "../../types/common";

interface TagProps extends WithChildren {
  value: string;
}

const Tag = (props: TagProps) => {
<<<<<<< HEAD
  return (
    <div className="flex flex-row justify-between px-4 py-2 border rounded-full gap-x-2">
      {props.children}
    </div>
  );
};
=======
    return (
        <div className='flex flex-row justify-between px-4 py-2 border rounded-full gap-x-2 bg-[#5956E91A]'>
            {props.children}
        </div>
    )
}
>>>>>>> 805dd5ff11eb759089e952c9869ea8e9e26377ff

export default Tag;
