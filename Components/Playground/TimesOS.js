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
  sumOfDate(dateObj) {
    const [hours, minutes, seconds] = [
      dateObj.hours,
      dateObj.minutes,
      dateObj.seconds,
    ];
    let resultHours = 0,
      resultMinutes = 0,
      resultSeconds = 0;
    if (seconds + this.seconds < 60) {
      resultSeconds = seconds + this.seconds;
    } else {
      resultMinutes += Math.floor((seconds + this.seconds) / 60);
      resultSeconds +=
        seconds + this.seconds - Math.floor((seconds + this.seconds) / 60) * 60;
    }
    if (minutes + this.minutes + resultMinutes < 60) {
      resultMinutes = minutes + this.minutes;
    } else {
      resultHours += Math.floor((minutes + this.minutes) / 60);
      resultMinutes =
        minutes +
        this.minutes +
        resultMinutes -
        Math.floor((minutes + this.minutes + resultMinutes) / 60) * 60;
    }
    if (hours + this.hours + resultHours < 24) {
      resultHours += hours + this.hours;
    } else {
      resultHours =
        hours +
        this.hours +
        resultHours -
        Math.floor((hours + this.hours + resultHours) / 23) * 23;
    }
    return new TimeOS(resultHours, resultMinutes, resultSeconds);
  }
  differenceBetweenDate(dateObj) {
    const [hours, minutes, seconds] = [
      dateObj.hours,
      dateObj.minutes,
      dateObj.seconds,
    ];
    let resultHours = 0,
      resultMinutes = 0,
      resultSeconds = 0;
    if (this.seconds - seconds > 0) {
      resultSeconds = this.seconds - seconds;
    } else {
      resultMinutes -= 1;
      resultSeconds = 60 + this.seconds - seconds;
    }

    if (this.minutes - minutes + resultMinutes > 0) {
      resultMinutes += this.minutes - minutes;
    } else {
      resultHours -= 1;
      resultMinutes += 60 + this.minutes - minutes;
    }
    if (this.hours - hours + resultHours > 0) {
      resultHours += this.hours - hours;
    } else {
      resultHours += 24 + this.hours - hours;
    }
    return new TimeOS(resultHours, resultMinutes, resultSeconds);
  }
}
const time1 = new TimeOS(23, 59, 59);
const time2 = new TimeOS(12, 0, 1);
const time3 = new TimeOS(new Date("December 17, 1995 00:00:00"));
const time4 = new TimeOS(new Date("December 17, 1995 00:00:01"));
const time5 = new TimeOS();
console.log(time1.sumOfDate(time2));
console.log(time3.differenceBetweenDate(time4));
console.log(time1.formattedDate());
console.log(time2.formattedDate());
console.log(time3.formattedDate());
