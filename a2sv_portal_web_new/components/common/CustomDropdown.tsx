import React from "react";

const CustomDropdown = () => {
  return (
    <div className="cursor-pointer">
      <label className="text-xs" htmlFor="filter">
        Sort by:
      </label>
      <select
        name="filter"
        id="filter"
        className="text-[#5956E9] text-xs outline-none bg-transparent"
      >
        <option value="item1">Date created</option>
        <option value="item2">Name</option>
        <option value="item3">item3</option>
        <option value="item4">item4</option>
      </select>
    </div>
  );
};

export default CustomDropdown;
