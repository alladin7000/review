document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Submit new compose form
  document.querySelector('#compose-form').onsubmit = function () {
    recipients = document.querySelector('#compose-recipients').value;
    subject = document.querySelector('#compose-subject').value;
    body = document.querySelector('#compose-body').value;

    fetch('/emails', {
      method: "POST",
      body: JSON.stringify({
       recipients: recipients,
       subject: subject,
       body: body,
      })
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
    });

    compose_email();
    return false;
  };

  load_mailbox('inbox');
});

function compose_email() {
  
  document.title = "compose";

  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector(".content").style.display = 'none';

  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  document.title = mailbox;
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('.content').style.display = 'none';

  if (mailbox == "sent"){
    fetch('/emails/sent')
    .then(response => response.json())
    .then(result => {
      create_mailbox(result, mailbox);
    })
  }
  else if (mailbox == "inbox"){
    fetch('/emails/inbox')
    .then(response => response.json())
    .then(result => {
      create_mailbox(result, mailbox);
    })
  }
  else if (mailbox == "archive"){
    fetch('/emails/archive')
    .then(response => response.json())
    .then(result => {
      create_mailbox(result, mailbox);
    })
  }

  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}

function create_mailbox (result, mailbox) {


  for (i = 0; i < result.length; i++){
    var div = document.createElement('div');
    div.id = `${result[i].id}`;
    div.className = "mail-box";
    div.innerHTML = `<b>${result[i].subject}</b><br>Recipients: ${result[i].recipients}<br>Sender: ${result[i].sender}<br>${result[i].timestamp} `;
    
    if (mailbox == "sent"){
      div.title = "sent";
    } else if (mailbox == "inbox"){
      div.title = "inbox";
    } else if (mailbox == "archived"){
      div.title = "archived";
    }

    if (result[i].read != true){
      div.classList = "mail-box read";
    }
    document.querySelector('#emails-view').append(div);
  }

  // Redirect to mail
  document.querySelectorAll(".mail-box").forEach(function (box) {
    box.addEventListener("click", () => {
      document.querySelector("#emails-view").style.display = 'none';
      document.querySelector('#compose-view').style.display = 'none';
      document.querySelector('.content').style.display = 'block';
      
      document.querySelector('#archive-button').style.display = 'none';
      document.querySelector('#unarchived-button').style.display = 'none';
      document.querySelector('#reply-button').style.display = 'none';

      if (box.title == "inbox"){
        fetch(`emails/${box.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            read:false
          })
        })
      }

      fetch(`emails/${box.id}`)
      .then(response => response.json())
      .then(result => {
        document.title = `Subject: ${result.subject}`;
        
        const contain = document.querySelector('.content');
        const newdiv = document.querySelector('.top-mail');
        const newdiwadd = document.querySelector('.bottom-mail');
        const menu = document.querySelector('.menu-mail');
      
        var back = document.querySelector('#back');
        back.addEventListener('click', function () {
          document.querySelector('#emails-view').removeChild(document.querySelector('.mail-box'));
          load_mailbox("inbox");
        })

        if (mailbox == "inbox"){
          const button = document.querySelector('#archive-button');
          button.style.display = 'inline-block';
          button.addEventListener('click', function () {
            fetch(`emails/${result.id}`, {
              method: "PUT",
              body: JSON.stringify({
                archived: true
              })
            })
            button.innerHTML = "Archived";
            button.disabled = true;
          });
        }

        if (mailbox == "archive"){
          const button = document.querySelector("#unarchived-button");
          button.style.display = 'inline-block';
          button.addEventListener("click", function () {
            fetch(`emails/${result.id}`, {
              method: "PUT",
              body: JSON.stringify({
                archived: false
              })
            })
            button.innerHTML = "Unarchived!";
            button.disabled = true;
          })
        }
        
        if (mailbox != "sent"){
          const recompose = document.querySelector("#reply-button");
          recompose.style.display = 'inline-block';
          recompose.addEventListener("click", function () {
            compose_email();
            document.querySelector("#compose-recipients").value = result.sender;
            if (result.subject[0] == 'R' && result.subject[1] == 'E' && result.subject[2] == ":"){
              document.querySelector("#compose-subject").value = result.subject;
            } else {
              document.querySelector("#compose-subject").value = `RE: ${result.subject}`;
            }
            document.querySelector("#compose-body").value = `On Jan 1 2020, 12:00 AM ${result.sender} wrote: ${result.body}\n`;
          })
        }
        
        newdiv.innerHTML = `Subject: <b id="subject">${result.subject}</b><br>${result.timestamp}<br>Sender: ${result.sender}<br>Recipients: ${result.recipients}`;
        newdiwadd.innerHTML = `<p>${result.body}</p>`;
      })
    })
  })
}