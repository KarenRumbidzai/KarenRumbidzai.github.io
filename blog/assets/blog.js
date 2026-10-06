// Adds a language label and a Copy button to every code block in a post.
document.querySelectorAll('.prose pre').forEach(function (pre) {
  var code = pre.querySelector('code');
  if (!code) return;
  var match = code.className.match(/language-([\w-]+)/);
  var wrap = document.createElement('div');
  wrap.className = 'code';
  var bar = document.createElement('div');
  bar.className = 'code__bar';
  var label = document.createElement('span');
  label.textContent = match ? match[1] : 'text';
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = 'Copy';
  btn.setAttribute('aria-label', 'Copy code to clipboard');
  btn.addEventListener('click', function () {
    var done = function (msg) {
      btn.textContent = msg;
      setTimeout(function () { btn.textContent = 'Copy'; }, 1800);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code.innerText).then(function () { done('Copied'); }, function () { done('Press Ctrl+C'); });
    } else {
      done('Press Ctrl+C');
    }
  });
  pre.parentNode.insertBefore(wrap, pre);
  bar.appendChild(label);
  bar.appendChild(btn);
  wrap.appendChild(bar);
  wrap.appendChild(pre);
});
