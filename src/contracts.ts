import type { ColumnStateProps } from "./types";
import { And, Or, Xor } from "./utils";

export class DOMNodes {
  constructor(
    public Wire: HTMLElement,
    public CarryOut: HTMLElement,
    public SumWire: HTMLElement,
    public BitNumber: HTMLElement,
    public AdjacentCarryIn: HTMLElement | null,
    public AdjacentSum: HTMLElement | null,
    public AdjacentNumber: HTMLElement | null,
    public BottomRowDecimalTotal: HTMLElement,
    public BottomRowBinaryTotal: HTMLElement,
    public TopRowDecimalTotal: HTMLElement,
    public RowTwoDecimalTotal: HTMLElement,
    public TopRowBinaryTotal: HTMLElement,
    public RowTwoBinaryTotal: HTMLElement
  ) { }
}

export class LocalState {
  constructor(
    public col: number,
    public row: string,
    public state: ColumnStateProps,
    public nextState: ColumnStateProps
  ) { }
}

export class DerivedState {
  constructor(
    public TopRowBinaryNumber: string,
    public RowTwoBinaryNumber: string,
    public TopRowDecimal: number,
    public RowTwoDecimal: number,
    public BottomRowDecimal: number,
    public BottomBinaryNumber: string
  ) { }
}

export class ColumnState implements ColumnStateProps {
  constructor(
    public col: number,
    public a: number,
    public b: number,
    public ci: number,
    public co: number,
    public sum: number
  ) {
    this.col = col;
    this.a = a;
    this.b = b;
    this.ci = ci;
    this.co = co;
    this.sum = sum;
  }

  __halfAdder(a: number, b: number) {
    return {
      sum: Xor(a, b),
      co: And(a, b)
    }
  }

  FullAdder(a: number, b: number, ci: number) {
    const f1 = Xor(a, b);
    const S = Xor(f1, ci);
    const carryBlock = And(f1, ci);
    const and2 = And(a, b);
    const cout = Or(carryBlock, and2);

    return {
      sum: S,
      co: cout
    }
  }

  setA(value: number) {
    this.a = value;
    const o = this.FullAdder(this.a, this.b, this.ci);
    this.co = o.co;
    this.sum = o.sum;
  }

  setB(value: number) {
    this.b = value;
    const o = this.FullAdder(this.a, this.b, this.ci);
    this.co = o.co;
    this.sum = o.sum;
  }

  setCarryIn(value: number) {
    this.ci = value;
    const o = this.FullAdder(this.a, this.b, this.ci);
    this.co = o.co;
    this.sum = o.sum;
  }
}