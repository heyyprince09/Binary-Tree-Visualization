class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        const queue = [this.root];
        while (queue.length > 0) {
            const current = queue.shift();
            if (current.left === null) {
                current.left = newNode;
                return;
            } else {
                queue.push(current.left);
            }
            if (current.right === null) {
                current.right = newNode;
                return;
            } else {
                queue.push(current.right);
            }
        }
    }

    delete(value) {
        this.root = this._deleteRecursive(this.root, value);
    }

    _deleteRecursive(node, value) {
        if (node === null) return null;

        if (node.value === value) {
            if (node.left === null && node.right === null) return null;
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            const successor = this._findMin(node.right);
            node.value = successor.value;
            node.right = this._deleteRecursive(node.right, successor.value);
            return node;
        }

        node.left = this._deleteRecursive(node.left, value);
        node.right = this._deleteRecursive(node.right, value);
        return node;
    }

    _findMin(node) {
        while (node.left !== null) node = node.left;
        return node;
    }

    search(value) {
        return this._searchRecursive(this.root, value);
    }

    _searchRecursive(node, value) {
        if (node === null) return false;
        if (node.value === value) return true;
        return this._searchRecursive(node.left, value) || this._searchRecursive(node.right, value);
    }

    traverse(type) {
        let result = [];
        switch (type) {
            case 'inorder':
                this._inorderRecursive(this.root, result);
                break;
            case 'preorder':
                this._preorderRecursive(this.root, result);
                break;
            case 'postorder':
                this._postorderRecursive(this.root, result);
                break;
            case 'levelorder':
                this._levelOrder(result);
                break;
        }
        return result.join(' ');
    }

    _inorderRecursive(node, result) {
        if (node !== null) {
            this._inorderRecursive(node.left, result);
            result.push(node.value);
            this._inorderRecursive(node.right, result);
        }
    }

    _preorderRecursive(node, result) {
        if (node !== null) {
            result.push(node.value);
            this._preorderRecursive(node.left, result);
            this._preorderRecursive(node.right, result);
        }
    }

    _postorderRecursive(node, result) {
        if (node !== null) {
            this._postorderRecursive(node.left, result);
            this._postorderRecursive(node.right, result);
            result.push(node.value);
        }
    }

    _levelOrder(result) {
        if (this.root === null) return;

        const queue = [this.root];
        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current.value);

            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
        }
    }
}

const tree = new BinaryTree();

function insertNodes() {
    const values = document.getElementById('insertValues').value.split(' ').map(Number);
    values.forEach(value => tree.insert(value));
    displayTraversals();
}

function deleteNode() {
    const value = Number(document.getElementById('deleteValue').value);
    tree.delete(value);
    displayTraversals();
}

function searchNode() {
    const value = Number(document.getElementById('searchValue').value);
    const result = tree.search(value) ? 'Found' : 'Not Found';
    document.getElementById('searchResult').innerText = `Searching for ${value}: ${result}`;
}

function traverse(type) {
    const result = tree.traverse(type);
    document.getElementById('traversalResult').innerText = `${type.charAt(0).toUpperCase() + type.slice(1)} Traversal: ${result}`;
}

function displayTraversals() {
    traverse('inorder');
    traverse('preorder');
    traverse('postorder');
    traverse('levelorder');
}
