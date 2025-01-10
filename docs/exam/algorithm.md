# letcode100道题

## :bulb: 两数之和（哈希表，数组）

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

### 哈希表

Set 和 Map 在JavaScript中都是基于哈希表实现的。

```js
var twoSum = function(nums, target) {
  const map = new Map();
  for (let i =0;i<nums.length;i++) {
    let x = target - nums[i];
    if (map.has(x)) {
        return [map.get(x), i]
    } else {
        map.set(nums[i], i);
    }
  }
  return []
};
```

### 暴力解法

*枚举在数组中所有的不同的两个下标的组合
*逐个检查它们所对应的数的和是否等于target。

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let arr = []
    for(let i=0;i<nums.length;i++) {
        for(let j=i+1;j<nums.length;j++) {
            if (nums[i]+ nums[j] === target) {
                arr[0] = i;
                arr[1] = j;
            }
        }
    }
    if (arr.length) return arr;
    throw new Error('此题无解');
};
```

### 三数之和（双指针）

给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let result = [];
    nums.sort((a, b) => a - b); // 排序数组
 
    for(let i = 0; i < nums.length; i++) {
        if(i > 0 && nums[i] === nums[i - 1]) continue; // 跳过重复的数字
 
        let left = i + 1; // 左指针
        let right = nums.length - 1; // 右指针
 
        while(left < right) {
            let sum = nums[i] + nums[left] + nums[right];
            if(sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[++left]); // 跳过重复的数字
                while (left < right && nums[right] === nums[--right]); // 跳过重复的数字
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
};
```

### 最接近的三数之和（双指针）

给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。

返回这三个数的和。

假定每组输入只存在恰好一个解。

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    const arr = nums.sort((a,b) => a -b);
    let result = nums[0] + nums[1] + nums[2];
    for(let i = 0; i< nums.length-1; i++) {
        let l = i +1;
        let r = nums.length-1;
        while(l <r) {
            let sum = nums[i] + nums[l] +nums[r];
            if (Math.abs(sum - target) <= Math.abs(result - target)) {
                result = sum;
            }
            if (sum < target) {
                l ++;
            } else {
                r--;
            }
        }
    }
    return result;
};
```

## :bulb: 字母异位词分组（哈希表，数组）

给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

字母异位词 是由重新排列源单词的所有字母得到的一个新单词。

示例 1:

输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

sort中，字符串如何比较大小：

从小到大：arr.sort();

从大到小：arr.sort((a, b) => b.localeCompare(a, 'en'));

```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let map = new Map();
    let strArr = [];
    strs.forEach(v => {
        const temp = [...v];
        temp.sort();
        const key = temp.join('');
        if (map.has(key)) {
            map.set(key, [v,...map.get(key)])
        } else {
            map.set(key, [v]);
        }
    })
    for(let [k,v] of map) {
        strArr.push(map.get(k));
    }
    return strArr;
};
```
