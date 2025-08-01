import AdderColumn from "@/components/AdderColumn";
import ReadoutColumn from "@/components/ReadoutColumn";
import { GlobalState } from "@/store";
import type { ColumnStateProps } from "@/types";
import { addToFragment, domFromString, DOMString, Fragment, RegisterComponent, select } from "@/utils";

const AdderColumnData = Array
  .from({ length: 8 }, () => 0)
  .map((_, index: number) => {
    return GlobalState[`col${index + 1}`]
  });

function handleDomContentLoadedEvent() {
  RegisterComponent(ReadoutColumn, null);
  AdderColumnData.reverse().forEach((x: string | number | ColumnStateProps | number[]) => {
    RegisterComponent(AdderColumn, x);
  });

  const domChildren = domFromString(DOMString.join(""));
  addToFragment(domChildren);
  select('.app').append(Fragment);
}

addEventListener('DOMContentLoaded', handleDomContentLoadedEvent);