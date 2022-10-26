import { useRouter } from "next/router";
import React from "react";
import GroupInfo from "../../../components/dashboard/GroupInfo";
import HOAGuard from "../../../lib/Guard/HOAGuard";

type Props = {};

const Index = (props: Props) => {
  const router = useRouter();
  const id = parseInt(router.query["id"]?.toString() || "1");
  return (
    <HOAGuard>
    <div>
      <GroupInfo groupId={id} />
    </div>
    </HOAGuard>
  );
};

export default Index;
