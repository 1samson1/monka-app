document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.innerText = chrome.i18n.getMessage(el.dataset.i18n);
})
