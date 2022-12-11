let btn = document.createElement("button");
btn.innerText = "Format Code";

let isBtnPresent = false;

let monacoEditor = {};
function getCodeMirror() {
  let monaco = window.monaco;
  if (monaco === undefined || monaco === null) {
    // codemirror not found on page
    return;
  }
  monacoEditor = monaco.editor;
  if (monacoEditor === undefined) {
    // codeMirror not found
    return;
  }
}
const mutationObserver = new MutationObserver(() => {
  getCodeMirror();
  let btnParentDiv = document.querySelectorAll(".shrink-0");
  let btnDiv =
    btnParentDiv[btnParentDiv.length - 1].firstChild.firstChild.firstChild
      .firstChild;
  if (btnDiv === undefined || btnDiv === null) {
    // buttons div not rendered yet
    return;
  }
  let parent = btnDiv.parentElement;
  let languageDiv = document.getElementsByClassName(
    "text-xs text-label-2 dark:text-dark-label-2"
  )[10];
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
      btn.className = btnDiv.className;
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
  const monacoModel = monacoEditor.getModels()[0];
  const code = monacoModel.getValue();
  const getFormattedCode = async () => {
    try {
      let formattedCode = await getData(code);
      monacoModel.setValue(formattedCode);
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
