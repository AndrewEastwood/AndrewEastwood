// https://leetcode.com/problems/add-binary/description/

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
  const len = Math.max(a.length, b.length);

  a = a.padStart(len, '0');
  b = b.padStart(len, '0');

  let carry = 0;
  let result = [];
  let bitResult = {};
  let bitA = '0';
  let bitB = '0';

  const adder = (bitA, bitB, carry) => {
    if (bitA && bitB) {
      return {
        result: carry === 0 ? 0 : 1,
        carry: 1
      }
    } else {
      let result = bitA || bitB;
      // apply carry
      if (carry) {
        if (result) {
          result = 0;
          carry = 1
        } else {
          result = 1;
          carry = 0;
        }
      }
      return {
        result,
        carry
      };
    }
  } 
  
  for (let i = len - 1; i >= 0; i--) {
    bitA = a[i] ?? '0';
    bitB = b[i] ?? '0';

    bitResult = adder(+bitA, +bitB, carry);
    carry = bitResult.carry;

    result.push(bitResult.result);
  }

  if (carry) {
    result.push('1');
  }

  return result.reverse().join('');
};
