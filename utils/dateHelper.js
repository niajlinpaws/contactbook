export default function calculateAge(birthday) {
  // if (bir)
  // birthday is a date
  var ageDifMs = Date.now() - new Date(birthday);
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
