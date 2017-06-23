(function () {
    'use strict';

    var bgSyncTextElement = document.querySelector('.bg-sync__text');
    var bgSyncElement = document.querySelector('.custom__button-bg');

    //Listen postMessage when `background sync` is triggered
    navigator.serviceWorker.addEventListener('message', function (event) {
        console.info('From background sync: ', event.data);
        fetchGitUserInfo(localStorage.getItem('request'), true);
        bgSyncElement.classList.remove('hide'); //Once sync event fires, show register toggle button
        bgSyncTextElement.setAttribute('hidden', true); //Once sync event fires, remove registered label
    });
})();
