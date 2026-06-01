const calculateAge = function (birthDateStr) {
  const birthDate = new Date(birthDateStr);

  if (isNaN(birthDate.getTime())) {
    return "Error: Invalid date format";
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 0) {
    return "Error: Birth date cannot be in the future";
  }

  if (age > 125) {
    return `Are you sure you are more than 125 years old?`;
  }

  return `You are ${age} years old`;
};

console.log(calculateAge("2000-07-01"));
console.log(calculateAge("1988-05-18"));
console.log(calculateAge("2190-01-01"));
console.log(calculateAge("1800-01-01"));
console.log(calculateAge("invalid-date"));
