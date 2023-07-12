/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  // map numbers
  const numChars = {
    '0': [],
    '1': [],
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z']
  };

  let results = [];
  let nums = digits.split('');
  let numCharsToCombinate = [];

  for (let i = 0; i < nums.length; i++) {
    const currNumVars = numChars[nums[i]];
    numCharsToCombinate.push(currNumVars);
  }

  // combinate
  const combine = (items, stack = []) => {
    let results = [];
    if (items.length === 0) { return [stack.join('')]; }
    for (let i = 0; i < items[0].length; i++) {
      results.push(...combine(items.slice(1), [...stack, items[0][i]]));
    }
    return results;
  }

  return combine(numCharsToCombinate).filter(v => v);
};
