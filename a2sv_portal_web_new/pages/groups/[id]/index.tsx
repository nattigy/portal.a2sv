import { useRouter } from "next/router";
import React from "react";
import GroupInfo from "../../../components/dashboard/GroupInfo";

type Props = {};

const Index = (props: Props) => {
    const router = useRouter();
    const id = router.query["id"]?.toString() || "";
    return (
        <div>
            <GroupInfo groupId={id} />
        </div>
    );
};

export default Index;
