import Button from "../components/button/Button";

const DEV = process.env.NODE_ENV === "development";

function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === "complete"
      : document.readyState !== "loading"
  ) {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
  if (DEV) {
    window.addEventListener("reload", fn);
  }
}

ready(function() {
  console.log("build js");
  new Button();
});
