const vTableClick = {
  mounted(el, binding) {
    el.addEventListener("click", handleTdClick, false);
    window.addEventListener("click", handleWindowClick, false);
  },
  updated(el, binding) {
    vTableClick.userList = binding.value.userList;
    vTableClick.socket = binding.value.socket;
  },
  unmounted(el) {
    el.removeEventListener("click", handleTdClick);
  },
};
const handleWindowClick = (e) => {
  if (vTableClick.oninput) {
    vTableClick.el.removeChild(vTableClick.oninput);
    unBindInput();
    vTableClick.el = null;
    vTableClick.oninput = null;
  }
};
const handleTdClick = (e) => {
  stopPropagation(e);
  handleWindowClick(e);
  vTableClick.el = getEl(e);
  vTableClick.ctx = vTableClick.el.dataset;
  if (!vTableClick.ctx.file) {
    return;
  }
  createInput();
};
const bindInput = () => {
  vTableClick.oninput.addEventListener("click", stopPropagation, false);
};
const unBindInput = () => {
  vTableClick.oninput.addEventListener("click", stopPropagation, false);
};
const stopPropagation = (e) => {
  e.stopPropagation();
};
const getEl = (el) => {
  const tag = el.target.tagName.toLocaleLowerCase();
  switch (tag) {
    case "span":
      return el.target.parentNode;
    case "td":
      return el.target;
    default:
      return el.target;
  }
};
const createInput = () => {
  const input = document.createElement("input");
  input.type = "text";
  input.value = vTableClick.userList[vTableClick.ctx.idx][vTableClick.ctx.file];
  input.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
        height:100%;
      box-sizing:border-box;
      border:none;
      outline:none;
    `;
  input.oninput = double((e) => {
    vTableClick.socket.emit("updateList", {
      idx: vTableClick.ctx.idx,
      file: vTableClick.ctx.file,
      value: e.target.value,
    });
  }, 1000);
  vTableClick.el.appendChild(input);
  vTableClick.oninput = input;
  bindInput();
};

const double = (fn, time) => {
  let timer;
  return (arg) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(arg);
    }, time);
  };
};

export default vTableClick;
