/*

You are given an array coordinates, coordinates[i] = [x, y], where [x, y] represents the coordinate of a point. 
Check if these points make a straight line in the XY plane.

TIP:
the [slope] value is the smae for each points (if they all are on the same line) 

Readings:
https://planetcalc.com/8110/
https://content.byui.edu/file/b8b83119-9acc-4a7b-bc84-efacf9043998/1/Math-2-11-2.html#WS2


Example 1:

Input: coordinates = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]
Output: true
Example 2:



Input: coordinates = [[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]]
Output: false
 

Constraints:

2 <= coordinates.length <= 1000
coordinates[i].length == 2
-10^4 <= coordinates[i][0], coordinates[i][1] <= 10^4
coordinates contains no duplicate point.

*/

/**
 * @param {number[][]} coordinates
 * @return {boolean}
 */
var checkStraightLine = function(coordinates) {
    let n = coordinates.length;
    let [ x1, y1 ] = coordinates[0];
    let [ xn, yn ] = coordinates.at(-1);

    // fast check
    // single dot
    if (x1 === xn && y1 === yn) { return true; }
    // just line of two points
    if (coordinates.length === 2) { return true; } 

    // is vertival line
    const isVertical = xn - x1 === 0;
    const isHorizontal = yn - y1 === 0;
    // slope
    const m = isVertical ? 0 : (yn - y1) / (xn - x1);
    // y-intercept
    // b = y - m * x
    const b = y1 - m * x1;
    // y = m * x + b
    const fy = (x) => m * x + b;
    
    console.log('linear f(x) params', 'm=', m, 'b=', b, 'isVertical',isVertical,'isHorizontal',isHorizontal);

    // check points wth the linear function
    for (let i = 0; i < n; i++) {
      let [ pX, pY ] = coordinates[i];
      // vertical line has te same X
      if (isVertical && pX !== x1) {
        return false;
      }
      // however, horizontal line has the same Y
      if (isHorizontal && pY !== y1) {
        return false;
      }
      // the others, with slope
      if (!isVertical && !isHorizontal && pY !== fy(pX)) {
        return false;
      }
    }
    return true;
};
