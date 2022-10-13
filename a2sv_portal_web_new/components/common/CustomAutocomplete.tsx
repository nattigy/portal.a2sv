import { Combobox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BsCheck2, BsChevronContract } from "react-icons/bs";
import { ProblemType } from "../problems/ProblemsAutocomplete";
import { TopicType } from "../topics/TopicsAutocomplete";
import { UserType } from "../users/HOEAutocomplete";

type Props = {
  selectedValue: any;
  query: string;
  handleSearchQuery: (event: any) => void;
  handleSelectValue: (event: any) => void;
  filteredValues: Array<ProblemType | TopicType | UserType>;
};

const CustomAutocomplete = (props: Props) => {
  return (
    <div className="w-full">
      <Combobox value={props.selectedValue} onChange={props.handleSelectValue}>
        <div className="relative m-1 z-40">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              placeholder="Search existig Problems"
              className="w-full border-none focus:ring-0 focus:outline-none focus px-1 py-3 pl-3 pr-10 text-sm leading-5 text-gray-900 border"
              displayValue={(value: any) =>
                value?.name || value?.title || value?.email
              }
              onChange={props.handleSearchQuery}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronContract />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            // afterLeave={
            //   () => {
            //     if (!selectedProblem) {
            //       setQuery("")
            //     }
            //   }
            // }
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {props.filteredValues?.length === 0 && props.query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                props.filteredValues?.map((value: any) => (
                  <Combobox.Option
                    key={value.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-[#e2e2e2] text-gray-700" : "text-gray-900"
                      }`
                    }
                    value={value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {value.name || value.title || value.email}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-[#5956E9]"
                            }`}
                          >
                            <BsCheck2 />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default CustomAutocomplete;
