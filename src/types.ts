export interface ColumnStateProps {
  col: number,
  a: number,
  b: number,
  ci: number,
  co: number,
  sum: number,
  setA(value: number): void;
  setB(value: number): void;
  setCarryIn(value: number): void;
  FullAdder(a: number, b: number, ci: number): { co: number, sum: number }
}

export type GlobalStateProps = {
  col1: ColumnStateProps;
  col2: ColumnStateProps;
  col3: ColumnStateProps;
  col4: ColumnStateProps;
  col5: ColumnStateProps;
  col6: ColumnStateProps;
  col7: ColumnStateProps;
  col8: ColumnStateProps;
  Sum1: number;
  Sum2: number;
  Binary1: number[];
  Binary2: number[];
  [index: string | number]: ColumnStateProps | number | string | number[];
}





