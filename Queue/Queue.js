export default class Queue {
    constructor() {
        this.head = null;
        this.tail = null;

    }

    enqueue(data) {
        const newNode = {
            data: data,
            next: null
        };
        if (this.head === null) {
            // Køen er tom: head og tail er den samme node
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Køen er ikke tom: hæng ny node bagpå
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    dequeue() {
        if (this.head === null) {
            // Køen er tom
            return null;
        }

        // Gem data fra forreste node
        const value = this.head.data;

        // Flyt head frem til næste node
        this.head = this.head.next;

        // Hvis køen nu er tom, skal tail også være null
        if (this.head === null) {
            this.tail = null;
        }

        return value;
    }

    peek() {
        return this.head ? this.head.data : null;
    }

    size() {
        let count = 0;
        let current = this.head;
        while (current !== null) {
            count++;
            current = current.next;
        }
        return count;
    }

    get(index) {
        let current = this.head;
        let count = 0;
        while (current !== null) {
            if (count === index) {
                return current.data;
            }
            count++;
            current = current.next;
        }
        return null;
    }



}