class TimeOS {
  constructor() {
    if (arguments.length === 0) {
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
    } else if (arguments.length === 1) {
      if (
        arguments[0] instanceof Date &&
        typeof arguments[0].getMonth === "function"
      ) {
        this.hours = arguments[0].getHours();
        this.minutes = arguments[0].getMinutes();
        this.seconds = arguments[0].getSeconds();
      } else {
        throw new Error("Invalid date object");
      }
    } else if (arguments.length === 3) {
      const [hours, minutes, seconds] = arguments;
      if (
        typeof hours !== "number" ||
        typeof minutes !== "number" ||
        typeof seconds !== "number"
      ) {
        throw new Error("Parameters should be numbers");
      }
      if (hours >= 0 && hours <= 23) {
        this.hours = hours;
      } else {
        throw new Error(
          "Invalid hours parameter, it should be greater than 0 and less than 23"
        );
      }
      if (minutes >= 0 && minutes <= 60) {
        this.minutes = minutes;
      } else {
        throw new Error(
          "Invalid minutes parameter, it should be greater than 0 and less than 60"
        );
      }
      if (seconds >= 0 && seconds <= 60) {
        this.seconds = seconds;
      } else {
        throw new Error(
          "Invalid seconds parameter, it should be greater than 0 and less than 60"
        );
      }
    }
  }

  formattedDate() {
    if (this.hours === 0) {
      return `12:${this.minutes < 10 ? "0" + this.minutes : this.minutes}:${
        this.seconds < 10 ? "0" + this.seconds : this.seconds
      } AM`;
    }
    if (this.hours === 12) {
      return `12:${this.minutes < 10 ? "0" + this.minutes : this.minutes}:${
        this.seconds < 10 ? "0" + this.seconds : this.seconds
      } PM`;
    }
    return `${
      this.hours <= 12
        ? this.hours < 10
          ? "0" + this.hours
          : this.hours
        : this.hours - 12
    }:${this.minutes < 10 ? "0" + this.minutes : this.minutes}:${
      this.seconds < 10 ? "0" + this.seconds : this.seconds
    } ${this.hours <= 12 ? "AM" : "PM"}`;
  }

 static sumOfDate(dateObj1,dateObj2) {
    const [hours, minutes, seconds] = [
      dateObj1.hours,
      dateObj1.minutes,
      dateObj1.seconds,
    ];
    const [hours2, minutes2, seconds2] = [
      dateObj2.hours,
      dateObj2.minutes,
      dateObj2.seconds
    ]
    let resultHours = 0,
      resultMinutes = 0,
      resultSeconds = 0;
    resultHours = hours + hours2;
    resultMinutes = minutes + minutes2;
    resultSeconds = seconds + seconds2;
    if (resultSeconds > 59) {
      resultSeconds -= 60;
      resultMinutes += 1;
    }
    if (resultMinutes > 59){
      resultMinutes -= 60;
      resultHours += 1;
    }
    if (resultHours > 23){
      resultHours -= 24
    }
    return new TimeOS(resultHours,resultMinutes,resultSeconds)
  }

  static differenceBetweenDate(dateObj1,dateObj2) {
    const [hours, minutes, seconds] = [
      dateObj1.hours,
      dateObj1.minutes,
      dateObj1.seconds,
    ];
    const [hours2, minutes2, seconds2] = [
      dateObj2.hours,
      dateObj2.minutes,
      dateObj2.seconds,
    ];
    let resultHours = 0,
      resultMinutes = 0,
      resultSeconds = 0;
    resultHours = hours - hours2;
    resultMinutes = minutes - minutes2;
    resultSeconds = seconds - seconds2;
    if (resultSeconds < 0){
      resultSeconds += 60;
      resultMinutes -= 1;
    }
    if (resultMinutes < 0){
      resultMinutes += 60;
      resultHours -= 0;
    }
    if (resultHours < 0){
      resultHours += 23;
    }
    return new TimeOS(resultHours, resultMinutes, resultSeconds);
  }
}

// for (let i = 0; i < 24; i++) {
//   const time1 = new TimeOS(i, 0, 0);
//   console.log(time1.formattedDate());
// }
const time3 = new TimeOS(23, 59, 59);
const time4 = new TimeOS(12, 0, 0);
console.log(time4.formattedDate());
console.log(TimeOS.sumOfDate(time3,time4));
const time5 = new TimeOS(0, 0, 0);
const time6 = new TimeOS(0, 0, 0);
console.log(TimeOS.differenceBetweenDate(time5,time6));
const time7 = new TimeOS(new Date("December 17, 1995 00:00:00"));
const time8 = new TimeOS(new Date("December 17, 1995 00:00:01"));
const time9 = new TimeOS();

