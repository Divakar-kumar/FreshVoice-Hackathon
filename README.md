# FreshVoice-Hackathon
Hackathon project for FreshWorks co&lt;div/> challenge


## Story ( you can skip this):
I would like to start with story of mine . I wanted to perform a stunt to grab all your attention and thought of playing around 3 big cloud provider technologies to develop this product and i finally did it.

so who are those big cloud providers ?

![imageedit_1_3239490324|686x500](https://dhcdn1.fra1.cdn.digitaloceanspaces.com/uploads/db3823/original/1X/d96eaa14eadd6f0a2353564732388222a619a1c7.png) 

Yes ! As you could see in the image  following are my targets
- MICROSOFT 
- GOOGLE 
- AMAZON

I wanted a common thing that would be beneficial and also a way to increase your efficiency over serving customers and I chose VOICE. 

> <h4><strong>Future is VOICE and VOICE is the only solution which is much more efficient and time-saving opportunity </strong></h4>

## What it does:
- Freshvoice app has ability to perform all operations over voice , Voice doesn't have any limits as long as you have freshwork rest APIs possiblity of features can be built as many as that.
- It allows you to create ticket under tag "freshvoice" and delete all tickets under the tag "freshvoice" for demo pupose.
- As mentioned above the possibilities of these functionalities are limitless .
- It has inbuilt browser voice intent recognition which can be activated by Microsoft Activator
- It has capability to work even from any voice enabled device ( ALEXA ) which can be activated by Alexa 
activator
- It has a Live Translator built in with this app


## How it is built:
<h4>Microsoft feature :</h4>
- I have bounded our JavaScript app with Microsoft Cognitive service for voice detection and for intent recognition LUIS.AI is used ( Language Understanding) .
- For this demo purpose in the LUIS portal i have created two tickets one for creating a dummy ticket with tag "freshvoice" and another for deleting all tickets that are created with tag "freshvoice".
- I have trained and published those models in LUIS portal and integrated with our javascript app
- so once the particular intent "create ticket" or "delete ticket" is identified then i will perform respective operations with help of Freshworks API

<h4>Alexa feature:</h4>
- I have created a node js app that is hosted in aws lambda with alexa skill trigger 
- In the alexa skill kit i have created intents for create and delete ticket
- In the node js app i have recognized those intents and will be triggering firebase reaaltime 
database to update a particular node
- This trigger event will then be captured back in our client app and will perform the respective 
operation

## Architecture:
Here is the high level architecture of FreshVoice App 

![Freshvoice (1)|409x500](https://dhcdn1.fra1.cdn.digitaloceanspaces.com/uploads/db3823/original/1X/cd7635e38ea5b3cdc26be1b261ab2e5f585df27a.jpeg)

<h4>GoogleAssistant:</h4>
- This is still in development and will work same as Alexa Skill

<h4>Live Translator:</h4>
- This feature allows us to live translate from one language to multiple languages
- The target language list can be updated with many languages but for demo purpose
i have added around 5 languages
- This works with help of Microsoft cognitive service Translator


## Challenges:
This is the fun part there are many learning when comes to implementing these features

- First challenge was "How to make a web socket connection ?"kind of thing in order to get response
and listen to event that are been send from external devices like Alexa or Google Assistant

In order to solve this problem i have used firebase realtime database which acts as a event listener and updates the database.

- Next challenge was " How to maintain the current user id with external device ?"  

In order to solve this problem i have used loggedinuser API where i got the user id which is supposed to be identical across different users. So once they ask alexa to " open fresh voice" they will be prompted
to enter the code to continue.
## Screenshot:
![Helpdesk_Lennox_India_Technology_Centre|690x341](https://dhcdn1.fra1.cdn.digitaloceanspaces.com/uploads/db3823/optimized/1X/3b85e0ff0ad107c74c9734ff2b7608198f060850_2_1035x511.png) 
![Helpdesk_Lennox_India_Technology_Centre (1)|690x319](https://dhcdn1.fra1.cdn.digitaloceanspaces.com/uploads/db3823/optimized/1X/9fdcd9a40d50be689d8083b479d288fc8875af72_2_1035x478.png) 

## About your team:
https://www.linkedin.com/in/divakarkd/

## Future Scope:
- I will be implementing Google Assistant feature
- I will be implementing sharing feature for live translator with which anyone 
can view the live translation with their language preference.

## Demo Link:
https://youtu.be/zN0YwgTrtZQ
