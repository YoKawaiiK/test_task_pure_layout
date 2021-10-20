"use strict";

export default class SignUpPage {
  constructor() {
    this.login = {
      element: document.getElementById("login"),
      type: "login",
      errors: [],
    };
    this.email = {
      element: document.getElementById("email"),
      type: "email",
      errors: [],
    };
    // this.telephone = document.getElementById("telephone");
    this.password = {
      element: document.getElementById("password"),
      type: "password",
      errors: [],
    };

    this.password2 = {
      element: document.getElementById("password2"),
      type: "password",
      error: [],
    };
    this.telephone = {
      element: document.getElementById("telephone"),
      type: "telephone",
      errors: [],
    };

    this.togglePassword = document.getElementById("tooglePassword");
    this.togglePassword2 = document.getElementById("tooglePassword2");
    this.submit = document.getElementById("submit");

    this._initState();
  }

  _initState() {
    this.telephoneHelper();
    this.showPassword();
    this.signUp();
  }

  // mask validation number phone
  telephoneHelper() {
    const input = this.telephone.element;
    const prefixNumber = (str) => {
      if (str === "7") {
        return "7 (";
      }
      //   if (str === "8") {
      //     return "8 (";
      //   }
      //   if (str === "9") {
      //     return "7 (9";
      //   }
      return "+7 (";
    };

    input.addEventListener("input", (e) => {
      const value = input.value.replace(/\D+/g, "");
      const numberLength = 11;

      let result;
      if (input.value.includes("+8") || input.value[0] === "8") {
        result = "";
      } else {
        result = "+";
      }

      //
      for (let i = 0; i < value.length && i < numberLength; i++) {
        switch (i) {
          case 0:
            result += prefixNumber(value[i]);
            continue;
          case 4:
            result += ") ";
            break;
          case 7:
            result += "-";
            break;
          case 9:
            result += "-";
            break;
          default:
            break;
        }
        result += value[i];
      }
      //
      input.value = result;
    });
  }

  // toggle password
  showPassword() {
    let togglePasswords = [this.togglePassword, this.togglePassword2];
    let passwords = [this.password.element, this.password2.element];

    togglePasswords.forEach(function (toggle, index) {
      toggle.addEventListener("click", function () {
        const type = passwords[index].getAttribute("type");

        if (type === "password") {
          toggle.children[0].setAttribute("display", "none");
          toggle.children[1].setAttribute("display", "block");
          passwords[index].setAttribute("type", "text");
        } else {
          toggle.children[0].setAttribute("display", "block");
          toggle.children[1].setAttribute("display", "none");
          passwords[index].setAttribute("type", "password");
        }
      });
    });
  }

  // validator
  // add in every ref object list of error
  // return count error
  // fields = {element, type, errors}
  _validator(fields) {
    const emailRegExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    const telephoneRegExp =
      /^(\+7|)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    const loginRegExp = /^[a-zA-Z0-9]+$/;

    let errorsCount = 0;
    for (const field of fields) {
      field.errors = [];

      if (
        field.element.value.length === 0 &&
        ["input", "password", "email", "telephone", "login"].includes(
          field.type
        )
      ) {
        field.errors.push("Поле не должно быть пустым");
        errorsCount++;
        continue;
      }

      if (
        field.type === "login" &&
        (field.element.value.length < 6 || field.element.value.length > 20)
      ) {
        field.errors.push("Логин должен быть не менее 6 символов");
        errorsCount++;
        continue;
      }

      if (
        field.type === "login" &&
        loginRegExp.test(field.element.value) === false
      ) {
        field.errors.push("Введен некоректный логин");
        errorsCount++;
        continue;
      }

      if (
        field.type === "password" &&
        (field.element.value.length < 8 || field.element.value.length > 45)
      ) {
        field.errors.push("Пароль должен быть не менее 8 символов");
        errorsCount++;
        continue;
      }

      if (
        field.type === "email" &&
        emailRegExp.test(field.element.value) === false
      ) {
        errorsCount++;
        field.errors.push("Введен некоректный email");
        continue;
      }

      if (
        field.type === "telephone" &&
        telephoneRegExp.test(field.element.value) === false
      ) {
        field.errors.push("Введен некоректный телефон");
        errorsCount++;
        continue;
      }
    }
    return errorsCount;
  }

  _fillFieldsError(fields, tagName = "data-field-name") {
    const titleItemsError = document.querySelectorAll(`[${tagName}]`);

    titleItemsError.forEach(function (item, index) {
      if (item.dataset.fieldName === fields[index].element.id) {
        item.innerHTML = "";
        item.innerHTML += fields[index].errors.join(", ");
      }
    });
  }

  signUp() {
    const button = this.submit;
    const context = this;

    button.addEventListener("click", function (event) {
      // array of fields objects
      const fields = [
        context.login,
        context.email,
        context.telephone,
        context.password,
        context.password2,
      ];

      // check error
      if (!context._validator(fields)) {
        // set state in localStorage
        localStorage.setItem("login", context.login.element.value);
        window.location.href = "/layout/main.html";
      } else {
        // fill and show user his incorrect field
        context._fillFieldsError(fields);
      }

      event.stopPropagation();
    });
  }
}
