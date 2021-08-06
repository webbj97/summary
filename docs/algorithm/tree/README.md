# 树

## 一、概述

树 是一种经常用到的数据结构，用来模拟具有树状结构性质的数据集合。

树里的每一个节点有一个值和一个包含所有子节点的列表。从图的观点来看，树也可视为一个拥有 N 个节点和 N-1 条边的一个有向无环图。

二叉树是一种更为典型的树状结构。如它名字所描述的那样，二叉树是每个节点最多有两个子树的树结构，通常子树被称作“左子树”和“右子树”。

在上节的介绍中，相信大家已经熟知了树和二叉树的基本概念。

本章节，我们把重点放在介绍二叉树中几种常见的遍历方法。掌握这几种遍历方法，会加深你对树这个数据结构的理解，并为以后的学习打下扎实的基础。

**本章目标：**

- 理解和区分树的遍历方法
- 能够运用递归方法解决树的为前序遍历、中序遍历和后序遍历问题
- 能用运用迭代方法解决树的为前序遍历、中序遍历和后序遍历问题
- 能用运用广度优先搜索解决树的层序遍历问题

## 树的遍历

前序遍历（根左右）：先访问根节点，然后遍历左子树，最后遍历右子树。
中序遍历（左根右）：先遍历左子树，然后访问根节点，然后遍历右子树。
后序遍历（左右根）：先遍历左子树，然后遍历右子树，最后访问树的根节点。

#### 二叉搜索树

```js
function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function BinarySearchTree() {
  this.root = null;

  this.insert = function(val) {
    let node = new Node(val);
    if (this.root === null) {
      this.root = node;
    } else {
      this.insertNode(this.root, node);
    }
  };
  this.insertNode = function(node, newNode) {
    if (node.val > newNode.val) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  };
  this.show = function(params) {
    console.log(this.root);
  };
}
```

#### 前序遍历

```js
function preTraverse(callback) {
  preTraverseNode(root, callback);
}

function preTraverseNode(node, callback) {
  if (node !== null) {
    callback(node.val); // 根节点
    preTraverseNode(node.left, callback); // 左节点
    preTraverseNode(node.right, callback); // 右节点
  }
}
```

#### 中序遍历

从位置上，是`左根右`

```js
function inOrderTraverse(callback) {
  inOrderTraverseNode(root, callback);
}

function inOrderTraverseNode(node, callback) {
  if (node !== null) {
    inOrderTraverseNode(node.left, callback);
    callback(node.val);
    inOrderTraverseNode(node.right, callback);
  }
}
```

#### 后序遍历

```js
function endTraverse(callback) {
  endTraverseNode(root, callback);
}
function postorderNode(node, callback) {
  if (node !== null) {
    postorderNode(node.left, callback);
    postorderNode(node.right, callback);
    callback(node);
  }
}
function endTraverseNode(node, callback) {
  if (node !== null) {
    endTraverseNode(node.left, callback); // 左节点
    endTraverseNode(node.right, callback); // 右节点
    callback(node.val); // 根节点
  }
}
```
