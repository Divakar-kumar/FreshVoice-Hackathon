var axios = require('axios');
var firebase = require('firebase');
const config = require('../GlobalHandlers/Constants').FirebaseConfig;
let code="";

function intialize_firebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  console.log("initialized firebase");
}

function create_ticket_node() {
  var promise = firebase.database().ref('createTicket/' + get_code()+'/'+1).set("create event triggered");
  console.log("updated");
  return promise;
}
function remove_create_ticket() {
  var promise = firebase.database().ref('createTicket/' + get_code()+'/'+1).remove();
  console.log("deleted");
  return promise;
}
function delete_ticket_node() {
  var promise = firebase.database().ref('deleteTicket/' + get_code()+'/'+1).set("delete event triggered");
  console.log("updated");
  return promise;
}
function remove_delete_ticket() {
  var promise = firebase.database().ref('deleteTicket/' + get_code()+'/'+1).remove();
  console.log("deleted");
  return promise;
}

function update_code(value){
  code=value;
}
function get_code()
{
  return code;
}

var API = {
  InitializeFirebase: intialize_firebase,
  UpdateCode:update_code,
  GetCode:get_code,
  CreateTicketIntent: create_ticket_node,
  RemoveCreateTicket:remove_create_ticket,
  DeleteTicketIntent:delete_ticket_node,
  RemoveDeleteTicket:remove_delete_ticket
}

module.exports = API;