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

## :bulb: 最长连续序列（哈希表）

给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

输入：nums = [100,4,200,1,3,2]

输出：4

解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。

```js
var longestConsecutive = function(nums){
    let num_set = new Set(nums);

    let longestLength = 0;

    for (const num of num_set) {
        if (!num_set.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            while (num_set.has(currentNum + 1)) {
                currentNum += 1;
                currentStreak += 1;
            }

            longestLength = Math.max(longestLength, currentStreak);
        }
    }

    return longestLength;   
};
```

## :bulb: 移动零（双指针）

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。

### 双指针

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let left =0;
    let right = 0;
    while (right < nums.length) {
        if (nums[right] !== 0) {
            let temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left ++;
        }
        right ++;
    }
    return nums;
};
```

### 不太好使的其他方法，如果是将负数移动到末尾完全不好使

遍历数组，直接收集非0的数字，后续直接补0

```js
var moveZeroes = function(nums) {
    var count = 0;
    for(let i = 0; i< nums.length; i++) {
        if (nums[i] !== 0) {
            nums[count] = nums[i];
            count ++;
        }
    }
    for (let y = count;y <nums.length;y++) {
        nums[y] = 0;
    }
    return nums;
};
```

## :bulb: 盛最多水的容器（双指针）

给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let res = null;
    let left = 0;
    let right = height.length -1;
    while (left < right) {
        let temp = (right-left) * Math.min(height[left], height[right]);
        if (res === null || res < temp) {
            res = temp;
        }
        if (height[left] > height[right]) {
            right --;
        } else {
            left++;
        }
    }
    return res;
};
```

## :bulb: 接雨水（动态规划、双指针）冲冲冲

### 双指针（稍优动态规划）

```js
var trap = function(height) {
    let ans = 0;
    let left = 0;
    let right = height.length-1;
    let leftMax = 0;
    let rightMax = 0;
    while (left <right) {
        leftMax = Math.max(height[left], leftMax);
        rightMax = Math.max(height[right], rightMax);
        if (leftMax < rightMax) {
            ans += leftMax - height[left];
            left++;
        } else {
            ans += rightMax-height[right];
            right --;
        }
    }
    return ans;
};
```

### 动态规划

从左往右看，最大高度
从右往左看，最大高度

```js
var trap = function(height) {
    let ans = 0;
    let len = height.length;
    if (len < 3) return 0;
    let left_max_arr = [];
    let right_max_arr = [];
    left_max_arr[0] = height[0];
    right_max_arr[len-1] = height[len-1];
    for(let i = 1;i<len;i++) {
        left_max_arr[i] = Math.max(left_max_arr[i-1], height[i]);
    }
    for(let i = len -2;i>=0;i--) {
        right_max_arr[i] = Math.max(right_max_arr[i+1], height[i]);
    }
    for(let i = 0; i< len; i++) {
        ans += Math.min(left_max_arr[i], right_max_arr[i]) -height[i]
    }
    return ans;
};
```

## :bulb: 无重复字符的最长子串（滑动窗口、哈希表）

给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。(子串说明连续)

```js
var lengthOfLongestSubstring = function(s) {
    // 哈希集合，记录每个字符是否出现过
    const set = new Set();
    const len = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = 0;
    let ans = 0;
    for (let i = 0; i < len; i++) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            set.delete(s.charAt(i - 1));
        }
        while (rk < len && !set.has(s.charAt(rk))) {
            // 不断地移动右指针
            set.add(s.charAt(rk));
            rk++;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i);
    }
    return ans;
};
```

### 至多包含两个不同字符的最长子串（哈希表，滑动窗口）

给你一个字符串 s ，请你找出 至多 包含 两个不同字符 的最长子串，并返回该子串的长度。

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function(s) {
    if (s.length <= 2) return s.length;
    let ans = 0;
    let len = s.length;
    let set = new Set();
    let rk = 0;//右指针
    for(let i = 0; i < len; i++) {
        set.clear();
        rk = i;
        while(rk < len && set.size <= 2) {
            set.add(s.charAt(rk));
            rk ++;
        }
        if (set.size >2) {
            rk --;
        }
        ans = Math.max(ans, rk-i)
    }
    return ans;
}
```

## :bulb: 找到字符串中所有字母异位词（哈希表，滑动窗口）

给定两个字符串 s 和 p，找到 s 中所有 p 的异位词的子串，返回这些子串的起始索引。不考虑答案输出的顺序

输入: s = "cbaebabacd", p = "abc"

输出: [0,6]

解释:

起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。

起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。

### 超出时间限制

```js
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    let numArr = [];
    let sLen = s.length;
    let pSet = new Set([...p])
    for(let i = 0; i< sLen; i++) {
        if (!pSet.has(s.charAt(i))) {
            continue;
        }
        let rk = i;
        let pStr = p;
        while (rk < sLen) {
            let currLen = pStr.length;
            pStr = pStr.replace(s.charAt(rk), "");
            if (currLen === pStr.length) {
                break;
            }
            if (pStr.length === 0) {
                numArr.push(i);
                break;
            }
            rk++;
        }
    }
    return numArr;
};
```

## :bulb: 和为k的子数组 冲冲冲

### 哈希表+前缀和

给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。

子数组是数组中元素的连续非空序列。

```js
var subarraySum = function(nums, k) {
    const mp = new Map();
    mp.set(0, 1);
    let count = 0;
    let pre = 0;
    for (const x of nums) {
        pre += x;
        if (mp.has(pre -k)) {
            count += mp.get(pre - k);
        }
        if (mp.has(pre)) {
            mp.set(pre, mp.get(pre) + 1);
        } else {
            mp.set(pre, 1);
        }
    }
    return count;
};
```

### 枚举/暴力解法

```js
var subarraySum = function(nums, k) {
    let ans = 0;
    for(let ind = 0; ind <nums.length; ind ++) {
        let sum = 0;
        let rk = ind;
        while (rk < nums.length) {
            sum += nums[rk];
            if (sum === k) {
                ans ++;
            }
            rk ++;
        }
    }
    return ans;
};
```

## :bulb: 滑动窗口最大值

给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

返回 滑动窗口中的最大值 。

输入：nums = [1,3,-1,-3,5,3,6,7], k = 3

输出：[3,3,5,5,6,7]

解释：

滑动窗口的位置                最大值

---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

```js
```

## :bulb: 最小覆盖子串

给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。

如果 s 中存在这样的子串，我们保证它是唯一的答案。

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    if (t.length > s.length) return "";
    const target = {};
    const window = {};
    for(const val of t) {
        target[val] = (target[val] || 0) + 1;
    }
    let left = 0;
    let right = 0;
    let minLeft = 0;
    let minLen = Infinity;
    let count = Object.keys(target).length;
    while(right < s.length) {
        const rChar = s[right];
        if (target[rChar]) {
            window[rChar] = (window[rChar] || 0) + 1;
            if (window[rChar] === target[rChar]) {
                count --;
            }
        }
        right ++;
        while (count ===0) {
            if (right - left < minLen) {
                minLen = right - left;
                minLeft = left;
            }
            const lChar = s[left];
            if (target[lChar]) {
                window[lChar] --;
                if (window[lChar] < target[lChar]) {
                    count ++;
                }
            }
            left ++;
        }
    }
    return minLen === Infinity ? '': s.substring(minLeft, minLeft + minLen);
};
```

## :bulb: 最大子数组和

给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组是数组中的一个连续部分。

输入：nums = [5,4,-1,7,8]

输出：23

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let pre = 0;
    let maxAns = nums[0];
    for (let v of nums) {
        pre = Math.max(pre + v, v);
        maxAns = Math.max(maxAns, pre);
    }
    return maxAns;
};
```

## :bulb: 合并区间

以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所

有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

输入：intervals = [[1,3],[2,6],[8,10],[15,18]]

输出：[[1,6],[8,10],[15,18]]

解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    let prev = intervals[0]
    let result = []
    for(let i =0; i<intervals.length; i++){
        let cur = intervals[i]
        if(cur[0] > prev[1]){
            result.push(prev)
            prev = cur
        }else{
            prev[1] = Math.max(cur[1],prev[1])
        }
    }
    result.push(prev)
    return result
};
```

## :bulb: 轮转数组

给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

输入: nums = [1,2,3,4,5,6,7], k = 3

输出: [5,6,7,1,2,3,4]

尽可能想出更多的解决方案，至少有 三种 不同的方法可以解决这个问题。

你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？

### 时间复杂度O(n), 空间复杂度O(n)

```js
  var rotate = function (nums, k) {
    const arr = [];
    for (let i = 0; i < nums.length; i++) {
      const sub = (i +k) % nums.length;
      arr[sub] = nums[i];
    }
    for(let j = 0; j< nums.length; j++ ) {
      nums[j] = arr[j]
    }
};
```

### 时间复杂度O(Nk), 空间复杂度O(k)

```js
var rotate = function(nums, k) {
    const k1 = k % nums.length;
    const popArr = [];
    for(let i =0; i<k1;i++) {
        popArr.push(nums.pop());
    }
    for(let i = 0; i < popArr.length;i++) {
        nums.unshift(popArr[i])
    }
    return nums;
};
```

## :bulb: 除自身以外数组的乘积

给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。

题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。

请 不要使用除法，且在 O(n) 时间复杂度内完成此题。

输入: nums = [1,2,3,4]

输出: [24,12,8,6]

### 前缀积 * 后缀积

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const answer = [1];
    let mul = 1;
    //前缀和
    for(let i = 1; i< nums.length; i++) {
        mul = mul * nums[i -1]
        answer[i] = mul;
    }
    mul = 1;
    const arr = [];
    arr[nums.length -1] = 1;
    // 后缀和
    for (let i =nums.length - 2; i >= 0; i--) {
        mul = mul * nums[i+1];
        arr[i] = mul;     
    }
    for (let i = 0; i< nums.length; i++) {
        answer[i] = answer[i] * arr[i]
    }
    return answer;
};
```

## :bulb: 缺失的第一个正数（困难）

给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。

请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

输入: nums = [1,2,0]

输出: 3

解释: 范围 [1,2] 中的数字都在数组中。

```js
```
