import React from "react";

const EmptyState = () => {
  return (
      <div className="m-auto w-fit">
        <img src="/images/no-data.svg" width={180} alt="" />
        <p>No records to display</p>
    </div>
  );
};

export default EmptyState;
