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
    var $homeNav = $('#home-nav');
    var $biosNav = $('#bios-nav');
    var $mediaNav = $('#media-nav');
    var $patreonNav = $('#patreon-nav');

    $homeNav.html(newLang === 'es' ? 'Inicio' : 'Home');
    $biosNav.html(newLang === 'es' ? 'Sobre' : 'About');
    $mediaNav.html(newLang === 'es' ? 'Medios' : 'Media');
    $patreonNav.html(newLang === 'es' ? 'Contacto' : 'Contact');
}

function HTMLDualLangTextField(baseDir, element) {
    /*
        A text field which can be converted between english and spanish.
        The files of the text in both languages must be fetched from the server prior to displaying any text.
    */
    this.baseDir = baseDir; // the name of the file - used as {path-to-baseDir}/{language}
    this.element = element; // the element whose inner html should be set to this.getText()
    this.getText = function(lang) {
        // method of retrieving file contents from server found at:
        // https://stackoverflow.com/a/14446538
        fetch(`https://trioluna.com${this.baseDir}/${lang}`) // fetch file from the server
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

function XMLDualLangTextField(xmlFile, index, element) {
    /*
        A text field which can be converted between english and spanish.
        The files of the text in both languages must be fetched from the server prior to displaying any text.
    */
    this.xmlFile = xmlFile; // the name of the file - used as {path-to-baseDir}/{language}
    this.index = index;
    this.element = element; // the element whose inner html should be set to this.getText()

    this.getText = function(lang) {
        var xhr = new XMLHttpRequest();
        var thisObj = this; // store this as we'll need this scope inside the onload function
        xhr.onload = function() {
            if (xhr.status === 200) {
                var xmlContents = xhr.responseXML;
                let person = xmlContents.getElementsByTagName('person')[thisObj.index];
                $(thisObj.element).html(person.getElementsByTagName(lang)[0]); // if successful, set the innerhtml to the file contents
            } else {
                throw new Error(`${thisObj.xmlFile} - error fetching file`);
            }
        }
        xhr.open('GET', this.xmlFile, true);
        xhr.send(null);
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
        $(this.element).fadeOut('fast', () => {
            // update this image's src to display the correct language
            $(this.element).attr('src', lang === 'es' ? this.enPath : this.esPath).fadeIn('fast');
        });

    }
    return this
}
