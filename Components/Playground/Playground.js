let studentsStr =
  "Дмитренко Олександр - ІП-84; Матвійчук Андрій - ІВ-83; Лесик Сергій - ІО-82; Ткаченко Ярослав - ІВ-83; Аверкова Анастасія - ІО-83; Соловйов Даніїл - ІО-83; Рахуба Вероніка - ІО-81; Кочерук Давид - ІВ-83; Лихацька Юлія- ІВ-82; Головенець Руслан - ІВ-83; Ющенко Андрій - ІО-82; Мінченко Володимир - ІП-83; Мартинюк Назар - ІО-82; Базова Лідія - ІВ-81; Снігурець Олег - ІВ-81; Роман Олександр - ІО-82; Дудка Максим - ІО-81; Кулініч Віталій - ІВ-81; Жуков Михайло - ІП-83; Грабко Михайло - ІВ-81; Іванов Володимир - ІО-81; Востриков Нікіта - ІО-82; Бондаренко Максим - ІВ-83; Скрипченко Володимир - ІВ-82; Кобук Назар - ІО-81; Дровнін Павло - ІВ-83; Тарасенко Юлія - ІО-82; Дрозд Світлана - ІВ-81; Фещенко Кирил - ІО-82; Крамар Віктор - ІО-83; Іванов Дмитро - ІВ-82";
// Завдання 1
// Заповніть словник, де:
// - ключ – назва групи
// - значення – відсортований масив студентів, які відносяться до відповідної групи
let studentsGroups = {};
// Ваш код починається тут
const arrayStudentGroup = studentsStr
  .split(";")
  .map((student) => {
    return student
      .trim()
      .split(/^([^-]+)/)
      .slice(1);
  })
  .map((student) => {
    return [student[0].trim(), student[1].replace("- ", "")];
  });
const groups = [...new Set(arrayStudentGroup.map((elem) => elem[1]).sort())];
groups.forEach((group) => {
  studentsGroups[group] = [];
});
arrayStudentGroup.forEach((studentAndGroup) => {
  const [student, group] = studentAndGroup;
  studentsGroups[group].push(student);
});
for (let group in studentsGroups) {
  studentsGroups[group].sort();
}
// Ваш код закінчується тут

console.log("Завдання 1")
console.log(studentsGroups)
// Дано масив з максимально можливими оцінками

let points = [12, 12, 12, 12, 12, 12, 12, 16];

// Завдання 2
// Заповніть словник, де:
// - ключ – назва групи
// - значення – словник, де:
//   - ключ – студент, який відносяться до відповідної групи
//   - значення – масив з оцінками студента (заповніть масив випадковими значеннями, використовуючи функцію `randomValue(maxValue: Int) -> Int`)

function randomValue(maxValue) {
  switch (Math.round(Math.random() * 5)) {
    case 1:
      return Math.ceil(maxValue * 0.7);
      break;
    case 2:
      return Math.ceil(maxValue * 0.9);
      break;
    case (3, 4, 5):
      return maxValue;
      break;
    default:
      return 0;
  }
}

let studentPoints = {};

// Ваш код починається тут
for (let group in studentsGroups) {
  studentPoints[group] = {};
  const arrGroupWithPoint = studentsGroups[group]
    .map((student) => {
      let studentPoints = [];
      points.forEach((point) => {
        studentPoints.push(randomValue(point));
      });
      return { [student]: studentPoints };
    })
    .forEach((studentWithPoints) => {
      const [studentName, points] = [
        Object.keys(studentWithPoints)[0],
        Object.values(studentWithPoints)[0],
      ];
      studentPoints[group][studentName] = points;
    });
}
// Ваш код закінчується тут

console.log("Завдання 2");
console.log(studentPoints);
console.log();

// Завдання 3
// Заповніть словник, де:
// - ключ – назва групи
// - значення – словник, де:
//   - ключ – студент, який відносяться до відповідної групи
//   - значення – сума оцінок студента

let sumPoints = {};

// Ваш код починається тут
for (let group in studentPoints) {
  sumPoints[group] = {};
  for (let student in studentPoints[group]) {
    sumPoints[group][student] = studentPoints[group][student].reduce(
      (a, b) => a + b,
      0
    );
  }
}

// Ваш код закінчується тут
console.log("Завдання 3");
console.log(sumPoints);
console.log();
// Завдання 4
// Заповніть словник, де:
// - ключ – назва групи
// - значення – середня оцінка всіх студентів групи

let groupAvg = {};
// Ваш код починається тут
for (let group in sumPoints) {
  const numberOfStudentsInGroup = Object.values(sumPoints[group]).length;
  groupAvg[group] =
    Object.values(sumPoints[group]).reduce((a, b) => a + b, 0) /
    numberOfStudentsInGroup;
}
// Ваш код закінчується тут

console.log("Завдання 4");
console.log(groupAvg);
console.log();

// Завдання 5
// Заповніть словник, де:
// - ключ – назва групи
// - значення – масив студентів, які мають >= 60 балів

let passedPerGroup = {}

// Ваш код починається тут
for (let group in sumPoints){
  passedPerGroup[group] = [];
  for (let student in sumPoints[group]){
    if (sumPoints[group][student] >= 60){
      passedPerGroup[group].push(student)
    }
  }
}


// Ваш код закінчується тут

console.log("Завдання 5")
console.log(passedPerGroup)

