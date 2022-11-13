let btn = document.createElement("button");
let span = document.createElement("span");
span.innerText = "Format Code";

let isBtnPresent = false;

let codeMirror = {};
function getCodeMirror() {
  let codeMirrorSelector = document.querySelector(".CodeMirror");
  if (codeMirrorSelector === undefined || codeMirrorSelector === null) {
    // codemirror not found on page
    return;
  }
  codeMirror = codeMirrorSelector.CodeMirror;
  if (codeMirror === undefined) {
    // codeMirror not found
    return;
  }
}
const mutationObserver = new MutationObserver(() => {
  getCodeMirror();
  let btnDiv = document.querySelector("button[data-cy='submit-code-btn']");
  if (btnDiv === undefined || btnDiv === null) {
    // div not found
    return;
  }
  let parent = btnDiv.parentElement;
  if (!isBtnPresent) {
    parent.prepend(btn);
    let btnDivSpan = btnDiv.childNodes[0];
    span.className = btnDivSpan.className;
    btn.style.padding = "1.2em";
    btn.className = btnDiv.className;
    btn.append(span);
    isBtnPresent = true;
  }
});
mutationObserver.observe(document, {
  childList: true,
  attributes: false,
  subtree: true,
});
btn.addEventListener("click", () => {
  const code = codeMirror.getValue();
  const getFormattedCode = async () => {
    try {
      let formattedCode = await getData(code);
      codeMirror.setValue(formattedCode);
    } catch (e) {
      console.log("Error while fetching formatted code");
      console.log(e);
    }
  };
  getFormattedCode();
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
