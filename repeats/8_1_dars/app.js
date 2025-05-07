// function removechar(str) {
//   const cuttedStr = str.slice(1, -1);
//   console.log(cuttedStr);
// }
// removechar('salom');

// function check(a, x) {
//   for (let i = 0; i < a.length; i++) {
//     if (x === a[i]) return true;
//   }
//   return false;
// }

// check([1, 2, 3, 5, 4, 4, 43, 4, 54, 56, 56], 5);

// function backCount(n) {
//   let backArr = [];
//   for (let i = n; i >= 1; i--) {
//     backArr.push(i);
//   }
//   console.log(backArr);
// }

// backCount(5);

// const areaOrPerimeter = function (l, w) {
//   if ((l = w)) console.log(w * w);
//   return (l + w) * 2;
// };

// areaOrPerimeter(3, 4);

// function squareSum(numbers) {
//   let yigindi = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     yigindi += numbers[i] * numbers[i];
//   }
//   return yigindi;
// }

// squareSum([1, 3, 34, 3, 43, 3, 3]);

function betterThanAverage(classPoints, yourPoints) {
  let sum = 0;

  for (let i = 0; i < classPoints.length; i++) {
    sum += classPoints[i];
  }
  const ortacha = sum / classPoints.length;
  if (ortacha >= classPoints) {
    return true;
  } else {
    return false;
  }
}
