import React from "react";

export default function Timer(props) {
  const [h, setH] = React.useState(props.h);
  const [m, setM] = React.useState(props.m);
  const [s, setS] = React.useState(props.s);
  const [started, setStarted] = React.useState(false);
  const [saveH, setSaveH] = React.useState(props.h);
  const [saveM, setSaveM] = React.useState(props.m);
  const [saveS, setSaveS] = React.useState(props.s);
  const [history, setHistory] = React.useState([]);
  const startTimer = () => {
    setStarted(true);
    setHistory([
      "timer started: " +
        saveH.toString().padStart(2, "0") +
        ":" +
        saveM.toString().padStart(2, "0") +
        ":" +
        saveS.toString().padStart(2, "0"),
      ...history,
    ]);
  };
  const stopTimer = () => {
    setStarted(false);
    setHistory(["timer stopped.", ...history]);
  };
  const resetTimer = () => {
    setH(saveH);
    setM(saveM);
    setS(saveS);
    setStarted(false);
    setHistory(["timer reset.", ...history]);
  };
  React.useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        if (s === 0) {
          if (m === 0) {
            if (h === 0) {
              setH(0);
              setM(0);
              setS(0);
              setStarted(false);
              setHistory([
                "timer finished: " +
                  saveH.toString().padStart(2, "0") +
                  ":" +
                  saveM.toString().padStart(2, "0") +
                  ":" +
                  saveS.toString().padStart(2, "0"),
                ...history,
              ]);
            } else {
              setH(h - 1);
              setM(59);
              setS(59);
            }
          } else {
            setM(m - 1);
            setS(59);
          }
        } else {
          setS(s - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [started, h, m, s]);
  if (h < 0) {
    setH(0);
    setM(0);
    setS(0);
  }
  if (m < 0) {
    setM(m + 60);
    setH(h - 1);
  }
  if (s < 0) {
    setS(s + 60);
    setM(m - 1);
  }
  if (m > 59) {
    setM(m - 60);
    setH(h + 1);
  }
  if (s > 59) {
    setS(s - 60);
    setM(m + 1);
  }
  const setTime = (hr, min, sec) => {
    setH(hr);
    setM(min);
    setS(sec);
    setSaveH(hr);
    setSaveM(min);
    setSaveS(sec);
  };
  return (
    <div>
      <h1>Timer</h1>
      {h.toString().padStart(2, "0")}:{m.toString().padStart(2, "0")}:
      {s.toString().padStart(2, "0")}
      <br />
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
      <br />
      <button onClick={() => setTime(0, 30, 0)}>30 min</button>
      <button onClick={() => setTime(1, 0, 0)}>1 hr</button>
      <button onClick={() => setTime(2, 0, 0)}>2 hrs</button>
      <br />
      <button onClick={() => setTime(h, m + 1, s)}>+1 min</button>
      <button onClick={() => setTime(h, m - 1, s)}>-1 min</button>
      <button onClick={() => setTime(h, m + 15, s)}>+15 min</button>
      <button onClick={() => setTime(h, m - 15, s)}>-15 min</button>
      <button onClick={() => setTime(h + 1, m, s)}>+1 hr</button>
      <button onClick={() => setTime(h - 1, m, s)}>-1 hr</button>
      <br />
      <input
        type="number"
        value={h}
        onChange={(e) =>
          e.target.value > 0
            ? e.target.value < 99
              ? setTime(e.target.value, m, s)
              : setTime(99, m, s)
            : setTime(0, m, s)
        }
      />
      :
      <input
        type="number"
        value={m}
        onChange={(e) =>
          e.target.value > 0
            ? e.target.value < 59
              ? setTime(h, e.target.value, s)
              : setTime(h, 59, s)
            : setTime(h, 0, s)
        }
        min="0"
        max="59"
      />
      :
      <input
        type="number"
        value={s}
        onChange={(e) =>
          e.target.value > 0
            ? e.target.value < 59
              ? setTime(h, m, e.target.value)
              : setTime(h, m, 59)
            : setTime(h, m, 0)
        }
        min="0"
        max="59"
      />
      <br />
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}