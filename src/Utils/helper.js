// export function deepEqual(obj1, obj2) {
//     if (obj1 === obj2) return true; // Same reference
//     if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 == null || obj2 == null) return false;
  
//     const keys1 = Object.keys(obj1);
//     const keys2 = Object.keys(obj2);
//     if (keys1.length !== keys2.length) return false;
  
//     return keys1.every((key) => deepEqual(obj1[key], obj2[key]));
//   }