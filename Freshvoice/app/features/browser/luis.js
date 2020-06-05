function microsoftActivate() {

    console.log("inside microsoft");
    displayStatus(NOTIFICATION_SUCCESS, ACTIVATED_MICROSOFT);
    /**
     * Setting up sppech config 
     */
    let audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    speechConfig = SpeechSDK.SpeechConfig.fromSubscription("Please enter API Key", "eastus"); 
    speechConfig.speechRecognitionLanguage = "en-US";
    /**
     * setting up intent Recognizer
     * from LUIS (Language Understanding Model)
     */
    intentrecognizer = new SpeechSDK.IntentRecognizer(speechConfig, audioConfig);
    var lm = SpeechSDK.LanguageUnderstandingModel.fromAppId("Please enter API Key");
    intentrecognizer.addAllIntents(lm);
    /**
     * Intent recognizer is binded
     * with only once event. Once
     * it recoginze sppech it disconnects
     */
    intentrecognizer.recognizeOnceAsync(
        function (result) {
            switch (result.reason) {
                case SpeechSDK.ResultReason.RecognizedSpeech:
                    break;
                case SpeechSDK.ResultReason.RecognizedIntent:
                    if (result.privIntentId == "CreateTicketIntent") {
                        console.log(result.properties.getProperty(SpeechSDK.PropertyId.LanguageUnderstandingServiceResponse_JsonResult));
                        console.log("inside create ticket event");
                        activateFeature(FEATURE_MICROSOFT);
                        createTicket();
                    }
                    else if(result.privIntentId=="DeleteTicketIntent")
                    {
                        activateFeature(FEATURE_MICROSOFT);
                        deleteTicket();
                    }
                    break;

                case SpeechSDK.ResultReason.NoMatch:
                    break;

                case SpeechSDK.ResultReason.Canceled:
                    break;
            }
        },
        function (err) {
            window.console.log(err);
        });
}