import type { ColumnStateProps } from "@/types";
import { Switch } from "./Switch";
import { AdderTopRowUI } from "./AdderTopRowUI";
import { AdderBottomRowUI } from "./AdderBottomRowUI";

export default function AdderColumn({ col, a, b, ci, co, sum }: ColumnStateProps) {
  return `
    <section class="column column-${col}">
      <div class="row row-1">
        ${Switch({ col: col, row: 1 })}
      </div>
      <div class="row row-2">
        ${Switch({ col: col, row: 2 })}
      </div>
      <div class="row row-3">
        ${AdderTopRowUI({ col: col, a: a, b: b, ci: ci })}
        <div class="column-name">
          <span>Adder ${col}</span>
        </div>
        ${AdderBottomRowUI({ col: col, co: co, sum: sum })}
      </div>
      <div class="row row-4 total">
        <p id="total${col}">${Math.pow(2, col - 1)}</p>
      </div>
    </section> `;
}