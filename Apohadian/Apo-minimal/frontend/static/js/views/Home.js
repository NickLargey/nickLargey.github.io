import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("The Apohadion Theater");
  }

  async getHtml() {
    return `
    <div class="container">
      <div class="header"><img src="./static/assets/recordLogo.png" class="logo" /></div>
      <nav class="sidebar">
        <ul class="site-nav">
          <li><a href="/"  class="nav__link" data-link>Home</a></li>
          <li><a href="/calendar" class="nav__link" data-link>Calendar</a></li>
          <li><a href="/gallery" class="nav__link" data-link>Gallery</a></li>
          <li><a href="/shop" class="nav__link" data-link>Shop</a></li>
        </ul>
        </nav>
        <div class="title"><h1>The Apodhadion Theater</h1></div>
      <div class="content">
        <p> {History of the theater and some general information? Featured Gallery artist bio?}</p>
       <p> {filler} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>
      </div>
      <div class="footer"><p>107 Hanover St. Portland, Maine 04101 {Links to social media stuff}<p></div>
    </div>

    

      `;
  }
}
