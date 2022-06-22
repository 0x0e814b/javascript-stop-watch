const style = document.createElement('template');
style.innerHTML = `
  <style>
  .stopwatch {
    border: 1px solid #000;
    display: inline-flex;
    height: 300px;
  }
  
  .stopwatch-timer {
    padding: 1rem;
    width: 200px;
  }

  .stopwatch-header {
    border: 1px solid #000;
    margin-bottom: 1.5rem;
  }
  .stopwatch-header__display {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    margin: .3rem;
  }
  
  .stopwatch-laps {
    overflow: auto;
    padding: 1rem;
    box-sizing: border-box;
    border-left: 1px solid #000;
    height: 100%;
    width: 200px;
  }
  
  .stopwatch-laps ul {
    margin: 0;
    padding: 0;
  }
  
  .stopwatch-laps li {
    list-style: none;
    margin-bottom: 0.5rem;
    text-align: justify;
  }
  .stopwatch-laps li.is--slowest {
    color: red;
  }
  .stopwatch-laps li.is--fastest {
    color: green;
  }
  .stopwatch-buttons {
    display: flex;
    width: 100%;
    margin-bottom: 1rem;
    gap: .3rem;
  }
  
  .stopwatch-buttons button {
    flex: 1;
    border: 1px solid #000;
    background-color: #fff;
    cursor: pointer;
  }
  
  .stopwatch-buttons button:hover {
    background-color: #f4f4f4;
  }
  
  .stopwatch-buttons button:active {
    transform: translateY(1px);
  }
  </style>
`;

export default style;