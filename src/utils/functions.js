export function replaceURLWithHTMLLinks(text) {
  const pattern =
    "(\\b(https?|ftp|file):\\/\\/[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])";
  const exp = new RegExp(pattern, "gi");
  return text?.replace(exp, "<a href='$1' target='_blank'>$1</a>");
}

export function isValidDateFormat(dateString) {
  // 正規表現を使用して日付フォーマットを検証する
  const dateFormat = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/;
  if (!dateString.match(dateFormat)) {
    return false;
  }

  // 日付と時刻の有効性をチェック
  const month = parseInt(RegExp.$2, 10);
  const day = parseInt(RegExp.$3, 10);
  const hours = parseInt(RegExp.$4, 10);
  const minutes = parseInt(RegExp.$5, 10);

  // 月は1から12の間で、日は1から31の間である必要があります
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  // 時間は0から23の間で、分は0から59の間である必要があります
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return false;
  }

  return true; // すべてのチェックに合格した場合、有効な日付フォーマットです
}
