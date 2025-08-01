export default function ReadoutColumn() {
  return `
    <section class="column column-9">
      <div class="row row-1">
        <p>0</p>
        <p>00000000</p>
      </div>
      <div class="row row-2">
        <p>0</p>
        <p>00000000</p>
      </div>
      <div class="row row-3">
        <p>+</p>
      </div>
      <div class="row row-4">
        <p>0</p>
        <p id="totalBinary">00000000</p>
      </div>
    </section>
  `
}