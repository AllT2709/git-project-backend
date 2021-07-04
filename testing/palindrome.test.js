const { palindrome } = require('../utils/for_test');

test.skip('palindrome of aldo', () => {
  let result = palindrome('aldo');

  expect(result).toBe('odla');
});

test.skip('palindrome of empty string', ()=>{
  let result = palindrome('');

  expect(result).toBe('');
});

test.skip('palindrome of undefined', () =>{
  let result = palindrome();

  expect(result).toBeUndefined();
});