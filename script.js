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
    // buttons div not rendered yet
    return;
  }
  let parent = btnDiv.parentElement;
  let languageDiv = document.querySelector(
    ".ant-select-selection-selected-value"
  );
  if (languageDiv === undefined || languageDiv === null) {
    // language div not rendered yet
    return;
  }
  if (
    languageDiv.innerText === "Python" ||
    languageDiv.innerText === "Python3"
  ) {
    if (!isBtnPresent) {
      parent.prepend(btn);
      let btnDivSpan = btnDiv.childNodes[0];
      span.className = btnDivSpan.className;
      btn.style.padding = "1.2em";
      btn.className = btnDiv.className;
      btn.append(span);
      isBtnPresent = true;
    }
  } else {
    if (isBtnPresent) {
      let childList = parent.childNodes;
      if (childList === undefined || childList === null) {
        // children not loaded
        return;
      }
      childList[0].remove();
      isBtnPresent = false;
    }
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
  let data = await fetch("https://leetcode-code-formatter.vercel.app/code", {
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
