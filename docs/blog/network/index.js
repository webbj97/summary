function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const l1 = {
    val: 5,
    next: {
        val: 0,
        next: {
            val: 7,
            next: null,
        },
    },
};
const l2 = {
    val: 7,
    next: {
        val: 1,
        next: {
            val: 4,
            next: null,
        },
    },
};
417 + 305;

const addTwoNumbers = function(l1, l2) {
    const head = new ListNode("head", null);
    let cur = head;
    let temp = 0;
    let car = false; // 进位
    while (l1 || l2) {
        // 运算
        const _val1 = l1 ? l1.val : 0;
        const _val2 = l2 ? l2.val : 0;
        const sum = _val1 + _val2 + (car ? 1 : 0);
        temp = sum >= 10 ? sum % 10 : sum;
        car = sum >= 10;
        // 链接
        const node = new ListNode(temp, null);
        cur.next = node;
        cur = cur.next;
        // 移动
        l1 && (l1 = l1.next);
        l2 && (l2 = l2.next);
    }
    if (car) {
        cur.next = new ListNode(1); // 补进位
    }
    return head.next;
};

const res = addTwoNumbers(l1, l2);
console.log("res:", res);
