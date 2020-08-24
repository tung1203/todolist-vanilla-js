const convertDate = (date) => {
  var newDate = new Date(date);

  const day = newDate.getDate(),
    month = newDate.getMonth() + 1,
    year = newDate.getFullYear(),
    hour = newDate.getHours(),
    minute = newDate.getMinutes();

  return `${day}/${month}/${year} ${hour}:${minute}`;
};
export default convertDate;
