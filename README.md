# Fliping_cards
![flippingCardGif](https://github.com/DrizztDuncan/Fliping_cards/assets/39251171/657fed18-765f-452c-b564-0dbdee9f1a6b)
## Intro
### [Demo](https://codepen.io/drizztduncan/pen/WNgmJVj)
This is a classic memory card game with a deck of 52 cards.
The code defines three main components: the view, the model, the controller, and the utility.

```jsx
**// rendering the game elements and updating the DOM
const view = {
...
};

// maintaining the game state
const model = {
...
};

// handling user input and updating the game state accordingly
const controller = {
...
};

// getRandomNumberArray() takes one parameter "count", 
// which represents the number of elements in the resulting array.
const utility = {
...
};**
```

### view component

The view contains a number of functions that generate HTML elements based on the game state, such as **`getCardElement`**, which generates a **`div`** element representing a card, and **`getCardContent`**, which generates the content for the front face of a card. The **`displayCards`** function is used to display a set of cards, while the **`flipCards`** function is used to flip one or more cards over. Other functions are used to update the score and the number of tries, and to display an animation when the player makes an incorrect match.

```jsx
displayCards(indexes) {
    const rootElement = document.querySelector("#cards");
    rootElement.innerHTML = indexes
      .map((index) => this.getCardElement(index))
      .join("");
  },
```

- The **`map`** method iterates over each index in the **`indexes`** array and calls the **`getCardElement`** method with the current index.
- The **`getCardElement`** method is assumed to be defined elsewhere, and it returns a string representation of a card element based on the provided index.
- The resulting array of card element strings is joined together using the **`join`** method with an empty string as the separator.

```jsx
flipCards(...cards) {
    cards.map((card) => {
      if (card.classList.contains("back")) {
        card.classList.remove("back");
        card.innerHTML = this.getCardContent(Number(card.dataset.index));
        return;
      }
      card.classList.add("back");
      card.innerHTML = null;
    });
  },
```

- If the **`card`** element has the class "back" (checked using **`classList.contains("back")`**), it removes the "back" class from the **`card`** element using **`classList.remove("back")`**.
- It sets the inner HTML of the **`card`** element to the result of calling **`this.getCardContent`** with the **`dataset.index`** attribute of the **`card`** converted to a number.
- If the **`card`** element does not have the class "back", it adds the "back" class to the **`card`** element using **`classList.add("back")`**.
- It sets the inner HTML of the **`card`** element to **`null`**.

### model component

The model contains an array **`revealedCards`** that holds the cards that have been flipped over, and functions to check whether the cards match and update the score and number of tries.

### controller component

The controller defines a **`currentState`** variable that keeps track of the current game state, and a **`dispatchCardAction`** function that handles card clicks. When a card is clicked, the **`dispatchCardAction`** function flips the card over and updates the game state. If the cards match, the score is updated and the cards are removed from the board. If the cards do not match, an animation is displayed, and the cards are flipped back over.

### utility component

Generates an array of random numbers. It uses the [Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) to shuffle the numbers in the array randomly.

```jsx
**getRandomNumberArray(count) {
    const number = Array.from(Array(count).keys());
    for (let index = number.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1));
      [number[index], number[randomIndex]] = [
        number[randomIndex],
        number[index],
      ];
    }
    return number;
  },**
```

The `**getRandomNumberArray**` method creates an array of consecutive integers from 0 to `count-1` using the `**Array.from()**` method and the `**keys()**` method of the `**Array**` object. 

It then shuffles the array using the Fisher-Yates shuffle algorithm, which swaps each element in the array with a randomly chosen element from the remaining unshuffled elements. Finally, it returns the shuffled array.

The code also defines two constants: **`GAME_STATE`**, which is an object that maps game states to string values, and **`Symbols`**, which is an array of image URLs representing the card symbols.

### methods

> *The **`Array.from()`** static method creates a new, shallow-copied `Array` instance from an [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol) or [array-like](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects) object. - [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)*
> 

```jsx
*// Array.from(arrayLike, mapFn)*
*console.log(Array.from([1, 2, 3], x => x + x));
// Expected output: Array [2, 4, 6]*
```

> *The **`Object.keys()`** static method returns an array of a given object's own enumerable string-keyed property names. - [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)*
> 

```jsx
*// Strings have indices as enumerable own properties
console.log(Object.keys("foo")); // ['0', '1', '2']*
```
