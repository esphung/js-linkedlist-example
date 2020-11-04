'''
/*
* LINKEDLIST PYTHON EXAMPLE
* AUTHOR: ERIC PHUNG
*/
'''

class Node:
    def __init__(self, value=None):
        self.value = value
        self.next = None
    def show(self):
        print("{}".format({
        "value": self.value,
        "next": self.next
    }))

def createRootNode():
    return Node()

def createPath(length, root):
    current = root
    for i in range(0, length):
        previous = current
        node = Node(i)
        node.next = previous.next
        previous.next = node
        current = node
        # print(previous.show())
        # print("{}".format(i))
    return current
def insertNode(node, rootNode):
    current = node
    previous = rootNode
    current.next = previous.next
    # current.show()
    return current # last item in path

def displayPath(root):
    current = root
    i = 0
    while current.next:
        # print("{}:{}".format(i, current))
        current.show()
        previous = current
        current = previous.next
        i += 1
    return root
def deleteNodeAt(pos, root):
    current = root
    i = 0
    while i < pos and current.next:
        previous = current
        current = previous.next
        i += 1
        if i == pos:
            previous.next = current.next
            current.next = None
            current = None

def searchByPos(pos, root):
    current = root
    i = 0
    while i < pos and current.next:
        i += 1
        previous = current
        current = current.next
        if i == pos:
            return current
    if i != pos:
        current = None
    return current

# unit testing
root = createRootNode()
createPath(8, root)
# displayPath(root)

# INSERTION OP
insertNode(Node(45), root)

# DISPLAY OP
displayPath(root)

# DELETION OP
deleteNodeAt(1, root)
# displayPath(root)

# SEARCH OP
found = searchByPos(6, root)
# print(found)

