const convertDate = (date) => {
  var newDate = new Date(date);

  const day = newDate.getUTCDate(),
    month = newDate.getUTCMonth(),
    year = newDate.getUTCFullYear(),
    hour = newDate.getUTCHours(),
    minute = newDate.getUTCMinutes();

  return `${day}/${month}/${year} ${hour}:${minute}`;
};
export default convertDate;
