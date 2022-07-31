// findSumOfSlides

function findSumOfSlides(k, arr) {
  let windowSum = 0;
  let avgSum = [];
  let point = 0;
  for (i = 0; i < arr.length; i++) {
    windowSum = windowSum + arr[i];
    if (i >= k - 1) {
      let avg = windowSum / k;
      avgSum.push(avg);
      windowSum = windowSum - arr[point];
      point++;
    }
  }
  return avgSum;
}
let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90];
let result = findSumOfSlides(2, arr);
console.log("Result is ", result);

// ==============================================================
function smallestSubArray(s, arr) {
  let minLength = Infinity;
  let windowSum = 0;
  let initialPoint = 0;
  for (i = 0; i < arr.length; i++) {
    windowSum = windowSum + arr[i];
    while (windowSum >= s) {
      minLength = Math.min(minLength, i - initialPoint + 1);
      windowSum = windowSum - arr[initialPoint];
      initialPoint++;
    }
  }
  if (minLength == Infinity) {
    return 0;
  }
  return minLength;
}

let arrs = [3, 4, 1, 1, 6];
result = smallestSubArray(8, arrs);
console.log("Result is ", result);

// ==============================================================
function longestSubstringWithMaxKDistincChar(k, arr) {
  let characterMap = {};
  let pivotPoint = 0;
  for (i = 0; i < arr.length; i++) {
    let character = arr[i];
    if (characterMap[character]) {
      characterMap[character]++;
    } else {
      characterMap[character] = 1;
    }
    let uniqueLength = Object.keys(characterMap).length;
    while (uniqueLength > k) {
      const startChar = arr[pivotPoint];

      pivotPoint++;
    }
  }
  return characterMap;
}

let lString = "sanjay";
let longestCharacter = 3;
result = longestSubstringWithMaxKDistincChar(longestCharacter, lString);
console.log("Result of longest substring is ", result);

// ==============================================================
