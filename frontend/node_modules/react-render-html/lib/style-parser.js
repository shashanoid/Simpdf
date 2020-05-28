function hyphenToCamelcase(str) {
  var result = '';
  var upper = false;

  for (var i = 0; i < str.length; i++) {
    var c = str[i];

    if (c === '-') {
      upper = true;
      continue;
    }

    if (upper) {
      c = c.toUpperCase();
      upper = false;
    }

    result += c;
  }

  return result;
}

function convertKey(key) {
  var res = hyphenToCamelcase(key);

  if (key.indexOf('-ms-') === 0) {
    res = res[0].toLowerCase() + res.slice(1);
  }

  return res;
}

module.exports = function (styleStr) {
  return styleStr
    .split(';')
    .reduce(function (res, token) {
      if (token.slice(0, 7) === 'base64,') {
        res[res.length - 1] += ';' + token;
      } else {
        res.push(token);
      }
      return res;
    }, [])
    .reduce(function (obj, str) {
      var tokens = str.split(':');
      var key = tokens[0].trim();
      if (key) {
        var value = tokens.slice(1).join(':').trim();
        obj[convertKey(key)] = value;
      }
      return obj;
    }, {});
};
