function calendar(target) {
  const get = (selector) => target.querySelector(selector);
  const date = new Date();
  let selectedDay;

  const makeCalendar = (date) => {
    const currentYear = date.getFullYear();
    const currentMonthNum = date.getMonth() + 1;
    const currentMonthEng = date.toLocaleString("en-US", { month: "long" });

    const firstDay = new Date(date.setDate(1)).getDay();
    const lastDay = new Date(currentYear, currentMonthNum, 0).getDate();
    const limitDay = firstDay + lastDay;
    const nextDay = Math.ceil(limitDay / 7) * 7;

    let days = "";

    const prevMonth = date;
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    const prevMonthLastDate = new Date(
      prevMonth.getFullYear(),
      prevMonth.getMonth() + 1,
      0
    ).getDate();

    const nextMonth = date;
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    for (let i = 0; i < firstDay; i++) {
      const day = prevMonthLastDate - firstDay + i + 1;
      days += `<div class="remain">${day}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
      const selectedClass =
        selectedDay && selectedDay.innerText == i ? "selected" : "";

      if (new Date(currentYear, date.getMonth(), i).getDay() === 0) {
        days += `<div class="sunday day">${i}</div>`;
      } else if (
        new Date().toDateString() ===
        new Date(currentYear, date.getMonth(), i).toDateString()
      ) {
        days += `<div class="today day">${i}</div>`;
        if (!selectedDay) selectedDay = target.querySelector(".today");
      } else {
        days += `<div class="day">${i}</div>`;
      }
    }

    for (let i = limitDay; i < nextDay; i++) {
      const day = i - limitDay + 1;
      days += `<div class="remain">${day}</div>`;
    }

    get(".calendar-grid").innerHTML = days;
    get(".month-title").innerText = `${currentMonthEng}`;
    get(".year-title").innerText = `${currentYear}`;

    // 날짜 클릭 시 selectedDay에 해당 날짜를 저장
    const dayElements = target.querySelectorAll(".day");
    const $calendarCopy = document.querySelector(".calendarCopy");
    dayElements.forEach((dayElement) => {
      dayElement.addEventListener("click", () => {
        const year = currentYear;
        const month =
          currentMonthNum < 10 ? `0${currentMonthNum}` : currentMonthNum;
        const day =
          dayElement.innerText < 10
            ? `0${dayElement.innerText}`
            : dayElement.innerText;
        const dateStr = `${year}-${month}-${day}`;
        console.log(dateStr);
        selectedDay = dayElement;

        $calendarCopy.style.visibility = "hidden";

        //두 번째 calendar일 경우에만 input값 수정
        if (dayElement.closest(".calendarCopy")) {
          datePickerInput.value = dateStr;
        }

        const prevSelectedDay = target.querySelector(".selected");
        if (prevSelectedDay) {
          prevSelectedDay.classList.remove("selected");
        }
        selectedDay.classList.add("selected");
      });
    });
  };

  target.innerHTML = `
      <div class="calendar-nav">
        <div class="prevDay">◀</div>
        <p>
          <span class="month-title"></span><br />
          <span class="year-title"></span>
        </p>
        <div class="nextDay">▶</div>
      </div>
      <div class="week">
        <div>SUN</div>
        <div>MON</div>
        <div>TUE</div>
        <div>WED</div>
        <div>THU</div>
        <div>FRI</div>
        <div>SAT</div>
      </div>
      <div class="calendar-grid"></div>
  `;

  const prevDay = get(".prevDay");
  const nextDay = get(".nextDay");

  makeCalendar(date);
  prevDay.addEventListener("click", () => {
    makeCalendar(new Date(date.setMonth(date.getMonth() - 1)));
  });
  nextDay.addEventListener("click", () => {
    makeCalendar(new Date(date.setMonth(date.getMonth() + 1)));
  });
}

document.querySelectorAll(".calendar").forEach((calendarElement) => {
  calendar(calendarElement);
});

const datePicker = document.querySelector(".calendarCopy");
const datePickerInput = document.querySelector(".datePickerInput");

datePickerInput.addEventListener("click", () => {
  datePicker.style.visibility = "visible";
});

document.body.addEventListener("click", (event) => {
  if (event.target.closest(".calendar") || event.target === datePickerInput) {
    return;
  }
  datePicker.style.visibility = "hidden";
});

export default calendar;
