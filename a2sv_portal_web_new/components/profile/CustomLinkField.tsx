import clsx from 'clsx'
import { Field, FormikProps } from 'formik'
import React, { ReactElement } from 'react'
import { IconType } from 'react-icons'
import { FiExternalLink } from 'react-icons/fi'
import { MdAlternateEmail } from 'react-icons/md'

type Props = {
    name:string;
    placeholder:string;
    title:string;
    error?:string;
    touched?:boolean;
    imgPath?:string;
    icon?:ReactElement<IconType>;
}

const CustomLinkField = (props: Props) => {
  return (
    <div className="flex gap-x">
    <div className="flex w-6/12 items-center gap-x-2 p-2">
      {props.imgPath?<img src={props.imgPath} className="w-8" alt="" />:props.icon}
      <h1 className="text-sm">{props.title}</h1>
    </div>
    <div className="flex flex-col w-full">
    <div className="flex w-full relative ml-4">
      <MdAlternateEmail className="absolute left-2 top-1/3" />
      <Field
        id={props.name}
        name={props.name}
        placeholder={`Enter your ${props.placeholder} account`}
        type="link"
        className={clsx(
          "w-full text-xs placeholder-[#767676] rounded-md focus:outline-none py-3 px-8 my-2",
          props.error && props.touched
            ? "border border-red-500"
            : "border border-[#D2D2D2]"
        )}
      />
      <FiExternalLink className="absolute top-1/3 right-2" />
    </div>
    <h1 className="text-xs font-light text-red-700 pl-4">
      {props.error}
    </h1>
    </div>
  </div>
  )
}
export default CustomLinkField;