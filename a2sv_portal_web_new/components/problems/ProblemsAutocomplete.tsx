import { Fragment, useCallback, useEffect, useState } from "react";
import useAllProblems from "../../lib/hooks/useAllProblems";
import { ProblemDifficultyType, ProblemType } from "../../types/problems";
import CommonAutocomplete from "../common/CustomAutocomplete";

type Props = {
  handleSearchProblem: (selected: any) => void;
};
export type AutoCompleteProblemsProps = {
  id: number;
  title: string;
};


export default function ProblemsAutocomplete({ handleSearchProblem }: Props) {
  const [query, setQuery] = useState("");
  const { loading, error, data } = useAllProblems();
  const [problems, setProblems] = useState<Array<ProblemType>>([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [filteredProblems, setFilteredProblems] = useState<Array<ProblemType>>(
    []
  );

  useEffect(() => {
    if (data) {
      setProblems(data?.problems?.items);
      setFilteredProblems(data?.problems?.items);
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
    setSelectedProblem(val);
    handleSearchProblem(val);
    // setQuery(val.title)
  };

  const handleSearchQuery = (event: any) => {
    setQuery(event.target.value);
  };

  return (
    <CommonAutocomplete
      placeholder="Search existing problems"
      filteredValues={filteredProblems}
      handleSearchQuery={handleSearchQuery}
      handleSelectValue={handleSelectProblem}
      query={query}
      selectedValue={selectedProblem}
    />
  );
}
