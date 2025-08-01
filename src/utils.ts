import { DerivedState, DOMNodes, LocalState } from "./contracts";
import { GlobalState } from "./store";
import type { ColumnStateProps } from "./types";

export const Fragment = new DocumentFragment();
export const Parser = new DOMParser();
export const DOMString: string[] = [];

export function animateSwitchButton(target: HTMLElement) {
  const knobLane = target.parentElement as HTMLElement;
  const height = knobLane?.clientHeight as number;
  const width = knobLane?.clientWidth as number;
  target.style.setProperty('--intrinsicValue', (height - width) + 'px');
  target.classList.toggle('bottom');
  target.parentElement?.parentElement?.classList.toggle('switch-on');
}

export const select = (selector: string): HTMLElement => document.querySelector(selector) as HTMLElement;

export const selectFrom = (selector: string, parent: HTMLElement): HTMLElement => parent.querySelector(selector) as HTMLElement;

export const domFromString = (htmlString: string) => htmlString === undefined || htmlString === null
  ? [document.createElement("div")]
  : [...Parser.parseFromString(htmlString, "text/html").body.children] as HTMLElement[];

export const addToFragment = (array: HTMLElement[]) => array.forEach((x: HTMLElement) => {
  Fragment.appendChild(x);
});

export function RegisterComponent(func: Function, state: any) {
  if (state === null || state === undefined) {
    DOMString.push(func())
    return;
  }
  DOMString.push(func(state));
}


export function registerDomNodes(target: HTMLElement) {
  const el = select(`#${target.dataset.target}`);
  const carryOut = select(`#${target.dataset.co}`);
  const sumWire = select(`#${target.dataset.sum}`);
  const totalNum = select(`#${target.dataset.total}`);
  const nextCarryIn =
    carryOut === null ? null : select(`#${carryOut.dataset.target}`);
  const bottomValues =
    nextCarryIn === null
      ? null
      : (nextCarryIn.parentElement?.nextElementSibling
        ?.nextElementSibling as HTMLElement);
  const nextSum = bottomValues?.lastElementChild as HTMLElement;
  const nextNumber = bottomValues?.parentElement?.nextElementSibling
    ?.firstElementChild as HTMLElement;

  const total = select(".column-9 .row-4 p");
  const totalBinaryNumber = select(".column-9 .row-4 p:last-child");
  const decimal1 = select(".column-9 .row-1 p:first-child");
  const array1 = select(".column-9 .row-1 p:last-child");
  const decimal2 = select(".column-9 .row-2 p:first-child");
  const array2 = select(".column-9 .row-2 p:last-child");

  return new DOMNodes(
    el,
    carryOut,
    sumWire,
    totalNum,
    nextCarryIn,
    nextSum,
    nextNumber,
    total,
    totalBinaryNumber,
    decimal1,
    decimal2,
    array1,
    array2
  );
}



export function getState(target: HTMLElement) {
  const col = parseInt(target.dataset.col as string) as number;
  const row = target.dataset.row as string;
  const state = GlobalState[`col${col}`] as ColumnStateProps;
  const nextState = GlobalState[
    `col${col === 8 ? 8 : col + 1}`
  ] as ColumnStateProps;

  return new LocalState(col, row, state, nextState);
}

export function computeDerivedState() {
  const binary1 = [...GlobalState.Binary1].reverse().join("");
  const binary2 = [...GlobalState.Binary2].reverse().join("");
  const sum1 = parseInt(binary1, 2);
  const sum2 = parseInt(binary2, 2);
  const totalSum = sum1 + sum2;
  let totalBinaryString = totalSum.toString(2) as string;

  return new DerivedState(binary1, binary2, sum1, sum2, totalSum, totalBinaryString);
}

export function setLocalState(localState: LocalState) {
  if (localState.row === "1") {
    localState.state.setA(localState.state.a === 0 ? 1 : 0);
    GlobalState.Binary1[localState.col - 1] = localState.state.a;
  }

  if (localState.row === "2") {
    localState.state.setB(localState.state.b === 0 ? 1 : 0);
    GlobalState.Binary2[localState.col - 1] = localState.state.b;
  }

  localState.nextState.setCarryIn(localState.state.co);
}

export function mapDomToLocalState(domNodes: DOMNodes, localState: LocalState) {
  domNodes.Wire.textContent = localState.row === "1" ? localState.state.a.toString() : localState.state.b.toString();
  domNodes.CarryOut.textContent = localState.state.co.toString();
  domNodes.SumWire.textContent = localState.state.sum.toString();
  if (domNodes.AdjacentCarryIn) {
    domNodes.AdjacentCarryIn.textContent = localState.nextState.ci.toString();
  }
  if (domNodes.AdjacentSum) {
    domNodes.AdjacentSum.textContent = `${localState.nextState.sum}`;
  }
}

export function mapDomToDerivedState(domNodes: DOMNodes, derivedState: DerivedState) {
  domNodes.TopRowBinaryTotal.textContent = derivedState.TopRowBinaryNumber;
  domNodes.RowTwoBinaryTotal.textContent = derivedState.RowTwoBinaryNumber;
  domNodes.TopRowDecimalTotal.textContent = derivedState.TopRowDecimal.toString();
  domNodes.RowTwoDecimalTotal.textContent = derivedState.RowTwoDecimal.toString();
  domNodes.BottomRowDecimalTotal.textContent = derivedState.BottomRowDecimal.toString();
  domNodes.BottomRowBinaryTotal.textContent = derivedState.BottomBinaryNumber.padStart(8, "0");
}

export function mutateStylesState(localState: LocalState, domNodes: DOMNodes) {
  if (localState.state.sum === 1) {
    domNodes.BitNumber.style.setProperty("--text-color", "yellow");
  } else {
    domNodes.BitNumber.style.setProperty("--text-color", "#3a3a3a");
  }

  if (localState.nextState.sum === 1 && domNodes.AdjacentNumber) {
    domNodes.AdjacentNumber.style.setProperty("--text-color", "yellow");
  } else if (domNodes.AdjacentNumber) {
    domNodes.AdjacentNumber.style.setProperty("--text-color", "#3a3a3a");
  }
}

export function And(a: number, b: number) {

  if (a > 1 || b > 1) throw new Error("Values must be 0 or 1");

  if (a && b) {
    return 1;
  }
  return 0;
}

export function Or(a: number, b: number) {

  if (a > 1 || b > 1) throw new Error("Values must be 0 or 1");

  if (a || b) {
    return 1;
  }
  return 0;
}


export function Xor(a: number, b: number) {

  if (a > 1 || b > 1) throw new Error("Values must be 0 or 1");

  if (a !== b) {
    return 1;
  }
  return 0;
}