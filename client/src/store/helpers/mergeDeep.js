import { normalizeNumbers } from '../../utils/normalizers/normalizeNumbers.js';

const isPlainObject = value => {
   if (value === null || typeof value !== 'object') return false;
   const prototype = Object.getPrototypeOf(value);
   return prototype === Object.prototype || prototype === null;
};

// These layout branches need coordinated allocation or integer validation.
const excludedLayoutKeys = new Set(['width', 'rowContentWidth', 'grid']);

const mergeObjects = (target, changes, formattingPath) => {
   for (const [key, value] of Object.entries(changes)) {
      // Do not follow or overwrite prototype-related properties.
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;

      const nextPath = formattingPath
         ? [...formattingPath, key]
         : (key === 'styling' || key === 'layout') ? [key] : null;

      if (isPlainObject(value)) {
         if (!Object.hasOwn(target, key) || !isPlainObject(target[key])) target[key] = {};
         mergeObjects(target[key], value, nextPath);
      } else {
         const excluded = nextPath?.[0] === 'layout' && excludedLayoutKeys.has(nextPath[1]);
         target[key] = nextPath && !excluded ? normalizeNumbers(key, value) : value;
      }
   }

   return target;
};

/**
 * Merge changes into an existing object or Immer draft, returning the target.
 * Plain objects merge recursively; arrays and all other values replace directly.
 * Eligible values beneath styling/layout keys are rounded, except layout width,
 * rowContentWidth, and grid branches. Arrays are not traversed for normalization.
 * Omitted properties stay unchanged. Explicit undefined/null values replace.
 * This mutates the target; use inside an Immer reducer or with a mutable object.
 */
export const mergeDeep = (target, changes) => {
   if (!isPlainObject(target) || !isPlainObject(changes)) {
      throw new TypeError('mergeDeep expects plain objects for target and changes.');
   }

   return mergeObjects(target, changes, null);
};
