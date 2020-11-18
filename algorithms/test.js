/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-04-14 11:45:03
 */
/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-04-14 11:45:03
 */
function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = show
}

function show() {
    console.log('this.data:', this.data);
    return this.data
}

function BST() {
    this.root = null;
    this.insert = insert;
    this.inOrder = inOrder
    this.getMin = getMin;
    this.getMax = getMax;
    this.find = find;
    this.remove = remove;
}


/**
 * @description: 插入节点
 * @param {data: Number}
 * @return:
 */
function insert(data) {
    var n = new Node(data, null, null)
    if (this.root == null) {
        this.root = n
    } else {
        var current = this.root
        var parent
        while (true) {
            parent = current
            if (data < current.data) {
                current = current.left;
                if (current == null) {
                    parent.left = n
                    break;
                }
            } else {
                current = current.right;
                if (current == null) {
                    parent.right = n
                    break;
                }
            }
        }
    }
}

/**
 * @description: 中序遍历
 * @param {type}
 * @return:
 */
function inOrder(node) {
    if (!(node == null)) {
        inOrder(node.left);
        node.show()
        inOrder(node.right);
    }
}

/**
 * @description: 先序遍历
 * @param {type}
 * @return:
 */
function preOrder(node) {
    if (!(nide == null)) {
        node.show()
        preOrder(node.left)
        preOrder(node.right)
    }
}

/**
 * @description: 后序遍历
 * @param {type}
 * @return:
 */
function postOrder(node) {
    if (!(node == null)) {
        postOrder(node.left)
        postOrder(node.right)
        node.show()
    }
}

/**
 * @description: 查找最小值
 * @param {type}
 * @return:
 */
function getMin() {
    var current = this.root;
    while (current.left != null) {
        current = current.left
    }
    console.log('min:', current.data);
    return current.data
}

/**
 * @description: 查找最小值
 * @param {type}
 * @return:
 */
function getMax() {
    var current = this.root;
    while (current.right != null) {
        current = current.right
    }
    console.log('max:', current.data);
    return current.data
}

/**
 * @description: 查找指定值
 * @param {type}
 * @return:
 */
function find(data) {
    var current = this.root;
    while (current != null) {
        if (current.data = data) return current;
        else if (data < current.data) {
            current = current.left
        } else {
            current = current.right
        }
    }
    return null
}



function remove(data) {
    root = removeNode(this.root, data);
}

function removeNode(node, data) {
    if (node == null) {
        return null;
    }
    if (data == node.data) {
        // 没有子节点的节点
        if (node.left == null && node.right == null) return null;
        // 没有左子节点的节点
        if (node.left == null) return node.right;
        // 没有右子节点的节点
        if (node.right == null) return node.left;
        // 有两个子节点的节点
        var tempNode = getMin(node.right);
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
    } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
    } else {
        node.right = removeNode(node.right, data);
        return node;
    }
}

var bst = new BST()
bst.insert(3)
bst.insert(4)
bst.insert(5)
bst.inOrder(bst.root)
bst.getMin()
bst.getMax()
bst.remove(5)
bst.inOrder(bst.root)