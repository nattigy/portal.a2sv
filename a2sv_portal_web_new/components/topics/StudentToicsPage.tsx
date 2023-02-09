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
    authUser.headToGroup?.id || ""
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5">
      {loading ? (
        <div className="h-full w-full flex justify-center items-center">
          <LoaderSmall />
        </div>
      ) : error ? (
        <p>Something went wrong</p>
      ) : data.groupSeasonTopics?.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 gap-x-12">
          {data.groupSeasonTopics?.map((item: any, idx: number) => (
            <CustomLink
            key={idx}
              href={{
                pathname: `${slugify(
                  router.query.season?.toString() || ""
                )}/topics/${slugify(item.topic.name)}/problems`,
                query: {
                  seasonId: router.query.seasonId,
                  topicId: item.topic.id,
                },
              }}
            >
              <TopicItem idx={idx} topic={item.topic} key={idx} />
            </CustomLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentToicsPage;
