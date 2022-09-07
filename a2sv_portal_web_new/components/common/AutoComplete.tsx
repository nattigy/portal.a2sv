import { useState } from "react";

type Props = {
  suggestions: string[];
  name: string;
  className: string;
  placeholder?: string;
  id: string;
};

export const omitObjectEntries = (obj: any, keys: string[]) => {
  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    if (!keys.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

const AutoComplete = (props: Props) => {
  const suggestions = props.suggestions;
  const properties = omitObjectEntries(props, ["suggestions"]);

  const [filteredSuggestions, setFilteredSuggestions] = useState<Array<string>>(
    []
  );
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  const onChange = (e: any) => {
    const userInput = e.target.value;

    const unLinked = suggestions.filter(
      (suggestion: string) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClick = (e: any) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="w-full max-h-[250px] absolute z-40 suggestions bg-white shadow-2xl border border-gray-300 rounded-b-lg  overflow-auto">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li
              className={`p-2 hover:bg-gray-100 cursor-pointer ${className}`}
              key={suggestion}
              onClick={onClick}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>No suggestions!</em>
      </div>
    );
  };

  return (
    <div className="relative">
      <input
        type="text"
        onChange={onChange}
        value={input}
        autoComplete="address-level2"
        {...props}
        {...properties}
        className="block w-full mt-1 rounded-md shadow-sm border-ivory-600 text-ivory-800 focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
      />
      {showSuggestions && input && <SuggestionsListComponent />}
    </div>
  );
};
export default AutoComplete;
