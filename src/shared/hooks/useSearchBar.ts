import { useCallback, useState } from "react";
import { format } from "date-fns";

interface UseSearchBarProps<T> {
  filterBySearchBar: (listItems: T[]) => T[];
  search: string;
  handleSearch: (e?: string) => void;
  handleErase: () => void;
}

export default function useSearchBar<T extends { [key: string]: any }>(
  searchParams: string[] = [],
  dateFormat = "dd/MM/yyyy",
): UseSearchBarProps<T> {
  const [search, setSearch] = useState("");

  const buildValue = useCallback(
    (value?: string): string => {
      if (typeof value === "string" && value.includes("-")) {
        const rest = value.split("").filter((s) => s !== "-");
        const hasLetters = rest.some((s) => Number.isNaN(s));
        const numberDash = value.split("").filter((s) => s === "-");

        if (!hasLetters && numberDash.length === 2) {
          return format(new Date(value), dateFormat);
        }
      }

      if (typeof value === "string" || typeof value === "number") {
        return value.toString().toLowerCase();
      }

      return "";
    },
    [dateFormat],
  );

  const filterParam = useCallback(
    (searchValue: string, item: T, param: string): boolean => {
      let newItem = buildValue(item[param]);

      if (param.includes(".")) {
        const [firstParam, secondParam] = param.split(".");

        newItem = buildValue(item?.[firstParam]?.[secondParam]);
      }

      return newItem.includes(searchValue.toLowerCase());
    },
    [buildValue],
  );

  const checkParams = useCallback(
    (item: T, params: string[]): boolean => {
      if (params.length === 0) return false;

      return params.some((param) => filterParam(search, item, param));
    },
    [filterParam, search],
  );

  const filterBySearchBar = useCallback(
    (listItems: T[]): T[] => {
      return listItems.filter((item) => checkParams(item, searchParams));
    },
    [checkParams, searchParams],
  );

  const handleSearch = (e?: string): void => setSearch(e || "");

  const handleErase = (): void => setSearch("");

  return { filterBySearchBar, search, handleErase, handleSearch };
}
