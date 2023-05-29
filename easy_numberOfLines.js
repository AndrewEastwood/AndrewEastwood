/*

You are given a string s of lowercase English letters and an array widths denoting how many pixels wide each lowercase English letter is. Specifically, widths[0] is the width of 'a', widths[1] is the width of 'b', and so on.

You are trying to write s across several lines, where each line is no longer than 100 pixels. Starting at the beginning of s, write as many letters on the first line such that the total width does not exceed 100 pixels. Then, from where you stopped in s, continue writing as many letters as you can on the second line. Continue this process until you have written all of s.

Return an array result of length 2 where:

result[0] is the total number of lines.
result[1] is the width of the last line in pixels.

*/

/**
 * @param {number[]} widths
 * @param {string} s
 * @return {number[]}
 */
var numberOfLines = function(widths, s) {
    let result = [s?.length > 0 ? 1 : 0, 0];
    let currLineW = 0;
    let charW = 0;
    // this is or line limit
    const lineWMax = 100;
    const offset = 'a'.charCodeAt();
    // 'a' => 97.  | width of 'a' is widths['a'.charCodeAt() - offset]
    // 'z' => 122. | width of 'z' is widths['z'.charCodeAt() - offset]
    for (let c of s) {
      // get char width
      charW = widths[c.charCodeAt() - offset];
      
      // check if we can fit one more char in the line
      if ((currLineW + charW) > lineWMax) {
        // increase occupied lines
        result[0]++;
        // reset temp line (buffer)
        currLineW = 0;
      }

      // collect chars in the temporaty line (buffer)
      currLineW += charW;
    }

    // save remaining chars
    result[1] = currLineW;

    return result;
};
