import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import CustomDropdown from "../../../components/common/CustomDropdown";
import SearchField from "../../../components/common/SearchField";
import StudentLayout from "../../../components/common/StudentLayout";
import GroupItem from "../../../components/group/GroupItem";
import GroupItemList from "../../../components/group/GroupItemList";
import GroupStatItem from "../../../components/group/GroupStatItem";
import GroupStatList from "../../../components/group/GroupStatList";
import useGroupDetail from "../../../lib/hooks/useGroupDetail";

const Index = () => {
    const router = useRouter()
    const [currentPath, setCurrentPath] = useState<number>(0)
    const { data, loading, error, refetch } = useGroupDetail(router.query["id"]?.toString())
    useEffect(() => {
        setCurrentPath(parseInt(router.query["id"]?.toString() || "1"))
        refetch()
    }, [router.pathname])

    return (
        <StudentLayout>
            <div className="w-full h-screen pt-7 flex flex-col gap-y-6">
                <GroupStatList />
                <h1 className="text-4xl font-bold">
                    {
                        data && data.group.name
                    } - {
                        data && data.group.country
                    }
                </h1>
                <div className="grid grid-cols-6 gap-y-10">
                    <div className="col-span-2 grid justify-items-stretch">
                        <img
                            src="/images/group-image.svg"
                            className="justify-self-center w-60 h-60"
                            alt=""
                        />
                        <p className="text-[#ACACAC] justify-self-center text-xs">
                            Here&apos;s the list of all student of the groups
                        </p>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
};

export default Index;
