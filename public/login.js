/* eslint-disable  */

var $cookie, $storage, Login;
console.log('helo from login.js');
$cookie = (function () {
  var COOKIE_EXP_HOURS = 720;

  return {
    add: add,
    get: get,
    remove: remove
  };

  function add(name, value, expireHours) {
    var cookieString, date;

    cookieString = name + '=' + encodeURI(value);

    expireHours = typeof expireHours === 'undefined' ? COOKIE_EXP_HOURS : expireHours;

    if (expireHours) {
      date = new Date();
      date.setTime(date.getTime + expireHours * 3600 * 1000);
      cookieString = cookieString + '; expire=' + date.toGMTString();
    }

    document.cookie = cookieString;
  }

  function get(name) {
    var i, cookieString, cookieArray, cookieArrayLen, cookiePair;

    cookieString = document.cookie;
    cookieArray = cookieString.split('; '); // 将多cookie切割为多个名/值对
    cookieArrayLen = cookieArray.length;
    i = 0;

    for (; i < cookieArrayLen; i++) {
      // 遍历cookie数组，处理每个cookie对
      cookiePair = cookieArray[i].split('='); // 找到名称为userId的cookie，并返回它的值

      if (cookiePair[0] === name) {
        return cookiePair[1];
      }
    }
    return '';
  }

  function remove(name) {
    console.log('remove');
    var date = new Date();
    date.setTime(date.getTime() - 10000); // 删除一个cookie，就是将其过期时间设定为一个过去的时间
    document.cookie = name + '=v; expire=' + date.toGMTString();
  }
})();

$storage = (function (global) {
  console.log('$storage');
  var STORAGE_KEY = 'Localvoice@%DOMAIN%',
    props = ['token', 'refreshToken'],
    client;

  if (global.VNEXT_TOKEN_STORAGE_HUB) {
    client = new CrossStorageClient(global.VNEXT_TOKEN_STORAGE_HUB, { timeout: 30000 });
  }

  return {
    save: save,
    clear: clear
  };

  function save(propMap) {
    console.log('propMap', propMap);

    if (!client) {
      return Promise.reject(new Error('Token storage client not configured'));
    }

    if (!propMap) {
      return;
    }

    props.forEach(function (prop) {
      if (!propMap.hasOwnProperty(prop)) {
        delete propMap[prop];
      }
    });
    const domain = 'localhost';
    return client.onConnect().then(function () {
      return client.set(STORAGE_KEY.replace('%DOMAIN%', domain), JSON.stringify(propMap));
    });
  }

  function clear() {
    if (!client) {
      return Promise.reject(new Error('Token storage client not configured'));
    }

    return client.onConnect().then(function () {
      return client.clear();
    });
  }
})(window);

Login = (function (global, $, $cookie, $storage) {
  console.log('login');
  var $body = $('body'),
    $formLogin = $('#formLogin'),
    $inputUserEmail = $('#userEmail'),
    $inputUserPassword = $('#userPassword'),
    $validation = $('#validation');

  return {
    init: init
  };

  function _applyBindings() {
    if (!global.API_URL) {
      return;
    }

    $formLogin.on('submit', onFormSubmit);

    function onFormSubmit(e) {
      console.log('onFormSubmit');
      var $alert, username, pass;

      e.preventDefault();

      $alert = $('#alert');
      username = $inputUserEmail.val();
      pass = $inputUserPassword.val();

      $body.addClass('loading');
      $alert.length && $alert.remove();

      $.ajax({
        type: 'POST',
        url: global.API_URL + '/api/test/authentication/signin',
        data: JSON.stringify({
          email: username,
          password: pass
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (message) {
          onSuccess(message);
        },
        error: onError
      });

      function onSuccess({ message }) {
        console.log('message', message);
        const mapStorage = {
          token: message.accessToken,
          refreshToken: message.refreshToken
        };

        $storage
          .save(mapStorage)
          .then(function () {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('ReturnUrl')) {
              window.location.href = urlParams.get('ReturnUrl');
            } else {
              window.location.href = '/';
            }
          })
          .catch(onError);
      }

      function onError(err) {
        var $alert, alertString, res;

        res = err.responseJSON || {};
        $alert = $('<div>', { id: 'alert' });

        alertString = res.message || '';

        ['login', 'password'].forEach(function (prop) {
          if (!res[prop] || !Array.isArray(res[prop])) {
            return;
          }

          alertString && (alertString += '<br />');

          res[prop].forEach(function (val, indx) {
            alertString += (indx ? '<br />' : '') + val;
          });
        });

        $alert.html(alertString || 'Error');
        $validation.html($alert);
        $inputUserPassword.val('');
        $body.removeClass('loading');
        _setPageFocus();

        if (global.console) {
          console.error(err);
        }
      }
    }
  }

  function _setDefaultVal() {
    if ($cookie.get('remember_user_name_concretego_com') !== 'true') {
      return;
    }

    $inputUserEmail.val($cookie.get('user_name_concretego_com'));
  }

  function _setPageFocus() {
    !$inputUserEmail.val() ? $inputUserEmail.focus() : $inputUserPassword.focus();
  }

  function init() {
    if (top !== window) {
      top.postMessage('login');
    }

    _applyBindings();
    _setPageFocus();
    _setDefaultVal();
  }
})(window, $, $cookie, $storage);

$(function () {
  Login.init();
});
