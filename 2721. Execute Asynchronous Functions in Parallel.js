/*

/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = function(functions) {
  return new Promise((resolve, reject) => {
    let results = [];
    let firstErrorMsg;
    let resultIndex = 0;
    let collectedResponsesLeft = functions.length;

    for (let action of functions) {
      const resolver = (function (rIdx) {
        return resp => {
          results[rIdx] = resp;
          collectedResponsesLeft--;
          if (collectedResponsesLeft === 0) {
            resolve(results);
          }
        }
      })(resultIndex++);
      action()
        .then(resolver)
        .catch(errMsg => {
          firstErrorMsg = errMsg;
          reject(firstErrorMsg);
        });
    }

  });
};

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */

*/
