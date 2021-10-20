import SignUpPage from "./pages/sign-up";
import MainPage from "./pages/main";


// redirect if you dont sign up
window.onload = () => {
  const currentPageName = document.querySelector(`[data-name-page]`);

  if (currentPageName.dataset.namePage === "SignUp") {
    let login = localStorage.getItem("login");
    if (login) {
      window.location.href = "/layout/main.html";
      return;
    }
    const signUpPage = new SignUpPage();
  }

  if (currentPageName.dataset.namePage === "Main") {
    let login = localStorage.getItem("login");
    if (!login) {
      window.location.href = "/layout/sign-up.html";
      return;
    }
    const mainPage = new MainPage();
  }
};
