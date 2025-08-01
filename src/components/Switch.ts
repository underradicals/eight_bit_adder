export function Switch({ col, row }: { col: number, row: number }) {
  return `
    <div class="switch" data-name="${col}${row}">
      <div class="knob-lane">
        <button 
        class="btn" 
        type="button" 
        data-col="${col}"
        data-row="${row}" 
        data-target="button${col}c${row}"
        data-co="co${col}"
        data-sum="sum${col}"
        data-total="total${col}" data-totalBinary="totalBinary"></button>
      </div>
    </div>
  `;
}