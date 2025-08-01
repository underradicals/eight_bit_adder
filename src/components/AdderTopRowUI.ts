export function AdderTopRowUI({ col, a, b, ci }: { col: number, a: number, b: number, ci: number }) {
  return `
    <div class="top-labels">
      <p>A</p>
      <p>B</p>
      <p>CI</p>
    </div>
    <div class="top-values">
      <p id="button${col}c1">${a}</p>
      <p id="button${col}c2">${b}</p>
      <p id="button${col}c3">${ci}</p>
    </div>
  `;
}