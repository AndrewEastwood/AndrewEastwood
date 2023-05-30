/**
 * @param {Object} context
 * @param {any[]} args
 * @return {any}
 */
Function.prototype.callPolyfill = function(context, ...args) {
  const fn = this;
  const wrapperFn = Symbol.for('wrapperFn');
  const ctx = Object.create(null, {
    ...(Object.keys(context).reduce((r, key) => ({ ...r, [key]: {
      enumerable: true,
      writable: true,
      value: context[key],
    } }), {})),
    [wrapperFn]: {
      enumerable: false,
      writable: false,
      value: fn,
    }
  });
  return ctx[wrapperFn](...args);
}

/**
 * function increment() { this.count++; return this.count; }
 * increment.callPolyfill({count: 1}); // 2
 */
