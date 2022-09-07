import React, { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import CustomDropdown from "../../components/common/CustomDropdown";
import SearchField from "../../components/common/SearchField";
import StudentLayout from "../../components/common/StudentLayout";
import GroupItem from "../../components/group/GroupItem";
import GroupItemList from "../../components/group/GroupItemList";
import GroupStatItem from "../../components/group/GroupStatItem";
import GroupStatList from "../../components/group/GroupStatList";
import GroupStudents from "../../components/group/GroupStudents";
import GroupStudentsSidebarItem from "../../components/group/GroupStudentsSidebarItem";
import { useGetUsersWithNoGroup } from "../../lib/hooks/useUsers";

const Index = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isAddStudentToGroupSidebarOpen, setIsAddStudentToGroupSidebarOpen] = useState(false)

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const Sidebar: React.FC<{ showStudentList: boolean }> = ({ showStudentList }: { showStudentList: boolean }) => {
        const { data, loading, error, refetch } = useGetUsersWithNoGroup()
        useEffect(() => {

        }, [refetch, data])

        return (
            <div className="flex flex-col gap-y-3 ">
                <GroupStudentsSidebarItem showStudentList={showStudentList} />
            </div>
        );
    };
    return (
        <StudentLayout sidebar={<Sidebar showStudentList={isAddStudentToGroupSidebarOpen} />}>
            <GroupStudents isAddStudentToGroupSidebarOpen={isAddStudentToGroupSidebarOpen} setIsAddStudentToGroupSidebarOpen={setIsAddStudentToGroupSidebarOpen} />
        </StudentLayout>
    );
};

export default Index;
