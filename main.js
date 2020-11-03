// dependencies
const prompts = require('prompts');

// program vars
let maximum_nodes = 8;

let keepGoing = true;

// root node for path (tree parent)
const rootNode = {};

// custom node type object (can be any type)
const Node = () => ({});
Node.fromValue = (value) => {
  const node = Node();
  node.value = value;
  return node;
};

const traversePath = () => {
  // returns element at end of path
  let current = rootNode;
  while (current.next) {
    current = current.next;
  }
  return current; // last node in path
};
const getAllPathNodes = () => {
  // returns element at end of path
  const list = [];
  let current = rootNode;
  while (current.next) {
    list.push(current);
    current = current.next;
  }
  return list; // last node in path
};
const addPathNode = (node) => {
  const last = traversePath();
  last.next = node;
  return traversePath();
};
const removeNode = (pos) => {
  let i = 0;
  let current = rootNode;
  let previous = current;
  while (current.next) {
    previous = current;
    current = current.next;
    i += 1;
    if (i === pos) {
      previous.next = current.next;
      current.next = undefined;
      return current;
    }
  }
  return current;
};
const insertNodeAt = (node, pos) => {
  if (pos === 0) return; // reserved for head (null)
  let current = rootNode;
  let previous = current;
  let i = 0;
  while (i < pos && current.next) {
    previous = current;
    current = current.next;
    i += 1;
  }
  previous.next = node;
  node.next = current.next;
  current.next = undefined;
  current = node;
  // return current;
};
const createPathNodes = (limit) => {
  let i = 0;
  for (i; i < limit; i += 1) {
    const a = Node();
    a.value = i; // (Math.random(0,10) * 10).toFixed(0);
    addPathNode(a);
  }
};
const showPathDebug = () => {
  let i = 0;
  let current = rootNode;
  while (current.next) {
    i += 1;
    // iterate and print path
    current = current.next;
    console.log(`${i}: ${JSON.stringify(current, ['value'], 0)}`);
  }
};
/* TESTING OPERATIONS */
const loadOperationsPrompt = async () => {
  showPathDebug();
  const response = await prompts({
    type: 'text',
    name: 'answer',
    message: `
Choose an operation:\n
Add a new node:\tPress 1...8
Remove last node:\tPress 9
Create 10+ nodes:\tPress 10+
Clear all nodes:\tPress 0
Quit: Press 'q'
`,
  });
  // console.log('response.answer: ', response.answer);
  if (response.answer <= 8 && response.answer > 0) {
    const node = addPathNode(Node.fromValue(response.answer));
    console.log('added new node: ', node);
    // console.log('getAllPathNodes(): ', getAllPathNodes());
  } else if (response.answer.includes(9)) {
    // let node = traversePath();
    // console.log('getAllPathNodes().length: ', getAllPathNodes().length);
    const node = removeNode(getAllPathNodes().length);
    console.log('removed node: ', node);
    // console.log('getAllPathNodes(): ', getAllPathNodes());
  } else if (response.answer.includes(0)) {
    // clear node path
    const nodes = getAllPathNodes();
    nodes.forEach((item) => {
      delete item.value;
      delete item.next;
    });
  } else if (response.answer >= 10) {
    let i = 0;
    for (i; i < response.answer; i += 1) {
      addPathNode(Node.fromValue((Math.random(0, 10) * 10).toFixed(0)));
    }
  } else if (response.answer.toLowerCase() === 'q') {
    keepGoing = false;
    return;
  } else {
    showPathDebug();
  }
  loadOperationsPrompt();
};
const loadUserPrompt = () => {
  (async () => {
    const response = await prompts({
      type: 'text',
      name: 'answer',
      message: `\nenter number to create nodes
enter "q" to quit\n
`,
    });
    if (response.answer.toLowerCase() === 'q') keepGoing = false;
    else if (keepGoing) {
      maximum_nodes = !isNaN(response.answer) ? response.answer : maximum_nodes;
      createPathNodes(maximum_nodes);
      loadOperationsPrompt();
    }
  })();
};
const main = () => {
  // console.log('keepGoing: ', keepGoing);
  // // GENERATE LINKED LIST
  // createPathNodes(maximum_nodes);
  // // TEST: REMOVE NODE
  // removeNode(4);
  // // TEST: ADD NEW NODE
  // addPathNode(Node.fromValue(420));
  // // TEST: INSERT NODE AT POSITION IN PATH
  // insertNodeAt(Node.fromValue(360), 3);
  // showPathDebug();
  if (keepGoing) {
    // start again
    loadUserPrompt();
  }
};
// statement
main();
