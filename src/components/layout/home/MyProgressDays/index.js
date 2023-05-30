import { useEffect, useState } from "react";
import { WrapperMyProgressDays, MyProgressDaysContent, Days } from "./style";

function MyProgressDays({ percentage, workoutNumber }) {
  const [days, setDays] = useState([]);

  function getDays() {
    // get today year and month
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    var totalDays = [];

    const today = date.getDate();

    // mark days until today - 1
    // as green
    for (let index = 0; index < today; index++) {
      totalDays.push("btn_green");
    }

    // mark today as red
    totalDays[today] = "btn_red";

    // get number of days in month
    const numberOfDays = new Date(year, month, 0).getDate();

    // mark from today + 1
    // until number of days
    // in white
    for (let index = today + 1; index < numberOfDays; index++) {
      totalDays.push("btn_white");
    }
    setDays(totalDays);
  }

  useEffect(() => {
    getDays();
  }, []);

  return (
    <WrapperMyProgressDays>
      <MyProgressDaysContent>
        {days.map((value, index) => (
          <Days>
            <p className={`${value}`}>{index + 1}</p>
          </Days>
        ))}
      </MyProgressDaysContent>
    </WrapperMyProgressDays>
  );
}

export default MyProgressDays;
