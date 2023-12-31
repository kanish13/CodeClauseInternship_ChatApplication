var server=require("ws").Server;

var s=new server({port:5001})
const textDecoder = new TextDecoder('utf-8'); 
s.on("connection",function(ws){
    ws.on("message",function(message){
        console.log("Received"+" "+message)
        
        message=JSON.parse(message)

        if(message.type=="name"){
            ws.personName=message.data;
            return;
        }

        s.clients.forEach(function e(client){
            if(client!=ws){
          
            client.send(JSON.stringify({
                name:ws.personName,
                data:message.data
            }))}
        })

    })
    ws.on("close",function(){
        console.log("I lost a client")
    })
   
})