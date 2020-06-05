function translatorActivate() {
    var languageSourceOptions = document.getElementById("languageSourceOptions");
    languageTargetOptions = [document.getElementById("languageTargetOptions1")];
    var resultsDivs = [document.getElementById("phraseDiv1")];
    resultsDivs.forEach(function (elem) {
        elem.innerHTML = "";
    });

    var speechConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription("Please enter key", "Please enter region");
    speechConfig.speechRecognitionLanguage = languageSourceOptions.value;
    console.log("speechconfig", speechConfig);
    let languageKeys = {};
    languageTargetOptions.forEach(function (langElem, index) {
        let language = langElem.value;
        languageKeys[language.substring(0, 2)] = resultsDivs[index];
        speechConfig.addTargetLanguage(language);
    });

    var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.TranslationRecognizer(speechConfig, audioConfig);
    displayStatus(NOTIFICATION_SUCCESS, ACTIVATED_TRANSLATOR);
    recognizer.startContinuousRecognitionAsync(result);
    recognizer.recognizing = function (s, e) {

    };
    recognizer.recognized = function (s, e) {
        for (var key in languageKeys) {
            let translation = e.result.translations.get(key);
            window.console.log(key + ": " + translation);
            languageKeys[key].innerHTML += translation;
        }
    };

    function result() {
        console.log(callback);
    }



}
