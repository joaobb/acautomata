import qs from "query-string";
import { useSearchParams } from "react-router-dom";

export const useSearchParamsFormatter = () => {
  const [searchParams] = useSearchParams();
  const parsedSearchParams = Object.fromEntries(searchParams);

  function formatSearchParams(key, value, preserve = []) {
    const searchQuery = {};
    preserve.forEach((key) => {
      if (parsedSearchParams[key]) searchQuery[key] = parsedSearchParams[key];
    });

    if (value !== null) searchQuery[key] = value;

    return qs.stringify(searchQuery);
  }

  return [formatSearchParams, parsedSearchParams];
};
