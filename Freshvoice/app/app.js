/**
 * Assigning global variables 
 * to have reference to translator
 * recognizer and intent recognizer
 * used in the application
 */

let recognizer = undefined;
let intentrecognizer = undefined;

/**
 * Modal notification for share template 
 * Type the fresdesk domain address to share the access
 * Once shared , user can view those in notification modal popup
 */
function openModal() {
    client.interface.trigger('showModal', { title: 'Share', template: 'share.html' });
}

/**
 * Close popup
 */
function shareAccess() {
    console.log(firebase);
    client.instance.close();

}

/**
 * Deactivate Feature based on the input
 * @param {*} feature 
 */
function deactivateFeature(feature) {
    if (feature == FEATURE_TRANSALATOR && recognizer != undefined) {
        displayStatus(NOTIFICATION_FAILURE, DEACTIVATED_TRANSLATOR);
        recognizer.close();
        recognizer = undefined;
    }
    else if (feature == FEATURE_MICROSOFT) {
        displayStatus(NOTIFICATION_FAILURE, DEACTIVATED_MICROSOFT);
        intentrecognizer.close();
        intentrecognizer = undefined;
    }
    else if (feature == FEATURE_ALEXA) {
        displayStatus(NOTIFICATION_FAILURE, DEACTIVATED_ALEXA);
        deactivateAlexa();
    }
    else if (feature == FEATURE_GOOGLE) {
        displayStatus(NOTIFICATION_FAILURE, DEACTIVATED_GOOGLE);
        deactivateGoogle();
    }
}
/**
 * Activate feature based on the input
 * @param {*} feature 
 */
function activateFeature(feature) {
    var bar = '' + feature + 'bar';
    if (!jQuery('.' + bar).hasClass('barAnimation')) {
        $("." + bar).show();
        jQuery('.' + bar).addClass('barAnimation');
        jQuery('#activate' + feature).text("Deactivate " + feature);
        jQuery('#activate' + feature).removeClass('btn-primary');
        jQuery('#activate' + feature).addClass('btn-danger');
        if (feature == FEATURE_TRANSALATOR) {
            translatorActivate();
        }
        else if (feature == FEATURE_MICROSOFT) {
            microsoftActivate();
        }
        else if (feature == FEATURE_ALEXA) {
            displayStatus(NOTIFICATION_SUCCESS, ACTIVATED_ALEXA);
            alexaActivate();
        }
        else if (feature == FEATURE_GOOGLE) {
            displayStatus(NOTIFICATION_SUCCESS, ACTIVATED_GOOGLE);
            googleActivate();
        }
    }
    else {
        $("." + bar).hide();
        jQuery('.' + bar).removeClass('barAnimation');
        jQuery('#activate' + feature).text("Activate " + feature);
        jQuery('#activate' + feature).removeClass('btn-danger');
        jQuery('#activate' + feature).addClass('btn-primary');
        deactivateFeature(feature);
    }
};

/**
 * Display notification message 
 * @param {*} type 
 * @param {*} message 
 */
function displayStatus(type, message) {
    client.interface.trigger("showNotify", {
        type: type,
        message: message
    });
}
/**
 * On Document ready event 
 */
$(document).ready(function () {

    //#region hide Elements
    $(".microsoftbar").hide();
    $(".alexabar").hide();
    $(".googlebar").hide();
    $(".translatorbar").hide();
    //#endregion

    /**
     * on app initialization 
     * load profile pic and profile name 
     * to populate data in welcome div
     */
    app.initialized()
        .then(function (_client) {
            window.client = _client;
            client.data.get('loggedInUser').then(function (user) {
                $("#profilePic").attr("src", "" + user.loggedInUser.contact.avatar.attachment_url);
                $("#profileName").text("" + user.loggedInUser.contact.name);
                window.userId = user.loggedInUser.id;
            });
            client.events.on('app.activated',
                function () {
                });
        });
});
