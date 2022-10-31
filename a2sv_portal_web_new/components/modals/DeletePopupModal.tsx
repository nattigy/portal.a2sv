import React, { useState } from "react";
import * as yup from "yup";
import { ApolloError, useMutation } from "@apollo/client";
import { CREATE_GROUP_MUTATION } from "../../lib/apollo/Mutations/groupsMutations";

import Button from "../common/Button";
import { BiTrash } from "react-icons/bi";

type Props = {
  onClose: () => void;
  onDelete: () => void;
  title: string;
  description: string;
};

const DeletePopupModal = (props: Props) => {
  return (
    <>
      <div className=" transition-all duration-200 py-8 text-[#565656] w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900 bg-opacity-30 z-50">
        <div
          role="alert"
          className="flex flex-col gap-y-2 min-h-fit bg-white container mx-auto w-11/12 md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-xl  px-8 py-5"
        >
          <div className="flex flex-col h-full gap-y-4 items-center justify-between">
            <div className="rounded-full border-2 border-[#D72B2B] p-2">
              <BiTrash color="#D72B2B" size={36} />
            </div>
            <div className="flex flex-col items-center gap-y-1">
              <h1 className="font-bold text-lg">{props.title}</h1>
              <h1 className="font-semibold text-md text-[#A6A6A6]">
                {props.description}
              </h1>
            </div>
            <div className="w-full flex flex-col">
              <h1 className="font-semibold text-center text-md text-[#A6A6A6]">
                Are you sure?
              </h1>
              <div className="flex justify-end gap-x-2">
                <Button
                  text="Cancel"
                  classname="bg-white text-[#565656] font-semibold text-sm h-10"
                  onClick={() => props.onClose()}
                />
                <Button
                  text="Delete"
                  onClick={() => props.onDelete()}
                  classname="text-white bg-[#D72B2B] font-semibold text-sm h-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePopupModal;
