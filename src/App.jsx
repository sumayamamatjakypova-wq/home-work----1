
import { useState, useEffect } from "react";
import "./App.css";

const INITIAL_COUNT = 60;

function App() {
  const [count, setCount] = useState(INITIAL_COUNT);
  const [step, setStep] = useState("");
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (count === 0) {
      setIsRunning(false);
    }
  }, [count]);

  useEffect(() => {
    if (!isRunning || count === 0) {
      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, count]);

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value === "" || /^\d+$/.test(value)) {
      setStep(value);
    }
  };

  const handleDecrease = () => {
    const amount = Number(step);

    if (step === "" || amount <= 0 || !Number.isFinite(amount)) {
      return;
    }

    setCount((prev) => Math.max(prev - amount, 0));
    setStep("");
  };

  const handleToggle = () => {
    if (count > 0) {
      setIsRunning((prev) => !prev);
    }
  };

  const handleReset = () => {
    setCount(INITIAL_COUNT);
    setStep("");
    setIsRunning(false);
  };

  return (
    <div className="timer">
      <h1>Таймер обратного отсчёта</h1>

      <div className="count">{count}</div>

      <p className="status">
        {count === 0
          ? "Время закончилось"
          : isRunning
          ? "Таймер работает"
          : "Таймер на паузе"}
      </p>

      <div className="input-group">
        <input
          type="number"
          min="1"
          value={step}
          onChange={handleInputChange}
          placeholder="Введите число"
          disabled={count === 0}
        />

        <button
          onClick={handleDecrease}
          disabled={count === 0 || step === "" || Number(step) <= 0}
        >
          Уменьшить
        </button>
      </div>

      <div className="buttons">
        <button onClick={handleToggle} disabled={count === 0}>
          {isRunning ? "Пауза" : "Старт"}
        </button>

        <button onClick={handleReset}>
          Сброс
        </button>
      </div>
    </div>
  );
}

export default App;
