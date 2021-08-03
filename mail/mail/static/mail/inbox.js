
document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  // By default, load the inbox
  load_mailbox('inbox');

  

  
});



function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = "";
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';


  document.querySelector('#compose-form').onsubmit = () => {

    //console.log(document.querySelector('#compose-recipients').value);

    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: document.querySelector('#compose-recipients').value,
          subject: document.querySelector('#compose-subject').value,
          body: document.querySelector('#compose-body').value
      })
    })
    .then(response => response.json() )
    .then(result => {
        console.log(result);
        load_mailbox('sent');
    });
    return false;
  };
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // fetch para la api de las bases de todos los mails de un box (inbox, sent, archived)

  fetch(`emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    //print emails

    const x = document.querySelector("#emails-view");
    console.log(emails.length)

    
    if (emails.length == 0) {
      x.innerHTML = `No hay correos en la bandeja: ${mailbox}`

    }
    else {

      /*lo que tengo que hacer es iterar primero por los mails, al tener el primer mail, tengo
      que crear su div y en su div hay al div hay que darle formato y así para abajo. */

      for (let email of emails) {
        const emailDiv = document.createElement("div")
        emailDiv.innerHTML += email.sender
        emailDiv.innerHTML += email.subject
        emailDiv.innerHTML += email.timestamp

        if (email.read == "false") {
          emailDiv.style.background = "white"
        } else {
          emailDiv.style.background = "gray"
        }


        document.querySelector("#emails-view").append(emailDiv)
        console.log(email)

      }

      /*codigo antiguo para probar
      const element = document.createElement("div");
      element.innerHTML = `El sender: ${emails[0].sender}` 
      // x.innerHTML = `El sender: ${emails[0].body}` condigo primero para ver que aparece y lanza 
      // el fetch
      x.append(element) 
      */
    }

      } 
    )
  }
  
  




