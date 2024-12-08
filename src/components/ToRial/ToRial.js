const ToRial = (str1) => {
  if (str1?.toString().length > 0) {
    var str = str1?.toString() || "";
    var str = str.replace(/\,/g, "");
    if (isNaN(str)) {
      return "";
    }
    var objRegex = new RegExp("(-?[0-9]+)([0-9]{3})");
    while (objRegex.test(str)) {
      str = str.replace(objRegex, "$1,$2");
    }
    return str;
  } else {
    return "";
  }
};

export default ToRial;
