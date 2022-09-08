import { useRouter } from "next/router";
import React from "react";
import BaseLayout from "../../../components/common/BaseLayout";
import GroupInfo from "../../../components/dashboard/GroupInfo";

type Props = {};

const Index = (props: Props) => {
  const router = useRouter();
  const id = parseInt(router.query["id"]?.toString() || "1");
  return (
    <div>
      <GroupInfo groupId={id} />
    </div>
  );
};

export default Index;
