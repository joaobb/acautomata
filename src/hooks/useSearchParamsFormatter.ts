import qs from "query-string";
import { useSearchParams } from "react-router-dom";

export const useSearchParamsFormatter = () => {
  const [searchParams] = useSearchParams();
  const parsedSearchParams = Object.fromEntries(searchParams);

  function formatSearchParams(
    key: string,
    value: string | number,
    preserve?: string[]
  ) {
    const searchQuery: { [key: string]: any } = {};
    preserve?.forEach((key) => {
      if (parsedSearchParams[key]) searchQuery[key] = parsedSearchParams[key];
    });

    if (value !== null) searchQuery[key] = value;

    return qs.stringify(searchQuery);
  }

  return [formatSearchParams, parsedSearchParams];
};
