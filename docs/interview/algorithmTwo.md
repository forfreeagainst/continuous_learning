# letcode100道题

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

## :bulb: 全排列（回溯算法）

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

## 二分查找：题号704

给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

输入: nums = [-1,0,3,5,9,12], target = 9

输出: 4

解释: 9 出现在 nums 中并且下标为 4

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    // 只有一个元素，判断要不要while循环。显然要，所以是等于
    while(left <= right) {
        const middle = (left + right) // 2;
        if (nums[middle] > target) {
            right = middle - 1;
        } else if (nums[middle] < target) {
            left = middle + 1;
        } else {
            return middle;
        }
    }
    return -1;
};
```

## 有序数组的平方: 题号977

给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

输入：nums = [-4,-1,0,3,10]

输出：[0,1,9,16,100]

解释：平方后，数组变为 [16,1,0,9,100]

排序后，数组变为 [0,1,9,16,100]

###  非递减顺序 排序的整数数组 nums：最大值一定是在左端/右端

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    let len = nums.length - 1;
    const res = [];
    // 题目中的数组比较特殊，非递减顺序排序
    while(left <= right) {
        const l = nums[left] * nums[left];
        const r = nums[right] * nums[right];
        if (l > r) {
            res[len --] = l;
            left ++;                      
        } else {
            res[len --] = r;
            right --;
        }        
    }
    return res;
};
```

### 时间复杂度nlogn

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    for(let i = 0 ;i < nums.length; i++) {
        nums[i] = nums[i] * nums[i];
    }
    return nums.sort((a, b) => a - b);
};
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
