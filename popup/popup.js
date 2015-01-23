(function(window, document) {

  'use strict';

  var msg = 'This is a live demo environment, so please keep in mind that any changes made '
    + 'to the style variables are visible to other users as well.',
    reset = '<b>All changes are reset every 30 minutes: at the top of the hour and half past the hour.</b>',
    okBtn, modal;

  if (window.addEventListener) {
    window.addEventListener('load', showNotification, false);
  } else if (document) {
    document.addEventListener('load', showNotification, false);
  }

  function showNotification() {
    var p1 = e('p', msg);
    var p2 = e('p', reset);
    var popup = e('div');

    okBtn = e('button', 'Okay!');
    okBtn.setAttribute('class', 'sg button');
    modal = e('div');
    modal.setAttribute('class', 'sg reset-notification modal');

    popup.appendChild(p1);
    popup.appendChild(p2);
    popup.appendChild(okBtn);
    popup.setAttribute('class', 'popup');
    modal.appendChild(popup);

    okBtn.addEventListener('click', close, false);
    window.addEventListener('keydown', checkEsc, false);
    document.body.appendChild(modal);
  }

  function e(tag, html) {
    var elem = document.createElement(tag);
    if (html) {
      elem.innerHTML = html;
    }
    return elem;
  }

  function checkEsc(e) {
    if ((e.keyCode || e.which) === 27) {
      close();
    }
  }

  function close() {
    window.removeEventListener('keydown', checkEsc);
    okBtn.removeEventListener('click', close);
    document.body.removeChild(modal);
  }

}(this, document));
