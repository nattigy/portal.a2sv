import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import CustomDropdown from "../../components/common/CustomDropdown";
import SearchField from "../../components/common/SearchField";
import StudentLayout from "../../components/common/StudentLayout";
import GroupItem from "../../components/group/GroupItem";
import GroupItemList from "../../components/group/GroupItemList";
import GroupStatItem from "../../components/group/GroupStatItem";
import GroupStatList from "../../components/group/GroupStatList";
import GroupStudents from "../../components/group/GroupStudents";
import NewGroupModal from "../../components/modals/NewGroupModal";

const Index = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };
    return (
        <StudentLayout>
            <GroupStudents />
        </StudentLayout>
    );
};

export default Index;
