const template = document.createElement('template');
template.innerHTML = `
  <div class="stopwatch">
    <div class="stopwatch-timer">
      <header class="stopwatch-header">
        <p class="stopwatch-header__display">00:000</p>
      </header>
      <section class="stopwatch-container">
        <div class="stopwatch-buttons">
          <button type="button" data-action="start">시작</button>
        </div>
        <div class="stopwatch-buttons">
          <button type="button" data-action="laps">랩</button>
          <button type="button" data-action="stop">멈춤</button>
          <button type="button" data-action="reset">초기화</button>
        </div>
        <div class="stopwatch-buttons">
          <button type="button" data-action="reset">초기화</button>
          <button type="button" data-action="start">재시작</button>
        </div>
      </section>
    </div>
    <div class="stopwatch-laps">
      <ul class="stopwatch-laps__area"></ul>
    </div>
  </div>
`;

export default template;