export function replaceURLWithHTMLLinks(text) {
  const pattern =
    "(\\b(https?|ftp|file):\\/\\/[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])";
  const exp = new RegExp(pattern, "gi");
  return text?.replace(exp, "<a href='$1' target='_blank'>$1</a>");
}
