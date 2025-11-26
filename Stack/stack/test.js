import Stack from "./stack.js";

const s = new Stack();

s.push("a");
s.push("b");
s.push("c");

console.log("peek:", s.peek());     // forventer "c"
console.log("size:", s.size());     // forventer 3
console.log("get(1):", s.get(1));   // forventer "b"

console.log("pop:", s.pop());       // forventer "c"
console.log("pop:", s.pop());       // forventer "b"
console.log("pop:", s.pop());       // forventer "a"
console.log("pop:", s.pop());       // forventer null