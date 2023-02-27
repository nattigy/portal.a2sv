import { useReactiveVar } from "@apollo/client";
import router, { useRouter } from "next/router";
import React from "react";
import { slugify } from "../../helpers/slugify";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { useGetGroupSeasonTopics } from "../../lib/hooks/useTopics";
import CustomLink from "../common/CustomLink";
import EmptyState from "../common/EmptyState";
import { LoaderSmall } from "../common/Loaders";
import TopicItem from "./TopicItem";

const StudentToicsPage = () => {
  const router = useRouter();
  const authUser = useReactiveVar(authenticatedUser) as AuthUser;
  const { data, loading, error } = useGetGroupSeasonTopics(
    router.query?.seasonId?.toString() || "",
    authUser.groupId || ""
  );

  // const href = {
  //   pathname: pathname,
  //   query: {
  //     seasonId: props.season?.id,
  //     topicId: props.topic.id,
  //   },
  // };

  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className=" justify-between flex items-center mb-2 gap-x-5 ">
          <h1 className="text-lg font-semibold text-gray-700">Group Topics</h1>
        </div>
      </div>

      <div className="w-full flex flex-col gap-y-4">
        {loading ? (
          <div className="h-full w-full flex justify-center items-center">
            <LoaderSmall />
          </div>
        ) : error ? (
          <p>Something went wrong</p>
        ) : data?.groupSeasonTopics?.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 gap-x-12">
            {data.groupSeasonTopics?.map((item: any, idx: number) => (
              <CustomLink
                key={idx}
                href={{
                  pathname: `${slugify(
                    router.query.season?.toString() || ""
                  )}/${slugify(item.topic.name)}/problems`,
                  query: {
                    seasonId: router.query.seasonId,
                    topicId: item.topic.id,
                  },
                }}
              >
                <div>
                  <TopicItem idx={idx} topic={item.topic} />
                </div>
              </CustomLink>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default StudentToicsPage;
