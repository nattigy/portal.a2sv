import React from "react";

const EmptyState = () => {
  return (
    <div className="m-auto w-fit">
      <img src="/images/no-data.svg" width={150} alt="" />
      <p className="text-gray-700">No records to display</p>
    </div>
  );
};

export default EmptyState;
