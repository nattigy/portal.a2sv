import React, { useState } from "react";
import GroupInfo from "./GroupInfo";

type Props = {
  groupId: number;
};

const HOEDashboard = (props: Props) => {
  return <GroupInfo groupId={props.groupId} />;
};

export default HOEDashboard;
