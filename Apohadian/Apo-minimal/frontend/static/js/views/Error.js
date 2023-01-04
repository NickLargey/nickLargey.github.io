import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("The Apohadion Theater");
  }

  async getHtml() {
    return `<h1> 404 ERROR >> NOT FOUND </h1>

        <a href="/home" data-link>HOME</a>
      `;
  }
}
