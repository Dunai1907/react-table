import {
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
} from "react-table";

export type GlobalFilterT<T extends object> = (
  props: Partial<UseGlobalFiltersOptions<T> & UseGlobalFiltersInstanceProps<T>>
) => JSX.Element;
