(function() {
  'use strict';

  find('#download').addEventListener('click', function() {
    var addons = [];

    if (find('#atom').checked) {addons.push('atom');}
    if (find('#bash-git-prompt').checked) {addons.push('bash-git-prompt');}
    if (find('#chrome').checked) {addons.push('chrome');}
    if (find('#discord').checked) {addons.push('discord');}
    if (find('#docker').checked) {addons.push('docker');}
    if (find('#github').checked) {addons.push('github');}
    if (find('#gitter').checked) {addons.push('gitter');}
    if (find('#hub').checked) {addons.push('hub');}
    if (find('#node').checked) {addons.push('node');}
    if (find('#ruby').checked) {addons.push('ruby');}
    if (find('#slack').checked) {addons.push('slack');}
    if (find('#vagrant').checked) {addons.push('vagrant');}

    find('#download-frame').src = '/download?' + addons.join('&');
  });

  function find(selector) {
    return document.querySelector(selector);
  }
})();
