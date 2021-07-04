const palindrome = (string) => {
  if(typeof string === 'undefined') return;
  return string
    .split('')
    .reverse()
    .join('');
};

const average = (array) => {
  let reducer = (sum, item) => {
    return sum + item;
  };
  return typeof array === 'undefined' || array.length === 0 
    ? 0
    : array.reduce(reducer,0) / array.length;
};

module.exports = {
  palindrome,
  average,
};