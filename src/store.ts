import { ColumnState } from "./contracts";
import { type GlobalStateProps } from "./types";



export const GlobalState: GlobalStateProps = {
  col1: new ColumnState(1, 0, 0, 0, 0, 0),
  col2: new ColumnState(2, 0, 0, 0, 0, 0),
  col3: new ColumnState(3, 0, 0, 0, 0, 0),
  col4: new ColumnState(4, 0, 0, 0, 0, 0),
  col5: new ColumnState(5, 0, 0, 0, 0, 0),
  col6: new ColumnState(6, 0, 0, 0, 0, 0),
  col7: new ColumnState(7, 0, 0, 0, 0, 0),
  col8: new ColumnState(8, 0, 0, 0, 0, 0),
  Sum1: 0,
  Sum2: 0,
  Binary1: [0, 0, 0, 0, 0, 0, 0, 0],
  Binary2: [0, 0, 0, 0, 0, 0, 0, 0]
}