app.initialized()
    .then(function (_client) {
        window.client = _client;
        client.data.get('loggedInUser').then(function (user) {
            /**
             * Global initialization of firebase 
             * inorder to set listeners
             * and react to the events triggered
             */

            var firebaseConfig = {
                apiKey: "Please enter API Key",
                authDomain: "freshvoice-8fe14.firebaseapp.com",
                databaseURL: "https://freshvoice-8fe14.firebaseio.com",
                projectId: "freshvoice-8fe14",
                storageBucket: "freshvoice-8fe14.appspot.com",
                messagingSenderId: "423412689158",
                appId: "1:423412689158:web:4d2bd0234022e5ed9ad687",
                measurementId: "G-T1GVBQMB94"
            };

            /**
             * setting up listeners 
             * for create and delete ticket event
             */
            firebase.initializeApp(firebaseConfig);
            var dbRef = firebase.database().ref();
            console.log(user.loggedInUser.id);
            var createRef = dbRef.child('createTicket/' + user.loggedInUser.id);
            var deleteRef = dbRef.child('deleteTicket/' + user.loggedInUser.id);
            console.log("firebase initialized", dbRef);
            /**
             * Event listener for 
             * create ticket
             */
            createRef.on('child_added', function () {
                console.log("create event triggered");
                createTicket();
            });

            /**
             * Event listener for
             * delete ticket
             */
            deleteRef.on('child_added', function () {
                console.log("delete event triggered");
                deleteTicket();
            });

        });
    });
