import { GlobalFilterT } from "@/types";
import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { TableData } from "../../Table";

export const GlobalFilter: GlobalFilterT<TableData> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows?.length;
  const [value, setValue] = useState(globalFilter as string);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter?.(value || undefined);
  }, 250);

  return (
    <label>
      Search:{" "}
      <input
        type="text"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </label>
  );
};
