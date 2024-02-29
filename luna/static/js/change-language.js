var currentLang = 'en';

function toggleLanguage() {
    /*
       Swaps between Spanish and English, and update the page's text to the new lang
    */
    let templang = 'en';
    if (currentLang === 'en') {
        templang = 'es';
    }
    currentLang = templang;

    document.documentElement.lang = currentLang; // update the page's lang attribute
    applyNavLanguageChange(currentLang);
    applyMainLanguageChange(currentLang)
}


function applyNavLanguageChange(newLang) {
    /*
        Applies language change between english and spanish for the navigation bar's text
    */
    // manually update the nav's text fields
    document.getElementById('home-nav').innerHTML = newLang === 'es' ? 'Inicio' : 'Home';
    document.getElementById('bios-nav').innerHTML = newLang === 'es' ? 'Sobre' : 'About';
    document.getElementById('media-nav').innerHTML = newLang === 'es' ? 'Medios' : 'Media';
}

function DualLangTextField(baseDir, element) {
    /*
        A text field which can be converted between english and spanish.
        The files of the text in both languages must be fetched from the server prior to displaying any text.
    */
    this.baseDir = baseDir; // the name of the file - used as {path-to-baseDir}/{language}
    this.element = element; // the element whose inner html should be set to this.getText()
    this.getText = function(lang) {
        // method of retrieving file contents from server found at:
        // https://stackoverflow.com/a/14446538
        fetch(`http://trioluna.com${this.baseDir}/${lang}`) // fetch file from the server
            .then((res) => {
                if (!res.ok) { // if response was not successful
                    // don't modify the innerhtml, and default to whatever is hard-coded into it
                    throw new Error(`${this.baseDir}/${lang} - error fetching file`);
                }
                // for some reason, setting this.element.innerHTML here didn't work
                // so let's return it instead, and set it outside this response clause
                return res.text();
            })
            .then((text) => { // set it from the respone's return
                this.element.innerHTML = text; // if successful, set the innerhtml to the file contents
            });
    }
    return this
}

function DualLangImage(enPath, esPath, element) {
    this.enPath = enPath;
    this.esPath = esPath;
    this.element = element;
    this.getImg = function(lang) {
        // should display the opposite language of the current one
        // (the one that the button will change the webpage to if clicked)
        this.element.src = lang === 'es' ? this.enPath : this.esPath;
    }
    return this
}
