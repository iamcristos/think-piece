function countInversions(array) {
    let count = 0;

    function globalScope(arr) {
        funcHandler(arr);
        return count
    }

    function mergeSort(left, right) {
        const sortedArr = []
        while (left.length && right.length) {
            if (left[0] > right[0]) {
                count += 1;
                sortedArr.push(right.shift())
            } else {
                sortedArr.push(left.shift())
            }
        }
        while (left.length) {
            sortedArr.push(left.shift())
        }
        while (right.length) {
            sortedArr.push(right.shift())
        }
        return sortedArr
    }

    function funcHandler(arr) {
        if (arr.length < 2) {
            return arr
        }
        const middle = Math.floor(arr.length / 2);
        const l = arr.slice(0, middle);
        const r = arr.slice(middle, arr.length)
        const left = funcHandler(l);
        const right = funcHandler(r);
        return mergeSort(left, right)
    }
    return globalScope(array)
}





// console.log(countInversions([10,1,2,4,3,5])) 
// console.log(countInversions([2, 1, 3, 1, 2]))
// console.log(countInversions([7, 5, 3, 1]))
// [1,2,3]

function sum(n) {
    let total = 0;
    for (let index = 0; index < n.length; index++) {
        total += Number(n[index])
    }
    return Number(total)
}

function digitSum(n, k) {
    const numberString = String(n)
    if (numberString.length === 1) {
        return Number(n)
    }
    const concatStr = sum(numberString) * k
    return digitSum(concatStr, 1)
}

console.log(digitSum(9875, 4))

function mergeSort(left, right) {
    const sortedArr = []
    while (left.length && right.length) {
        if (left[0] > right[0]) {
            sortedArr.push(right.shift())
        } else {
            sortedArr.push(left.shift())
        }
    }
    while (left.length) {
        sortedArr.push(left.shift())
    }
    while (right.length) {
        sortedArr.push(right.shift())
    }
    return sortedArr
}

function merge(arr) {
    if (arr.length < 2) {
        return arr
    }
    const middle = Math.floor(arr.length / 2);
    const l = arr.slice(0, middle);
    const r = arr.slice(middle, arr.length)
    const left = merge(l);
    const right = merge(r);
    return mergeSort(left, right)
}

// console.log(digitSum(123, 3))

function closestNumbers(arr) {
    const result = []
    const sortedArr = merge(arr)
    let minimunDiff = sortedArr[1] - sortedArr[0];

    for (let index = 0; index < sortedArr.length; index++) {
        if (sortedArr[index + 1] - sortedArr[index] < minimunDiff) {
            minimunDiff = sortedArr[index + 1] - sortedArr[index]
        }
    }

    for (let index = 0; index < sortedArr.length; index++) {
        if (sortedArr[index + 1] - sortedArr[index] === minimunDiff) {
            result.push(sortedArr[index], sortedArr[index + 1])
        }
    }
    return result
}

// console.log(closestNumbers([5, 4, 3, 2, 1]))