import React from "react";

const CustomDropdown = () => {
  return (
    <div>
      <label className="text-xs" htmlFor="cars">
        Choose a car:
      </label>
      <select
        name="cars"
        id="cars"
        className="text-[#5956E9] text-xs focus:border-none active:border-none outline-none"
      >
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  );
};

export default CustomDropdown;
