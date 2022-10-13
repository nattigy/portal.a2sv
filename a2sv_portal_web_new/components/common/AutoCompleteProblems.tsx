import { Fragment, useCallback, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { BsChevronContract, BsCheck2 } from "react-icons/bs";
import useAllProblems from "../../lib/hooks/useAllProblems";
import { ProblemDifficultyType } from "../../types/problems";
import { number } from "yup/lib/locale";

type Props = {
  handleSearchProblem: (selected: any) => void;
};
export type AutoCompleteProblemsProps = {
  id: number;
  title: string;
};

export type ProblemType = {
  id: number;
  title: string;
  createdAt: string;
  difficulty: ProblemDifficultyType;
  link: string,
  platform: "Leetcode",
  tags: [
    {
      name: string,
      id: number,
    }],
  updatedAt: string,
}

export default function AutoCompleteProblems({
  handleSearchProblem
}: Props) {
  const [query, setQuery] = useState("");
  const { loading, error, data } = useAllProblems();
  const [problems, setProblems] = useState<Array<ProblemType>>([])
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [filteredProblems, setFilteredProblems] = useState<Array<ProblemType>>([])

  useEffect(() => {
    if (data) {
      setProblems(data?.problems)
      setFilteredProblems(data?.problems)
    }
  }, [data])

  const handleFilterProblem = useCallback(
    () => {
      if (query === "") {
        setFilteredProblems([])
        setSelectedProblem(null)
        handleSearchProblem(null)
      } else {
        const probData = problems.filter((problem: ProblemType) =>
          problem.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )
        if (probData.length < 1) {
          setSelectedProblem(null)
        }
        setFilteredProblems(() => probData)
      }
    },
    [query, selectedProblem],
  )

  useEffect(() => {
    handleFilterProblem()
  }, [query])

  const handleSelectProblem = (val: any) => {
    console.log(val, " is value")
    setSelectedProblem(val)
    handleSearchProblem(val)
    // setQuery(val.title)
  }

  const handleSearchQuery = (event: any) => {
    setQuery(event.target.value)
  }


  return (
    <div className="w-full">
      <Combobox value={selectedProblem} onChange={handleSelectProblem}>
        <div className="relative m-1 z-40">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              placeholder="Search Existing Problems"
              className="w-full border-none focus:ring-0 focus:outline-none focus px-1 py-3 pl-3 pr-10 text-sm leading-5 text-gray-900 border"
              displayValue={(problem: ProblemType) =>
                problem?.title
              }
              onChange={handleSearchQuery}
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
              {filteredProblems.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredProblems.map((problem: ProblemType) => (
                  <Combobox.Option
                    key={problem.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-[#e2e2e2] text-gray-700" : "text-gray-900"
                      }`
                    }
                    value={problem}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          {problem.title}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-[#5956E9]"
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
