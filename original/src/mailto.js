export default function({ to, subject, body }) {
  var href = `mailto:${to}?subject=${subject}&body=${encodeURI(body)}`;

  var element = document.createElement("a");
  element.setAttribute("href", href);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
