import Queue from './Queue.js'

console.log('test.js er loaded!');

const q = new Queue();

q.enqueue('a');
q.enqueue('b');
q.enqueue('c');

console.log(q.size());      // Forvent: 3
console.log(q.peek());      // Forvent: 'a'
console.log(q.dequeue());   // Forvent: 'a'
console.log(q.dequeue());   // Forvent: 'b'
console.log(q.dequeue());   // Forvent: 'c'
console.log(q.dequeue());   // Forvent: null
console.log(q.size());      // Forvent: 0
console.log(q.head, q.tail); // Forvent: null null