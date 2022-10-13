import { Fragment, useCallback, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { BsChevronContract, BsCheck2 } from "react-icons/bs";
import useAllProblems from "../../lib/hooks/useAllProblems";
import { ProblemDifficultyType } from "../../types/problems";
import { number } from "yup/lib/locale";
import CommonAutocomplete from "./CommonAutocomplete";

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
  link: string;
  platform: "Leetcode";
  tags: [
    {
      name: string;
      id: number;
    }
  ];
  updatedAt: string;
};

export default function AutoCompleteProblems({ handleSearchProblem }: Props) {
  const [query, setQuery] = useState("");
  const { loading, error, data } = useAllProblems();
  const [problems, setProblems] = useState<Array<ProblemType>>([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [filteredProblems, setFilteredProblems] = useState<Array<ProblemType>>(
    []
  );

  useEffect(() => {
    if (data) {
      setProblems(data?.problems);
      setFilteredProblems(data?.problems);
    }
  }, [data]);

  const handleFilterProblem = useCallback(() => {
    if (query === "") {
      setFilteredProblems([]);
      setSelectedProblem(null);
      handleSearchProblem(null);
    } else {
      const probData = problems.filter((problem: ProblemType) =>
        problem.title
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );
      if (probData.length < 1) {
        setSelectedProblem(null);
      }
      setFilteredProblems(() => probData);
    }
  }, [query, selectedProblem]);

  useEffect(() => {
    handleFilterProblem();
  }, [query]);

  const handleSelectProblem = (val: any) => {
    console.log(val, " is value");
    setSelectedProblem(val);
    handleSearchProblem(val);
    // setQuery(val.title)
  };

  const handleSearchQuery = (event: any) => {
    setQuery(event.target.value);
  };

  return (
    <CommonAutocomplete
      filteredValues={filteredProblems}
      handleSearchQuery={handleSearchQuery}
      handleSelectValue={handleSelectProblem}
      query={query}
      selectedValue={selectedProblem}
    />
  );
}
