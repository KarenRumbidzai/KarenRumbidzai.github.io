document.querySelectorAll(".prose pre").forEach(function (pre) {
  var code = pre.querySelector("code");
  if (!code) return;
  var match = code.className.match(/language-([\w-]+)/);
  var wrap = document.createElement("div");
  wrap.className = "code";
  var bar = document.createElement("div");
  bar.className = "code__bar";
  var label = document.createElement("span");
  label.textContent = match ? match[1] : "text";
  var btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = "Copy";
  btn.setAttribute("aria-label", "Copy code to clipboard");
  btn.addEventListener("click", function () {
    var done = function (msg) {
      btn.textContent = msg;
      setTimeout(function () {
        btn.textContent = "Copy";
      }, 1800);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code.innerText).then(
        function () {
          done("Copied");
        },
        function () {
          done("Press Ctrl+C");
        },
      );
    } else {
      done("Press Ctrl+C");
    }
  });
  pre.parentNode.insertBefore(wrap, pre);
  bar.appendChild(label);
  bar.appendChild(btn);
  wrap.appendChild(bar);
  wrap.appendChild(pre);
});

(function () {
  var root = document.documentElement;
  var btn = document.getElementById("themeToggle");
  if (!btn) return;

  function current() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }
  function sync() {
    btn.setAttribute(
      "aria-label",
      current() === "dark" ? "Switch to light mode" : "Switch to dark mode",
    );
  }

  btn.addEventListener("click", function () {
    var next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    sync();
  });
  sync();
})();
