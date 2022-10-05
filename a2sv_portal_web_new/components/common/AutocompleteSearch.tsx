import React, { useState, useEffect, Fragment, useCallback } from "react";
import clsx from "clsx";
import { Combobox, Transition } from "@headlessui/react";
import { LoaderSmall } from "./Loaders";

type Props = {
  selectedTopic: any;
  setSelectedTopic: (val: any) => void;
  topics: any;
};

function AutoCompleteSearch({
  selectedTopic,
  setSelectedTopic,
  topics,
}: Props) {
  const [filteredTopics, setFilteredTopics] = useState<[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.trim() !== "") {
      const searchTopics = topics.filter((topic: any) => {
        console.log(query, " is topic".includes(""));
        return topic?.name.toLowerCase().includes(query.trim().toLowerCase());
      });
      setFilteredTopics(searchTopics);
    } else {
      setFilteredTopics(topics);
      setQuery("");
    }
  }, [query]);

  const handleSelect = (value: any) => {
    setSelectedTopic(value);
    setQuery("");
  };

  const handleSearch = (event: any) => {
    const text = event.target.value;
    if (text.trim() === "") {
      setFilteredTopics(topics);
    }
    setQuery(event.target.value.trim());
  };

  return (
    <div className="z-50 w-full flex justify-center py-2 text-blue-900 transition-all duration-500 ease-in">
      <div
        className={`block w-full col-span-1 mt-1 rounded-md ${
          query.trim() !== "" && filteredTopics.length > 1
            ? "bg-white"
            : "text-ivory-800"
        } `}
      >
        <Combobox value={selectedTopic} onChange={handleSelect}>
          <div
            className={`transition-all ease-in-out duration-300 w-full border border-ivory-600 flex flex-col flex-wrap rounded-md sm:text-sm text-ivory-800 ${
              query.trim() !== "" && filteredTopics.length > 1
                ? "bg-white text-ivory-800"
                : "bg-white text-ivory-800"
            }`}
          >
            <div
              className={clsx(
                "flex flex-wrap p-2 gap-1 rounded-md",
                query.trim() !== "" && filteredTopics.length > 1
                  ? "bg-white text-ivory-800"
                  : "bg-white text-ivory-800"
              )}
            >
              <div className="w-full flex items-center justify-between input text-ivory-800">
                <Combobox.Input
                  placeholder="Search for topic"
                  className="w-full py-2 bg-transparent border-none rounded-md outline-none text-ivory-800 font-cal focus:outline-none focus:ring-0 focus:border-transparent"
                  onChange={handleSearch}
                  displayValue={(topic: any) => topic && topic.name}
                />
              </div>
            </div>

            <Transition
              as={Fragment}
              show={query.trim() !== "" && filteredTopics.length > 0}
              enter="transition ease-out duration-100"
              enterFrom="opaTopic-0 translate-y-1"
              enterTo="opaTopic-100 translate-y-0"
              leave="transition ease-in-out duration-500"
              leaveFrom="opaTopic-100 translate-y-0"
              leaveTo="opaTopic-0 translate-y-1"
            >
              <div className={clsx("border-t overflow-auto py-5 h-[250px]")}>
                <Combobox.Options className="flex flex-col h-full p-1 overflow-auto gap-y-2">
                  {filteredTopics.map((topic: any, index) => (
                    <Combobox.Option
                      key={index}
                      value={topic}
                      className="px-5 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-900"
                    >
                      <div className="flex items-center justify-between">
                        <p>{topic.name}</p>
                        <span className="capitalize text-ivory-800">
                          {topic?.season?.name}
                        </span>
                      </div>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </div>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
}

export default AutoCompleteSearch;
