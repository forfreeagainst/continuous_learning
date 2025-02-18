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

## :bulb: 矩阵置零

给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。

一个直观的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。

一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。

你能想出一个仅使用常量空间的解决方案吗？

### 空间复杂度：O(Min(M,N))

```js
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    const mArr = new Set();
    const nArr = new Set();
    const m = matrix.length;
    const n = matrix[0].length;
    for(let row = 0; row < m; row ++ ) {
        for(let col = 0; col < n; col ++) {
            if (matrix[row][col] === 0) {
                mArr.add(row);
                nArr.add(col);
            }
        }
    }
    for(let row = 0; row < m; row ++ ) {
        for(let col = 0; col < n; col ++) {
            if (mArr.has(row)) {
                matrix[row][col] = 0;
            }
            if (nArr.has(col)) {
                matrix[row][col] = 0;
            }
        }
    }
};
```

## :bulb: 螺旋矩阵

给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。

输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]

输出：[1,2,3,6,9,8,7,4,5]

```js
var spiralOrder = function(matrix) {
    const order = [];
    const rows = matrix.length, columns = matrix[0].length;
    let left = 0, right = columns - 1, top = 0, bottom = rows - 1;
    while (left <= right && top <= bottom) {
        for (let column = left; column <= right; column++) {
            order.push(matrix[top][column]);
        }
        for (let row = top + 1; row <= bottom; row++) {
            order.push(matrix[row][right]);
        }
        if (left < right && top < bottom) {
            for (let column = right - 1; column > left; column--) {
                order.push(matrix[bottom][column]);
            }
            for (let row = bottom; row > top; row--) {
                order.push(matrix[row][left]);
            }
        }
        [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1];
    }
    return order;
};
```

## :bulb: 旋转图像

给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。

你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。

输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]

输出：[[7,4,1],[8,5,2],[9,6,3]]

### 每四个点，进行位置迁移

```js
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
     const n = matrix.length;
    for (let i = 0; i < Math.floor(n / 2); i++) {
        for (let j = 0; j < Math.floor((n + 1) / 2); j++) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[n - j - 1][i];
            matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
            matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
            matrix[j][n - i - 1] = temp;
        }
    }
};
```

### 暴力解法：用一个新的矩阵。规律：行变成列，列变成行

略

## :bulb: 搜索二维矩阵 II

编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：

每行的元素从左到右升序排列。

每列的元素从上到下升序排列。

输入: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22]] , target = 5

输出: true

### 时间复杂度O(M+N)

```js
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    let x = 0;
    let y = matrix[0].length - 1;
    while (x < matrix.length && y >= 0) {
        if (matrix[x][y] === target) {
            return true;
        }
        if (matrix[x][y] > target) {
            --y;
        } else {
            ++x;
        }
    }
    return false;
};
```

## :bulb: 相交链表

给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。

图示两个链表在节点 c1 开始相交：

题目数据 保证 整个链式结构中不存在环。

注意，函数返回结果后，链表必须 保持其原始结构 。

### 双指针（时间复杂度O(m+n)，空间复杂度：O(1)）

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if (headA === null || headB === null) {
        return null;
    }
    let pA = headA, pB = headB;
    while (pA !== pB) {
        pA = pA === null ? headB : pA.next;
        pB = pB === null ? headA : pB.next;
    }
    return pA;
};
```

### 哈希集合（时间复杂度O(m+n)，空间复杂度：O(m)）

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    const visited = new Set();
    let temp = headA;
    while (temp !== null) {
        visited.add(temp);
        temp = temp.next;
    }
    temp = headB;
    while (temp !== null) {
        if (visited.has(temp)) {
            return temp;
        }
        temp = temp.next;
    }
    return null;
};
```

## :bulb: 反转链表

给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

输入：head = [1,2,3,4,5]

输出：[5,4,3,2,1]

### 迭代的方式

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
     let prev = null;
    let curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
};
```

## 回文链表

给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。

如果是，返回 true ；否则，返回 false 。

### 使用数组的方式

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    const arr = [];
    while (head !== null) {
        arr.push(head.val);
        head = head.next;
    }
    for (let i = 0, j = arr.length - 1; i < j; ++i, --j) {
        if (arr[i] !== arr[j]) {
            return false;
        }
    }
    return true;
};
```

### 递归

```js

```

## :bulb: 环形链表

给你一个链表的头节点 head ，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。

为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。

注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。

如果链表中存在环 ，则返回 true 。 否则，返回 false 。

### 快慢指针

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if(!head || !head.next) return false;
    //建立双指针
    var p = head;
    //快指针P下一个结点或下下结点不存在跳出循环，返回false
    while(p.next && p.next.next){
        p = p.next.next    //快指针一次走两步
        head = head.next    //慢指针一次走一步
        if(p == head){    //快慢指针指向同一位置时存在环
            return true    
        }
    }
    return false
}
```

## :bulb: 环形链表 II

给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。

为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。

如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

不允许修改 链表。

输入：head = [3,2,0,-4], pos = 1

输出：返回索引为 1 的链表节点

解释：链表中有一个环，其尾部连接到第二个节点。

### 快慢指针（空间复杂度O(1)）

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    if (head === null) {
        return null;
    }
    let slow = head, fast = head;
    while (fast !== null) {
        slow = slow.next;
        if (fast.next !== null) {
            fast = fast.next.next;
        } else {
            return null;
        }
        if (fast === slow) {
            let ptr = head;
            while (ptr !== slow) {
                ptr = ptr.next;
                slow = slow.next;
            }
            return ptr;
        }
    }
    return null;
};
```

### 哈希表+链表

```js
var detectCycle = function(head) {
    const visited = new Set();
    while (head !== null) {
        if (visited.has(head)) {
            return head;
        }
        visited.add(head);
        head = head.next;
    }
    return null;
};
```

## :bulb: 合并两个有序链表

将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

输入：l1 = [1,2,4], l2 = [1,3,4]

输出：[1,1,2,3,4,4]

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    let newList = new ListNode(-1);
    let p = newList;
    while(list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            p.next = list1;
            list1 = list1.next;
        } else {
            p.next = list2;
            list2 = list2.next;
        }
        p = p.next;
    }
    p.next = list1 === null ? list2: list1;
    return newList.next;
};
```

## :bulb: 两数相加

```js
```

## TODO省略

## :bulb: 爬楼梯

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

输入：n = 3

输出：3

解释：有三种方法可以爬到楼顶。

1. 1 阶 + 1 阶 + 1 阶

2. 1 阶 + 2 阶

3. 2 阶 + 1 阶

### 动态规划简单题

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    const arr = [1, 1];
    for(let i = 2;i<= n;i++) {
        arr[i] = arr[i-1] + arr[i -2];
    }
    return arr[n];
};
```

## :bulb: 全排列

给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

输入：nums = [1,2,3]

输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

### 回溯算法

回溯法：一种通过探索所有可能的候选解来找出所有的解的算法。如果候选解被确认不是一个解（或者至少不是最后一个解），回溯算法会通过在
上一步进行一些变化抛弃该解，即回溯并且再次尝试。

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const result = [];
    const used = new Array(nums.length).fill(false);

    // 回溯函数
    function backtrack(path) {
        // 当路径的长度等于数组的长度时，说明已经找到了一个全排列
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            // 如果当前数字已经被使用过，则跳过
            if (used[i]) continue;

            // 选择当前数字
            path.push(nums[i]);
            used[i] = true;

            // 递归调用回溯函数
            backtrack(path);

            // 撤销选择
            path.pop();
            used[i] = false;
        }
    }
    
    // 从空路径开始回溯
    backtrack([]);

    return result;
};
```

## TODO省略

## :bulb: 杨辉三角

给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行

在「杨辉三角」中，每个数是它左上方和右上方的数的和。

```js
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    const nums = [];
    for(let i = 0; i < numRows; i++) {
        const row = new Array(i + 1).fill(1);
        for(let j = 1; j< row.length - 1; j++) {
            row[j] = nums[i - 1][j - 1] + nums[i - 1][j]
        }
        nums.push(row);
    }
    return nums;
};
```

## :bulb: 打家劫舍冲冲冲

给定一个代表每个房屋存放金额的非负整数数组，不能偷相邻两个房间的情况下 ，一夜之内能够偷窃到的最高金额。

### 先寻找递归规律，再动态规划

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const len = nums.length;
    if (len === 0) return 0;
    if (len === 1) return nums[0];
    const arr = [];
    arr[0] = nums[0];
    arr[1] = Math.max(nums[0], nums[1]);
    for(let i = 2; i < len;i ++) {
        arr[i] = Math.max(arr[i -1], arr[i - 2] + nums[i]);
    }
    return arr[len -1];
};
```

### 同上思路，优化空间复杂度

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const len = nums.length;
    if (len === 0) return 0;
    if (len === 1) return nums[0];
    let first = nums[0];
    let second = Math.max(nums[0], nums[1]);
    for(let i = 2; i < len; i++) {
        let temp = second;
        second = Math.max(second, first + nums[i]);
        first = temp;
    }
    return second;
};
```

## :bulb: 完全平方数

给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。

完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。

输入：n = 13

输出：2

解释：13 = 4 + 9

### 动态规划（时间复杂度：O(n * 根号n), 空间复杂度：O(n) ）

最大值： Number.MAX_VALUE

```js
var numSquares = function(n) {
    const f = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        let minn = Number.MAX_VALUE;
        for (let j = 1; j * j <= i; j++) {
            minn = Math.min(minn, f[i - j * j]);
        }
        f[i] = minn + 1;
    }
    return f[n];
};
```

### 巧用数学公式（四平方和定理）

「四平方和定理」: n = 4 ^ k × (8m + 7) 时，n 只能被表示为四个正整数的平方和。此时我们可以直接返回 4。

```js
var numSquares = function(n) {
    if (isPerfectSquare(n)) {
        return 1;
    }
    for (let i = 1; i * i <= n; i++) {
        let j = n - i * i;
        if (isPerfectSquare(j)) {
            return 2;
        }
    }
    if (checkAnswer4(n)) {
        return 4;
    }
    return 3;
}

// 判断是否为完全平方数
const isPerfectSquare = (x) => {
    const y = Math.floor(Math.sqrt(x));
    return y * y == x;
}

// 判断是否能表示为 4^k*(8m+7)
const checkAnswer4 = (x) => {
    while (x % 4 == 0) {
        x /= 4;
    }
    return x % 8 == 7;
}
```

## :bulb: 零钱兑换

给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。

计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。

你可以认为每种硬币的数量是无限的。

### 动态规划中等题

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    //初始化一个长度为12，用来存储状态的数组，默认值填充为amount+1,也可以填充为最大值，用来后续比较。
    let dp = new Array(amount + 1).fill(amount + 1)
    //设置初始0的最少硬币为0
    dp[0] = 0
    //分别处理标记0-amount的状态值
    for (let i = 0; i < dp.length; i++) { 
        //用不同的硬币种类去判断各种情况
        for (let j = 0; j < coins.length; j++) { 
            //如果当前金额大于当前判断的硬币
            if (i - coins[j] >= 0) {
                //dp[i-coins[j]]获得该价格下的最优数量
                dp[i] = Math.min(dp[i], 1 + dp[i - coins[j]]) 
            }
        }
    }
    //是否初始化的值，如果是初始值说明没有兑换成功
    return (dp[amount] === amount + 1) ? -1 : dp[amount]
};
```

## :bulb: 单词拆分

给你一个字符串 s 和一个字符串列表 wordDict 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。

注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

输入: s = "leetcode", wordDict = ["leet", "code"]

输出: true

解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。

### DP，时间复杂度O(n的平方)，空间复杂度O(n)

```js
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    const n = s.length;
    const wordDictSet = new Set(wordDict);
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;
    for(let i = 0; i <= n; i++) {
        for(let j = 0; j < i; j++) {
            if (dp[j] && wordDictSet.has(s.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[n];
};
```
