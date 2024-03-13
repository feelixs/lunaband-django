var biosTextFields = []
var bioDualImages = []

$(document).ready(function () {
    /*
        Load this page's content in the default language when the page loads.
    */
    biosTextFields.push(new XMLDualLangTextField(`/static/data/xml/bios.xml`, 0, $('#carmen-bio'), '&ensp;&ensp;&ensp;&ensp;'));
    biosTextFields.push(new XMLDualLangTextField(`/static/data/xml/bios.xml`, 1, $('#marco-bio'), '&ensp;&ensp;&ensp;&ensp;'));
    biosTextFields.push(new XMLDualLangTextField(`/static/data/xml/bios.xml`, 2, $('#nicolas-bio'), '&ensp;&ensp;&ensp;&ensp;'));
    biosTextFields.push(new HTMLDualLangTextField(`/static/data/html/footer`, $('#footer-text')));
    biosTextFields.push(new HTMLDualLangTextField( `/static/data/html/copyright`, $('#copyright')));
    bioDualImages.push(new DualLangImage('https://trioluna.com/static/images/buttons/globe-white-en.webp',
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
    document.title = newlang === 'es' ? 'Luna | Sobre' : 'Luna | About';
    var $biosTitle = $('#page-title');
    $biosTitle.html(newlang === 'es' ? 'Conoce al Trío' : 'Meet the Trio');
}

function loadContentInLang(language) {
    /*
        This is run when the page initially loads, and whenever the language is changed.
    */
    applyMainLanguageChange(language);
    applyNavLanguageChange(language);
    for (let i = 0; i < biosTextFields.length; i++) {
        biosTextFields[i].getText(language);
    }
    for (let i = 0; i < bioDualImages.length; i++) {
        bioDualImages[i].getImg(language);
    }
}
