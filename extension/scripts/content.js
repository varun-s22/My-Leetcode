let appWindow = document.querySelector("#app");
let btn = document.createElement("button");
btn.innerText = "Click me";
appWindow.append(btn);
let finalCode = "";
btn.addEventListener("click", () => {
  const code = document.querySelectorAll("span[role='presentation']");
  code.forEach((line) => {
    // gets the code line by line
    finalCode += line.innerText + "\n";
  });
  const setFormattedCode = async () => {
    let formattedCode = await getData(finalCode);
    let formattedCodeArray = formattedCode.split("\n");
    for (let i = 0; i < code.length; i++) {
      // sets the formatted code line by line
      code[i].innerText = formattedCodeArray[i];
    }
  };
  setFormattedCode();
});

const getData = async (finalCode) => {
  let data = await fetch("http://127.0.0.1:5000/code", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: finalCode }),
  });
  data = await data.json();
  return data.formattedCode;
};
