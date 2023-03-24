const Symbols = [
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png", // 黑桃
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17992/heart.png", // 愛心
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17991/diamonds.png", // 方塊
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png", // 梅花
];

const view = {
  getCardElement(index) {
    const number = (index % 13) + 1;
    const symbol = Symbols[Math.floor(index / 13)];
    return `
        <div class="card">
          <p>6</p>
          <img src="https://assets-lighthouse.alphacamp.co/uploads/image/file/17992/heart.png">
          <p>6</p>
        </div>
      `;
  },
  displayCards() {
    const rootElement = document.querySelector("#cards");
    rootElement.innerHTML = this.getCardElement();
  },
};
view.displayCards();
