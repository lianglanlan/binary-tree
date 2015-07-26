var BNode = function(key,data){
	this.nodeKey = key;
	this.nodeData = [data];
	this.left = null;
	this.right = null;
	this.parent = null;
};
BNode.prototype = {
	constructor: BNode,
	getKey: function(){
		return this.nodeKey;
	},
	getData: function(){
		return this.nodeData;
	},
	attachData: function(node){
		if(node instanceof BNode){
			this.nodeData = this.nodeData.concat(node.getData());
			return this.nodeData.length;
		}
		return false;
	},
	detachData: function(){
		if(1 < this.nodeData.length){
			return this.nodeData.pop();
		}
		return false;
	},
	setData: function(node){
		if(node instanceof BNode){
			this.nodeKey = node.getKey();
			this.nodeData = node.getData();
		}else if(null === node){
			this.nodeKey = null;
			this.nodeData = [];
		}else{
			return false;
		}
		return true;
	},
	getLeft: function(){
		return this.left;
	},
	setLeft: function(node){
		var isInstance = node instanceof BNode;
		if(isInstance){
			node.setParent(this);
		}
		if(isInstance || null === node){
			this.left = node;
			return true;
		}
		return false;
	},
	getRight: function(){
		return this.right;
	},
	setRight: function(node){
		var isInstance = node instanceof BNode;
		if(isInstance){
			node.setParent(this);
		}
		if(isInstance || null === node){
			this.right = node;
			return true;
		}
		return false;
	},
	getParent: function(){
		return this.parent;
	},
	setParent: function(node){
		if(node instanceof BNode || null === node){
			this.parent = node;
			return true;
		}
		return false;
	},
	isLeaf: function(){
		return null === this.left && null === this.right;
	},
	isLeft: function(){
		return this.parent && this.parent.getLeft() === this;
	},
	isRight: function(){
		return this.parent && this.parent.getRight() === this;
	},
	compare: function(key){
		return this.nodeKey - key;
	}
};

var BST = function(){
	this.root = null;
};
BST.prototype = {
	constructor: BST,
	insert: function(node){
		var insert = function(node,parentNode){
			var compare = parentNode.compare(node.getKey());
			if(0 === compare){
				parentNode.attachData(node);
			}else if(0 < compare){
				var left = parentNode.getLeft();
				if(null === left){
					parentNode.setLeft(node);
				}else{
					insert(node,left);
				}
			}else{
				var right = parentNode.getRight();
				if(null === right){
					parentNode.setRight(node);
				}else{
					insert(node,right);
				}
			}
		};
		if(node instanceof BNode){
			if(null === this.root){
				this.root = node;
				return true;
			}
			insert(node,this.root);
			return true;
		}
		return false;
	},
	remove: function(key){
		var left,right,parent,isLeft,repNode;
		var removeNode = this.findNode(key);
		if(!removeNode){
			return false;
		}
		if(removeNode.isLeaf()){
			parent = removeNode.getParent();
			isLeft = removeNode.isLeft();
			removeNode.setData(null);
		}else{
			left = removeNode.getLeft();
			right = removeNode.getRight();
			repNode = left ? this.findMax(left) : this.findMin(right);
			parent = repNode.getParent();
			isLeft = repNode.isLeft();
			removeNode.setData(repNode);
			repNode.setData(null);
		}
		if(isLeft){
			parent.setLeft(null);
		}else{
			parent.setRight(null);
		}
		return true;
	},
	findNode: function(key){
		var findNode = function(key,parentNode){
			var compare;
			if(null === parentNode){
				return false;
			}
			compare = parentNode.compare(key);
			if(0 === compare){
				return parentNode;
			}
			if(0 < compare){
				return findNode(key,parentNode.getLeft());
			}
			return findNode(key,parentNode.getRight());
		};
		return findNode(key,this.root);
	},
	findMin: function(){
		var left;
		var parentNode = arguments.length ? arguments[0] : this.root;
		if(null === parentNode){
			return false;
		}
		left = parentNode.getLeft();
		return left ? this.findMin(left) : parentNode;
	},
	findMax: function(){
		var right;
		var parentNode = arguments.length ? arguments[0] : this.root;
		if(null === parentNode){
			return false;
		}
		right = parentNode.getRight();
		return right ? this.findMax(right) : parentNode;
	},
	inOrder: function(){
		var left,right;
		var arr = [];
		var leftArr = [];
		var rightArr = [];
		var parentNode = arguments.length ? arguments[0] : this.root;
		if(null !== parentNode){
			left = parentNode.getLeft();
			right = parentNode.getRight();
			if(null !== left){
				leftArr = this.inOrder(left);
			}
			if(null !== right){
				rightArr = this.inOrder(right);
			}
		}
		return leftArr.concat([parentNode],rightArr);
	}
};

/*
var testBST = function(bst){
	var order = bst.inOrder();
	var keyArr = [];
	for(var i = 0,len = order.length;i < len;++i){
		keyArr.push(order[i].getKey());
	}
	console.log(keyArr.toString());
}
var bst = new BST();
bst.insert(new BNode(50,50));
bst.insert(new BNode(3,3));
bst.insert(new BNode(10,10));
bst.insert(new BNode(5,5));
bst.insert(new BNode(100,100));
bst.insert(new BNode(56,56));
bst.insert(new BNode(78,78));

testBST(bst);

bst.remove(50);
testBST(bst);

bst.remove(100);
testBST(bst);
*/