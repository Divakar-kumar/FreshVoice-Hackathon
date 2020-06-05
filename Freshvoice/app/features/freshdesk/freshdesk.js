/**
 * To create a ticket with dummy notes
 **/
function createTicket() {
    const ticketDetails = {
        email: 'dummy@dummyemail.com',
        subject: 'Digitizing with voice',
        priority: 1,
        description: "Ticket from Microsoft",
        status: 2,
        tags:['freshvoice']
    }

    client.request.post('https://divakarkumar.freshdesk.com/api/v2/tickets',
        {
            headers: {
                Authorization: '<%= encode(iparam.freshdesk_api_key) %>'
            },
            json: ticketDetails,
            method: "POST"
        }).then((ticketData) => {
            console.log(ticketData);
            console.info('Successfully created ticket in Freshdesk');
            displayStatus('success', 'Successfully created a ticket.');
        }, error => {
            console.error('Error: Failed to create a ticket in Freshdesk');
            console.error(error)
            displayStatus('danger', 'failed to create a ticket. Try again later.');
        });
}


/**
 * To delete all ticket with dummy notes
 **/
function deleteTicket() {
    client.request.get('https://divakarkumar.freshdesk.com/api/v2/search/tickets?query="tag:%27freshvoice%27"',
        {
            headers: {
                Authorization: '<%= encode(iparam.freshdesk_api_key) %>'
            }
        }).then(function(resp) {
            console.log(resp);
            var { total } = JSON.parse(resp.response);
            return Math.floor(total/30 + 1);
        })
        .then(function(totalPages) {
            console.log(totalPages);
            var ticketPromises = [];
            for(let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
                url = `https://divakarkumar.freshdesk.com/api/v2/search/tickets?query="tag:%27freshvoice%27"&page=${pageNumber}`;
                ticketPromises.push(client.request.get(url, {
                    headers: {
                        Authorization: '<%= encode(iparam.freshdesk_api_key) %>'
                    }
                }))
            }
            return Promise.all(ticketPromises);
        })
        .then(function(resolvedTickets) {
            console.log(resolvedTickets);
            var allAgentTickets = [];
            resolvedTickets.forEach(function(resolvedTicket) {
                console.log(resolvedTicket);
                allAgentTickets = allAgentTickets.concat(JSON.parse(resolvedTicket.response).results)
            });
            allAgentTickets.forEach(function(agentTicket) {
                var { id, subject } = agentTicket;
                console.log("each ticket",agentTicket.id);
                client.request.delete("https://divakarkumar.freshdesk.com/api/v2/tickets/"+agentTicket.id,{
                    headers: {
                        Authorization: '<%= encode(iparam.freshdesk_api_key) %>'
                    },
                }
                    ).then(function(){
                        console.info('Successfully deleted ticket in Freshdesk');
                        
                    });
            });
            displayStatus('danger', 'Successfully deleted all freshvoice email.');
        })
        .catch(function(er) {
            console.error(`Couldnt retrieve tickets. Status : ${er.status}`);
        })
}


/**
 * To navigate the page to the given ticket
 *
 * @param {Event} event
 **/
function navigateToTicket() {
    client.interface.trigger("click", { id: "ticket"})
        .then().catch(function (error) {
            console.error(error);
        });
}