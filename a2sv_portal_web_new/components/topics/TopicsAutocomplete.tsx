import React, { useState, useEffect, Fragment, useCallback } from "react";
import CommonAutocomplete from "../common/CustomAutocomplete";
import { useGetAllTopics } from "../../lib/hooks/useTopics";

type Props = {
  handleSearchTopic: (selected: any) => void;
};
export type TopicType = {
  id: number;
  name: string;
};
const TopicsAutocomplete = ({ handleSearchTopic }: Props) => {
  const [query, setQuery] = useState("");
  const { loading, data, error } = useGetAllTopics();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [filteredTopics, setFilteredTopics] = useState<TopicType[]>([]);

  useEffect(() => {
    if (query.trim() !== "") {
      const searchTopics = data?.topics.filter((topic: TopicType) => {
        console.log(query, " is topic".includes(""));
        return topic?.name.toLowerCase().includes(query.trim().toLowerCase());
      });
      setFilteredTopics(searchTopics);
    } else {
      setFilteredTopics(data?.topics);
      setQuery("");
      setSelectedTopic(null);
      handleSearchTopic(null)
    }
  }, [query]);

  const handleSelect = (value: any) => {
    setSelectedTopic(value);
    handleSearchTopic(value);
    // setQuery("");
  };

  const handleSearchQuery = (event: any) => {
    // const text = event.target.value;
    // if (text.trim() === "") {
    //   setFilteredTopics(data?.topics);
    // }
    setQuery(event.target.value.trim());
  };

  return (
    <CommonAutocomplete
      placeholder="Search existing topics"
      query={query}
      filteredValues={filteredTopics}
      selectedValue={selectedTopic}
      handleSelectValue={handleSelect}
      handleSearchQuery={handleSearchQuery}
    />
  );
};

export default TopicsAutocomplete;
