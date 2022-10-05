import clsx from "clsx";
import React, { useState } from "react";

type SearchFieldProps = {
  placeholder: string;
  id: string;
  onChange: (val: string) => void;
  className?: string;
};

const SearchField = ({
  placeholder,
  id,
  className,
  onChange,
}: SearchFieldProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="relative flex items-center mt-1">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        id={id}
        className={clsx(
          "bg-white outline-none text-gray-400 font-regular text-xs rounded-full px-2 appearance-none dark:appearance-none dark:border-transparent border-transparent block w-80 pl-10 p-2.5  dark:bg-white  dark:placeholder-gray-400 dark:text-gray-400 ",
          className
        )}
        onChange={(e: any) => onChange(e.target.value)}
        // onChange={handleSearch}
        // value={searchQuery}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchField;
