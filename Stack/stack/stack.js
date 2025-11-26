export default class Stack{
    constructor(){
        this.head = null;
    }

    push(data){
        const newNode = {
            data: data,
            next: this.head
        }

        this.head = newNode;
    }

    pop(){
        if(this.head === null){
            return null;
        }
        const topNode = {
            data: this.head,
            next: null
        }
        this.head = this.head.next;
        return topNode;
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

/* Du skal lave din egen Stack, implementeret med en (singly) linked list. Du skal ikke genbruge din SinglyLinkedList klasse og bygge oven på den, men lave en helt ny, selvstændig klasse. 

# Krav

Køen skal laves som én klasse `Stack`.

Klassen indeholder nodes - hver node er et objekt der linker til en anden node, og til et data-objekt. Du bestemmer selv om du også vil lave en klasse for den Node. 

Fordi stacken implementeres med en linked liste, kan den i princippet vokse uendeligt

<aside>
⛔

Du må ikke bruge hverken et JavaScript array med push, pop, shift, unshift eller et StaticArray med en stackpointer - det **skal** være en linked list!

</aside>

Klassen skal indeholde mindst en property

- `head` - som henviser til det øverste element i stacken, eller null hvis den er tom

Derudover skal den som minimum indeholde disse metoder

- `push( data )` - tilføjer en ny node, med reference til data-objektet, på toppen af stacken
- `pop()` - fjerner den node der ligger øverst på stacken, og returnerer det referede data-objekt
- `peek()` - returnerer data-objektet der ligger øverst på stacken, uden at fjerne det
- `size()` - fortæller hvor mange elementer der er i stacken
- `get( index )` - finder og returnerer elementet på plads ‘index’, hvor 0 er det øverste, uden at fjerne noget
*/