import { useReactiveVar } from "@apollo/client";
import React, { ReactNode, useEffect, useState } from "react";
import CustomDropdown, { CustomDropdownProps } from "../../components/common/CustomDropdown";
import BaseLayout from "../../components/common/BaseLayout";
import SeasonSelecBox from "../../components/topics/SeasonSelecBox";
import TopicList from "../../components/topics/TopicList";
import TopicStruggledList from "../../components/topics/TopicStruggledList";


const IndexPage = () => {
    const selectMenuItems = [
        {
            value: "camp",
            label: "Camp"
        },
        {
            value: "education",
            label: "Education"
        }
    ]
    const [selectedSeason, setSelectedSeason] = useState(selectMenuItems[0].value);
    const dropdown: CustomDropdownProps = {
        label: "",
        options: ["Education", "Camp"],
    };

    const Sidebar: React.FC = () => {
        return (
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-y-5">
                    <p className="font-bold">Topics struggling with</p>
                    <TopicStruggledList />
                </div>

                <div className="flex-col flex items-center">
                    <p className="text-sm">Are You Strugging with a Topic?</p>
                    <img src="/images/struggling.svg" className="w-3/5" alt="" />
                    <p className="text-[#747474] font-light text-sm">
                        Don’t worry we’ll give you a reliable hand. Don’t give up keep
                        pushing!
                    </p>
                </div>
            </div>
        );
    };



    return (
        <BaseLayout sidebar={<Sidebar />}>
            <>
                <div className="flex w-full justify-between items-center mb-2 gap-x-5 ">
                    <h1 className="text-2xl font-bold text-gray-700">Topics</h1>
                    <SeasonSelecBox handleSelect={(val) => setSelectedSeason(val)} selectMenuItems={selectMenuItems} />
                    {/* <CustomDropdown customProps={dropdown} selected={select} setSelected={setSelect} /> */}
                </div>
                <TopicList selectedSeason={selectedSeason} title="Current" />
                <TopicList selectedSeason={selectedSeason} title="Recent" />
                <TopicList selectedSeason={selectedSeason} title="All covered" />
            </>
        </BaseLayout>
    );
};

export default IndexPage;
