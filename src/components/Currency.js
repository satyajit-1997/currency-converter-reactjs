import React, { useEffect, useState } from "react";

const BASE_URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=4e3716f153ee67fed90099a86d250e91";
const CONVERT_URL =
  "http://api.exchangeratesapi.io/v1/convert?access_key=4e3716f153ee67fed90099a86d250e91";
const Currency = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState();
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount * exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFrom(data.base);
        setTo(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(
    () => {
      if (from != null && to != null) {
        fetch("${CONVERT_URL}&FROM=${from}&to=${to}&amount=${amount}")
          .then((res) => res.json())
          .then((data) => setExchangeRate(data.rates[to]));
      }
    },
    [from],
    [to]
  );

  return (
    <div className="counter-comtainer">
      <div className="text-box">
        <div className="inputarea">
          <div className="navbar-container">
            <h2>CURRENCY CONVERTER</h2>
          </div>

          <div className="from">
            <input
              type={"number"}
              placeholder="enter amount"
              value={fromAmount}
              onChange={(e) => {
                setAmount(e.target.value);
                setAmountInFromCurrency(true);
              }}
            />
            <select
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
              }}
            >
              {currencyOptions.map((item) => (
                <option value={item} key={item + Math.random()}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <h1>=</h1>

          <div className="to">
            <input
              type={"number"}
              placeholder="enter amount"
              value={toAmount}
              onChange={(e) => {
                setAmount(e.target.value);
                setAmountInFromCurrency(false);
              }}
            />
            <select
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
              }}
            >
              {currencyOptions.map((item) => (
                <option key={item + Math.random()} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Currency;
