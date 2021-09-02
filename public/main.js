
var socket = io.connect("http://localhost:8080", { forceNew: true });

function render(data) {
  console.log(typeof data)
  var html = data
  .map(function (elem, index) {
    return `<tr>
    <th scope="row">${index+1}</th>
    <td>${elem.title}</td>:
    <td>${elem.price}</td>
    <td><img src =${elem.thumbnail} width="100" height="100"></td>
    </tr>`;
  })
  .join(" ");
  document.getElementById("messages").innerHTML = html;
}

socket.on("messages", function (data) {
  let index = data.items.length
  console.log(data.items)
  render(data.items, index)
});

function addMessage(e) {
  var message = {
    id: 0,
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
    };
console.log(message)
//emit var message with form values with the event new-messages
socket.emit("new-message", message);
  return false;
}

//CHAT


function renderChat(data) {
  console.log(typeof data)
  var html = data
  .map(function (elem, index) {
    return `<div>
    <p align="left" style="color: brown">
    <strong style="color: blue">${elem.email}</strong>
   ${elem.date}:
    <i style="color: green">${elem.opinion}</i>
    </p>
    </div>`;
  })
  .join(" ");

  document.getElementById("mensajes").innerHTML = html;
}

socket.on("mensajes", function (data) {
  console.log(data)
  renderChat(data,)
});

function addMensaje(e) {
  let date = new Date()
  var mensaje = {
    email: document.getElementById("email").value,
    date: date,
    opinion: document.getElementById("opinion").value,
    };
console.log(mensaje)
if(document.getElementById("email").value != 0){
socket.emit("new-mensaje", mensaje);
  return false;
}else
console.log("se requiere un email")
}
