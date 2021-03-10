// let employee = ["Gray", "Worm", "Security", 1];
// let firstName, familyName, title, payPerHour;

function createEmployeeRecord(employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// console.log(createEmployeeRecord(array));
// let employeeArray = [
//         ["moe", "sizlak", "barkeep", 2],
//         ["bartholomew", "simpson", "scamp", 3]
//       ]

function createEmployeeRecords(employeeArray){
   const map = employeeArray.map(employee => createEmployeeRecord(employee))
   return map;
}

// let employee1 = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
function createTimeInEvent(employee, timeStamp){
    let [date, hour] = timeStamp.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour),
    });
    return employee
}
// createTimeInEvent(employee1, "2014-02-28 1400")

function createTimeOutEvent(employee, timeStamp){
    let [date, hour] = timeStamp.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour),
    });
    return employee
}

function hoursWorkedOnDate(employee, date){
    let clockIn = employee.timeInEvents.find(day => day.date === date);
    let clockOut = employee.timeOutEvents.find(day => day.date === date)
    return (clockOut.hour - clockIn.hour)/100
}

function wagesEarnedOnDate(employee, date){
    let hours = hoursWorkedOnDate(employee,date)
    return employee.payPerHour * hours
}

function allWagesFor(employee){
    let daysWorked = employee.timeInEvents.map(day => day.date);
    let paycheck = daysWorked.reduce((accumulator, day) => {
        return (accumulator += wagesEarnedOnDate(employee, day));
  }, 0);
  return paycheck;
};

const findEmployeeByFirstName = (employees, name) =>
  employees.find((employee) => employee.firstName === name);

const calculatePayroll = (employees) =>
  employees.reduce((accumulator, employee) => {
    return accumulator + allWagesFor(employee);
  }, 0);
