import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { BsChevronContract, BsCheck2 } from "react-icons/bs";

type Props = {
  problems: AutoCompleteProblemsProps[];
  setSelected: (problem: AutoCompleteProblemsProps) => void;
  selected: AutoCompleteProblemsProps;
};
export type AutoCompleteProblemsProps = {
  id: number;
  title: string;
};
export default function AutoCompleteProblems({
  problems,
  setSelected,
  selected,
}: Props) {
  const [query, setQuery] = useState("");

  const filteredStudents =
    query === ""
      ? problems
      : problems.filter((problem) =>
          problem.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-full">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 z-40">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(problem: AutoCompleteProblemsProps) =>
                problem?.title
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronContract />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredStudents.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredStudents.map((problem) => (
                  <Combobox.Option
                    key={problem.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-[#e2e2e2] text-gray-700" : "text-gray-900"
                      }`
                    }
                    value={problem}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {problem.title}
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
}
