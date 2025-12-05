// test_tree.js

const { Tree, Node } = require('./tree.js');

const tree = new Tree('root');
const nodeA = tree.addValue('A');
const nodeB = tree.addValue('B');
const nodeC = nodeA.appendChild(new Node('C'));

console.log('--- DUMP AFTER ADDING ---');
tree.dump();

console.log('\nfindValue("A"):', tree.findValue('A')?.value);
console.log('findValue("C"):', tree.findValue('C')?.value);
console.log('findValue("X") (should be null):', tree.findValue('X'));

console.log('\nFirst child of A:', nodeA.firstChild()?.value);
console.log('Has child nodes A:', nodeA.hasChildNodes());
console.log('Has child nodes B:', nodeB.hasChildNodes());

console.log('\nRemoving value "A"...');
tree.removeValue('A');
tree.dump();
