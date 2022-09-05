import React, { useState } from "react";

export type CustomDropdownProps = {
  label: string;
  options: Array<string>;
};

type Props = {
  customProps: CustomDropdownProps;
  selected?: string;
  setSelected?: any;
};

const CustomDropdown = ({ customProps, selected, setSelected }: Props) => {
  const changeHandler = (event: any) => {
    setSelected(event.target.value);
  };

  return (
    <div className="cursor-pointer">
      <label className="text-xs" htmlFor="filter">
        {`${customProps.label}`}
      </label>
      <select
        name="filter"
        onChange={changeHandler}
        value={selected}
        id="filter"
        className="text-[#5956E9] text-xs outline-none bg-transparent"
      >
        {customProps.options.map((option: any, index: number) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
