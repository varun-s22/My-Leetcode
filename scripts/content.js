let appWindow = document.querySelector("#app");
let btn = document.createElement("button");
btn.innerText = "Click me";
appWindow.append(btn);
btn.addEventListener("click", () => {
  const code = document.querySelectorAll("span[role='presentation']");
  console.dir(code);
  code.forEach((line) => {
    // prints the code line by line
    console.log(line.innerText);
  });
});
