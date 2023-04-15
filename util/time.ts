const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
export const dateToMonth = (date: Date) => {
  return months[new Date(date).getMonth()]
}


const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
export const dateToDay = (date: Date) => {
  const day = date.getDay()
  return weekday[day]
}


module.exports = {
  dateToDay,
  dateToMonth
}