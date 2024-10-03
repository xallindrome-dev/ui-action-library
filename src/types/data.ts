import type { Paths } from "./literals";

export interface ColDefs<T> {
  key: Paths<T>;
  accessKey?: string;
  label?: string;
  header?: string;
  tooltip?: string;
  format?: (value?: string | number | boolean) => string;
  sortable?: boolean;
  RenderCell?: (props: T & ColDefs<T>, index?: number) => JSX.Element;
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}
