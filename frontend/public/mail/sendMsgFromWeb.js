const form = document.querySelector("form");


const resetFormAfterSend = () => {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const { name, email, message } = e.target;

  const msgBody = JSON.stringify({
    senderName: name.value,
    senderEmail: email.value,
    message: message.value
  });
  console.log(msgBody);

  await Email.send({
    Host: "smtp.elasticemail.com",
    Username: "tdog.evolveu@gmail.com",
    Password: "3B0B6C90CFA4E796D33BB116BC51B53D3993",
    To: 'tdog.evolveu@gmail.com',
    From: "tdog.evolveu@gmail.com",
    Subject: "Message from Eval-view site",
    Body: msgBody,
  })
    .then(() => {
      alert("Thanks for contacting us. Your message has been successfully sent🚀");
      resetFormAfterSend();

    });
})