// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [currOne, setCurrOne] = useState("EUR");
  const [currTwo, setCurrTwo] = useState("USD");
  const [currData, setCurrData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchCurrency() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${currOne}&to=${currTwo}`
          );
          const data = await res.json();
          setCurrData(data.rates[currTwo]);
          setIsLoading(false);
        } catch {
          console.log("Error while loading data");
        }
      }
      if (currOne === currTwo) return setCurrData(amount);
      fetchCurrency();
    },
    [amount, currOne, currTwo]
  );
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setAmount(Number(e.target.value))}
        value={amount}
        disabled={isLoading}
      />
      <select
        onChange={(e) => setCurrOne(e.target.value)}
        value={currOne}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        onChange={(e) => setCurrTwo(e.target.value)}
        value={currTwo}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT:{currData}</p>
    </div>
  );
}
