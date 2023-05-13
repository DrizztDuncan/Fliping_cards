# Fliping_cards
### [Demo](https://codepen.io/drizztduncan/pen/WNgmJVj)
![flippingCardGif](https://github.com/DrizztDuncan/Fliping_cards/assets/39251171/657fed18-765f-452c-b564-0dbdee9f1a6b)
## Intro
This is a classic memory card game with a deck of 52 cards.
![flipCardIdea](https://github.com/DrizztDuncan/Fliping_cards/assets/39251171/75828a06-2375-4812-95bb-a119e7ed289f)
The code defines three main components: the view, the model, the controller.

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
};**
```

### view component

---

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
- The **`getCardElement`** method returns a string representation of each card element based on the provided index.
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
- If the **`card`** element does not have the class "back". It adds the "back" class to the **`card`** element using **`classList.add("back")`**.
- It sets the inner HTML of the **`card`** element to **`null`**.

### model component

---

The model contains an array **`revealedCards`** that holds the cards that have been flipped over, and functions to check whether the cards match and update the score and number of tries.

```jsx
const model = {
  revealedCards: [],
  isRevealedCardsMatched() {
    return (
      this.revealedCards[0].dataset.index % 13 ===
      this.revealedCards[1].dataset.index % 13
    );
  },
  score: 0,
  triedTimes: 0,
};
```

### **controller component**

---

The controller defines a **`currentState`** variable that keeps track of the current game state, and a **`dispatchCardAction`** function that handles card clicks. When a card is clicked, the **`dispatchCardAction`** function flips the card over and updates the game state. If the cards match, the score is updated and the cards are removed from the board. If the cards do not match, an animation is displayed, and the cards are flipped back over.

```jsx
const controller = {
	// update state
  currentState: GAME_STATE.FirstCardAwaits,
	// this function generates a random array of numbers representing the cards
  generateCards() {
    ...
  },
	// this function is called when a card is clicked.
	// it first checks if the card is not already flipped by 
	// verifying if it does not have the CSS class "back".
  dispatchCardAction(card) {
    ...
		// cards await flipping & matching numbers
		switch (this.currentState) {
		// flip 1st card
		case GAME_STATE.FirstCardAwaits:
		...
		// flip 2nd card
		case GAME_STATE.SecondCardAwaits:
		...
				// if card's numbers matched +10 point
				// keep matched cards revealed
				// return state to **FirstCardAwaits**
				if (model.isRevealedCardsMatched()) {
						...
						// game ends
						if (model.score === 260) {
						...
						}
				// card's number not matching
				// flip to card's back
				// return state to **FirstCardAwaits**
				} else {
				...
				}
		}
    }
    ...
  },
	// flip reavealed cards' to **back** with CSS
	// clear the **revealCards** array
	// return state to **FirstCardAwaits** 
  resetCards() {
    ...
  },
};
```

The **`generateCards()`**: This function generates a random array of numbers representing the cards and calls the **`displayCards()`** function of the **`view`** object to render the cards on the screen.

```jsx
generateCards() {
    view.displayCards(utility.getRandomNumberArray(52));
  },
```

- If the current state is **`GAME_STATE.FirstCardAwaits`**, the clicked card is flipped, added to the **`revealedCards`** array in the **`model`** object, and the **`currentState`** is updated to **`GAME_STATE.SecondCardAwaits`**.
- If the current state is **`GAME_STATE.SecondCardAwaits`**, the number of tried times is rendered on the view by incrementing the **`triedTimes`** property in the **`model`** object, the clicked card is flipped, added to the **`revealedCards`** array, and the function checks if the revealed cards match using the **`isRevealedCardsMatched()`** function in the **`model`** object.
    - If the revealed cards match, the score is updated by adding 10 points, the **`currentState`** is set to **`GAME_STATE.CardsMatched`**, the matched cards are visually paired on the view by calling the **`pairCards()`** function, the **`revealedCards`** array is cleared, and if the score reaches 260 (indicating all cards are matched), the game is finished, and the **`showGameFinished()`** function is called on the view.
    - If the revealed cards do not match, the **`currentState`** is set to **`GAME_STATE.CardsMatchFailed`**, an animation indicating a wrong match is appended to the revealed cards on the view by calling the **`appendWrongAnimation()`** function, and after a delay of 1 second, the revealed cards are flipped back, the **`revealedCards`** array is cleared, and the **`currentState`** is set to **`GAME_STATE.FirstCardAwaits`**.

```jsx
dispatchCardAction(card) {
    if (!card.classList.contains("back")) {
      return;
    }
    switch (this.currentState) {
      case GAME_STATE.FirstCardAwaits:
        view.flipCards(card);
        model.revealedCards.push(card);
        this.currentState = GAME_STATE.SecondCardAwaits;
        break;
      case GAME_STATE.SecondCardAwaits:
        view.renderTriedTimes(++model.triedTimes);
        view.flipCards(card);
        model.revealedCards.push(card);
        // 判斷配對是否成功
        if (model.isRevealedCardsMatched()) {
          // 配對成功
          view.renderScore((model.score += 10));
          this.currentState = GAME_STATE.CardsMatched;
          view.pairCards(...model.revealedCards);
          model.revealedCards = [];
          if (model.score === 260) {
            console.log("showGameFinished");
            this.currentState = GAME_STATE.GameFinished;
            view.showGameFinished(); // 加在這裡
            return;
          }
          this.currentState = GAME_STATE.FirstCardAwaits;
        } else {
          // 配對失敗
          this.currentState = GAME_STATE.CardsMatchFailed;
          view.appendWrongAnimation(...model.revealedCards);
          setTimeout(() => {
            view.flipCards(...model.revealedCards);
            model.revealedCards = [];
            this.currentState = GAME_STATE.FirstCardAwaits;
          }, 1000);
        }
        // 判斷配對是否成功
        break;
    }
    console.log("this.currentState", this.currentState);
    console.log(
      "revealedCards",
      model.revealedCards.map((card) => card.dataset.index)
    );
  },
```

`resetCards()` called when the game needs to be reset. It flips back all the cards in the **`revealedCards`** array on the view, clears the **`revealedCards`** array in the **`model`** object, and sets the **`currentState`** to **`GAME_STATE.FirstCardAwaits`**.

```jsx
resetCards() {
    view.flipCards(...model.revealedCards);
    model.revealedCards = [];
    controller.currentState = GAME_STATE.FirstCardAwaits;
  },
```

### **utility component**

---

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

### Notes

---

> *The **`Array.from()`** static method creates a new, shallow-copied `Array` instance from an [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol) or [array-like](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects) object. - [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)*
> 

```jsx
*// Array.from(arrayLike, mapFn)*
*console.log(Array.from([1, 2, 3], x => x + x));
// Expected output: Array [2, 4, 6]*
```

> *The **`Object.keys()`** static method returns an array of a given object's own enumerable string-keyed property names. - [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)*
>
