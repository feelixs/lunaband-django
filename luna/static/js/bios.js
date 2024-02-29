var biosTextFields = []
var bioDualImages = []
document.addEventListener('DOMContentLoaded', function () {
    /*
        Load this page's content in the default language when the page loads.

        Tutorial I used for running JS on page load:
        https://stackoverflow.com/a/25984032
    */
    biosTextFields.push(new DualLangTextField(`/static/text/bios/carmen`, document.getElementById('carmen-bio')));
    biosTextFields.push(new DualLangTextField(`/static/text/bios/marco`, document.getElementById('marco-bio')));
    biosTextFields.push(new DualLangTextField(`/static/text/bios/nicolas`, document.getElementById('nicolas-bio')));
    biosTextFields.push(new DualLangTextField(`/static/text/footer`, document.getElementById('footer-text')));
    biosTextFields.push(new DualLangTextField( `/static/text/copyright`, document.getElementById('copyright')));
    bioDualImages.push(new DualLangImage('http://trioluna.com/static/images/buttons/globe-white-en.webp',
                                         'http://trioluna.com/static/images/buttons/globe-white-es.webp',
                                                 document.getElementById('change-language-img')))
    loadContentInLang(currentLang);
})

function applyMainLanguageChange(newlang) {
    /*
        Applies language change to the page's main text, this will be overriden for each page
    */
    document.title = newlang === 'es' ? 'Luna | Sobre' : 'Luna | About';
    document.getElementById('page-title').innerText = newlang === 'es' ? 'Conoce al Trío' : 'Meet the Trio';
    loadContentInLang(newlang);
}

function loadContentInLang(language) {
    /*
        This is run when the page initially loads, and whenever the language is changed.
    */
    for (let i = 0; i < biosTextFields.length; i++) {
        biosTextFields[i].getText(language);
    }
    for (let i = 0; i < bioDualImages.length; i++) {
        bioDualImages[i].getImg(language);
    }
}
