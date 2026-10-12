const isPlainObject = value => {
   if (value === null || typeof value !== 'object') return false;
   const prototype = Object.getPrototypeOf(value);
   return prototype === Object.prototype || prototype === null;
};

/**
 * Merge changes into an existing object or Immer draft, returning the target.
 * Plain objects merge recursively; arrays and all other values replace directly.
 * Omitted properties stay unchanged. Explicit undefined/null values replace.
 * This mutates the target; use inside an Immer reducer or with a mutable object.
 */
export const mergeDeep = (target, changes) => {
   if (!isPlainObject(target) || !isPlainObject(changes)) {
      throw new TypeError('mergeDeep expects plain objects for target and changes.');
   }

   for (const [key, value] of Object.entries(changes)) {
      // Do not follow or overwrite prototype-related properties.
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;

      if (isPlainObject(value)) {
         if (!Object.hasOwn(target, key) || !isPlainObject(target[key])) target[key] = {};
         mergeDeep(target[key], value);
      } else {
         target[key] = value;
      }
   }

   return target;
};
