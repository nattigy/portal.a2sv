import React from "react";
import BaseLayout from "../../components/common/BaseLayout";
import HOATopicsPage from "../../components/topics/HOATopicsPage";

type Props = {};

const index = (props: Props) => {
  return (
    <BaseLayout>
      <HOATopicsPage />
    </BaseLayout>
  );
};

export default index;
