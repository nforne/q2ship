"use strict"

const objectEquals = (obj1, obj2) => {
  let outPut = true
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
        outPut = false;
    } else {
      for (let i = 0; i < obj1.length; i++) {
        if (Array.isArray(obj1[i]) || typeof obj1[i] === 'object') {
          outPut = objectEquals(obj1[i], obj2[i])
        } else if (obj1[i] !== obj2[i]) {
          outPut = false;
          break;
        }
      }
    }; 
  } else if (typeof obj1 === 'object' && typeof obj2 === 'object') {
    const arrayObj1Keys = Object.keys(obj1);
    const arrayObj2Keys = Object.keys(obj2);
    if (arrayObj1Keys.length !== arrayObj2Keys.length) {
      outPut = false;
    } else {
      for (let key of arrayObj1Keys) {
        if ((typeof obj1[key] === typeof obj2[key] && typeof obj1[key] === 'object') || (typeof obj1[key] === typeof obj2[key] && Array.isArray(obj1[key]))) {
          outPut = objectEquals(obj1[key], obj2[key]);
        } else if (!arrayObj2Keys.includes(key) || obj1[key] !== obj2[key]) {
          outPut = false;
          break;
        }
      }
    }
  } else {
    outPut = false;
  }
  return outPut;
}

module.exports = { objectEquals };