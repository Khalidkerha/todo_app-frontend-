import "./calculator.css";
import button_icon from "./assets/icon-arrow.svg";
import { useState } from "react";

function Calculator() {
  const [borderDay, setBorderDay] = useState("hsl(0, 0%, 86%)");
  const [borderMonth, setBorderMonth] = useState("hsl(0, 0%, 86%)");
  const [borderYear, setBorderYear] = useState("hsl(0, 0%, 86%)");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const changeBorderColor = (setBorder) => () => {
    setBorder((prevBorder) =>
      prevBorder === "hsl(0, 0%, 86%)" ? "hsl(259, 100%, 65%)" : "hsl(0, 0%, 86%)"
    );
  };

  const handleInput1 = (event) => {
    setInput1(event.target.value);
  };

  const handleInput2 = (event) => {
    setInput2(event.target.value);
  };

  const handleInput3 = (event) => {
    setInput3(event.target.value);
  };

  const calculate_button = () => {
    const warning1 = document.querySelector(".warning1");
    const warning2 = document.querySelector(".warning2");
    const warning3 = document.querySelector(".warning3");
    const unitDay = document.getElementById("day_label");
    const unitMonth = document.getElementById("month_label");
    const unitYear = document.getElementById("year_label");

    let isValid = true;

    if (input1 === "") {
      setBorderDay("hsl(0, 100%, 67%)");
      unitDay.style.color = "hsl(0, 100%, 67%)";
      warning1.innerHTML = "This input is required";
      warning1.style.display = "block";
      isValid = false;
    } else if (input1 > 31 || input1 < 1) {
      setBorderDay("hsl(0, 100%, 67%)");
      unitDay.style.color = "hsl(0, 100%, 67%)";
      warning1.innerHTML = "Must be a valid day";
      warning1.style.display = "block";
      isValid = false;
    } else {
      warning1.style.display = "none";
      unitDay.style.color = "";
      setBorderDay("hsl(0, 0%, 86%)");
    }

    if (input2 === "") {
      setBorderMonth("hsl(0, 100%, 67%)");
      unitMonth.style.color = "hsl(0, 100%, 67%)";
      warning2.innerHTML = "This input is required";
      warning2.style.display = "block";
      isValid = false;
    } else if (input2 > 12 || input2 < 1) {
      setBorderMonth("hsl(0, 100%, 67%)");
      unitMonth.style.color = "hsl(0, 100%, 67%)";
      warning2.innerHTML = "Must be a valid month";
      warning2.style.display = "block";
      isValid = false;
    } else {
      warning2.style.display = "none";
      unitMonth.style.color = "";
      setBorderMonth("hsl(0, 0%, 86%)");
    }

    if (input3 === "") {
      setBorderYear("hsl(0, 100%, 67%)");
      unitYear.style.color = "hsl(0, 100%, 67%)";
      warning3.innerHTML = "This input is required";
      warning3.style.display = "block";
      isValid = false;
    } else if (input3 > 2024) {
      setBorderYear("hsl(0, 100%, 67%)");
      unitYear.style.color = "hsl(0, 100%, 67%)";
      warning3.innerHTML = "Must be in the past";
      warning3.style.display = "block";
      isValid = false;
    } else {
      warning3.style.display = "none";
      unitYear.style.color = "";
      setBorderYear("hsl(0, 0%, 86%)");
    }

    // Additional logic for calculation if all inputs are valid
    if (isValid) {
      // Perform the calculation here
      console.log("Performing calculation with:", input1, input2, input3);
    }
  };

  return (
    <>
      <div className="container">
        <div className="inputs_container">
          <div className="input_label">
            <label htmlFor="day" id="day_label">DAY</label>
            <input
              placeholder="DD"
              type="number"
              id="day"
              onFocus={changeBorderColor(setBorderDay)}
              onBlur={changeBorderColor(setBorderDay)}
              onChange={handleInput1}
              style={{ borderColor: borderDay }}
            />
            <p className="warning warning1"></p>
          </div>
          <div className="input_label">
            <label htmlFor="month" id="month_label">MONTH</label>
            <input
              placeholder="MM"
              type="number"
              id="month"
              onFocus={changeBorderColor(setBorderMonth)}
              onBlur={changeBorderColor(setBorderMonth)}
              onChange={handleInput2}
              style={{ borderColor: borderMonth }}
            />
            <p className="warning warning2"></p>
          </div>
          <div className="input_label">
            <label htmlFor="year" id="year_label">YEAR</label>
            <input
              placeholder="YYYY"
              type="number"
              id="year"
              onFocus={changeBorderColor(setBorderYear)}
              onBlur={changeBorderColor(setBorderYear)}
              onChange={handleInput3}
              style={{ borderColor: borderYear }}
            />
            <p className="warning warning3"></p>
          </div>
        </div>
        <div className="button_cont">
          <div className="line"></div>
          <button onClick={calculate_button}>
            <img src={button_icon} alt="" className="icon_button" />
          </button>
        </div>
        <div className="result">
          <h1>
            <span>
              <div></div> <div></div>
            </span>
            years
          </h1>
          <h1>
            <span>
              <div></div> <div></div>
            </span>
            months
          </h1>
          <h1>
            <span>
              <div></div> <div></div>
            </span>
            days
          </h1>
        </div>
      </div>
    </>
  );
}

export default Calculator;
