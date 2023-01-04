import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("The Apohadion Theater");
  }

  async getHtml() {
    return `
    <style>
    @font-face {
  font-family: "CustomFont";
  src: url("./static/assets/fonts/audiowide-regular-webfont.woff") format(woff);
}

:root {
  box-sizing: border-box;
}

*,
::before,
::after {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}

body {
  background-color: rgb(0, 0, 0);
  font-family: Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  overflow: auto;
}
.container {
  background-color: rgba(173, 102, 102, 0.625);
  background-image: url("./static/assets/piano.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-blend-mode: difference;
  background-size: cover;
  display: grid;
  grid-template-areas:
    "header  header  header"
    "sidebar content content"
    "footer footer footer";
  grid-template-columns: 0.1fr 2fr;
  grid-template-rows: 0.5fr 3fr 0.5fr;
  height: 100vh;
  width: 100vw;
  gap: 0.5em;
  padding: 0;
  margin: 0;
  grid-auto-flow: dense;
  color: rgb(197, 197, 197);
}
.header {
  grid-area: header;
  /* border: green 1px solid; */
}

.logo {
  display: flex;
  width: 450px;
  height: auto;
  margin: auto;
}
.sidebar {
  /* border: pink 1px solid; */
  grid-area: sidebar;
  padding: 2em;
  margin: 1em;
}

.sidebar > a {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2em;
  color: white;
  font-family: "CustomFont", Arial, sans-serif;
  font-weight: normal;
  font-style: normal;
}

.content {
  /* border: blue 1px solid; */
  grid-area: content;
  position: relative;
  padding: 2em;
  margin: 0;
}

.content > h1 {
  text-align: left;
  font-family: "CustomFont", Arial, sans-serif;
  font-weight: normal;
  font-style: normal;
}

.content > p {
  padding: 0.5em;
}

.footer {
  grid-area: footer;
  padding: 0;
  margin: 1em;
  /* border: yellow 1px solid; */
}

.footer > p {
  text-align: right;
}
</style>
    <div class="container">
      <div class="header"><img src="./static/assets/logo.png" class="logo" /></div>
      <nav class="sidebar">
        <a href="/" class="nav__link" data-link>Home</a>
        <a href="/calendar" class="nav__link" data-link>Calendar</a>
        <a href="/gallery" class="nav__link" data-link>Gallery</a>
        <a href="/shop" class="nav__link" data-link>Shop</a>
      </nav>
      <div class="content">
      <h1>The Apodhadion Theater</h1>
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
