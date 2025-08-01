
export function AdderBottomRowUI({ col, co, sum }: { col: number, co: number, sum: number }) {
  return `
  <div class="bottom-values">
    <p ${col === 8 ? '' : `data-target="button${col + 1}c3"`} id="co${col}">${co}</p>
    <p></p>
    <p id="sum${col}">${sum}</p>
  </div>
  <div class="bottom-labels">
    <p>CO</p>
    <p></p>
    <p>Sum</p>
  </div>
  `;
}