import "./assets/scss/main.scss";

// script
import "./script/router";

// svg import all
function requireAll(r) {
  r.keys().forEach(r);
}
requireAll(require.context("./assets/icons/", true, /\.svg$/));
