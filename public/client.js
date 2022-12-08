const socket= io()
const msgArea = document.getElementById("msgArea")

const Name =  document.getElementById("userName").innerHTML
const messege = document.getElementById("Messege")
const btn = document.getElementById("sendbtn")


btn.addEventListener("click", function(){
   
    let msgtxt = messege.value
   
    if(msgtxt != ""){
        console.log("messege = "+msgtxt)
        let msg= {
            user: Name,
            messege: msgtxt
        }
        messege.value = "";
        appendMessge(msg,'outgoing','justify-content-end')
        socket.emit('messege', msg)
    }
    
})


function appendMessge(msg, type, justify){
    let newMsg = document.createElement("div")
    newMsg.classList.add('row',justify, type)

    let content = `
        <div class="col-auto messege">
        <h4>${msg.user}</h4>
        <p class="${type}text">${msg.messege}</p>    
        </div>
    `
    newMsg.innerHTML = content
    msgArea.appendChild(newMsg)
    
    msgArea.scrollTop = msgArea.scrollHeight - msgArea.clientHeight;
}



//receive msgs
socket.on('messege', (msg) => {
    appendMessge(msg, 'incoming', 'justify-content-start')
})
