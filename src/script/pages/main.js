"use strict";

export default class MainPage {
  constructor() {
    this.exit = document.getElementById("exit");
    this.welcomeLogin = document.getElementById("welcomeLogin");

    this._initState();
  }

  _initState() {
    this.exitButton();
    this._addDataToMarkup();
  }

  exitButton() {
    this.exit.addEventListener("click", function (event) {
      localStorage.removeItem("login");
      event.stopPropagation();
    });
  }

  _addDataToMarkup() {
    const login = localStorage.getItem("login");

    this.welcomeLogin.innerHTML = login;
  }
}
