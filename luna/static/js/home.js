var homeTextFields = []
var homeDualImages = []

$(document).ready(function () {
    /*
        Load this page's content in the default language when the page loads.
    */
    homeTextFields.push(new XMLDualLangTextField(`/static/data/xml/home.xml`, 0, $('#div1-text'), '&ensp;&ensp;&ensp;&ensp;'));
    homeTextFields.push(new XMLDualLangTextField(`/static/data/xml/home.xml`, 1, $('#div2-text'), '&ensp;&ensp;&ensp;&ensp;'));
    homeTextFields.push(new HTMLDualLangTextField(`/static/data/html/footer`, $('#footer-text')));
    homeTextFields.push(new HTMLDualLangTextField( `/static/data/html/copyright`, $('#copyright')));
    homeDualImages.push(new DualLangImage('https://trioluna.com/static/images/buttons/globe-white-en.webp',
        'https://trioluna.com/static/images/buttons/globe-white-es.webp', $('#change-language-img')))

    // load the current langague from the document's 'lang' attribute, which was set by the server (django)
    var currentLang = $('html').attr('lang');
    console.log(`Loading the user's current language as ${currentLang}`);
    loadContentInLang(currentLang);
});

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
