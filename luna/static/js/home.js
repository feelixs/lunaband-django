var homeTextFields = []
var homeDualImages = []

document.addEventListener('DOMContentLoaded', function () {
    /*
        Load this page's content in the default language when the page loads.

        Tutorial I used for running JS on page load:
        https://stackoverflow.com/a/25984032
    */
    homeTextFields.push(new DualLangTextField(`/static/text/home/div1`, document.getElementById('div1-text')));
    homeTextFields.push(new DualLangTextField(`/static/text/home/div2`, document.getElementById('div2-text')));
    homeTextFields.push(new DualLangTextField(`/static/text/footer`, document.getElementById('footer-text')));
    homeTextFields.push(new DualLangTextField( `/static/text/copyright`, document.getElementById('copyright')));
    homeDualImages.push(new DualLangImage('http://trioluna.com/static/images/buttons/globe-white-en.webp',
                                           'http://trioluna.com/static/images/buttons/globe-white-es.webp',
                                                   document.getElementById('change-language-img')))
    loadContentInLang(currentLang);
})

function applyMainLanguageChange(newlang) {
    /*
        Applies language change to the page's main text, this will be overriden for each page
    */

    document.title = newlang === 'es' ? 'Luna | Inicio' : 'Luna | Home';
    loadContentInLang(newlang)
}

function loadContentInLang(language) {
    /*
        This is run when the page initially loads, and whenever the language is changed.
    */
    for (let i = 0; i < homeTextFields.length; i++) {
        homeTextFields[i].getText(language);
    }
    for (let i = 0; i < homeDualImages.length; i++) {
        homeDualImages[i].getImg(language);
    }
}
