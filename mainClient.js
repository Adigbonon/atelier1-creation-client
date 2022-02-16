const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
const net = require('net');


const start = async () =>{

    /**await client.on('data', function (data){
        console.log(data.toString('utf-8'));
    })

    await client.on('error', function(err) {
        console.log(err);
    }).then( ()=> {
        readline.setPrompt("Pierre(0) /Papier(1) /Ciseaux (2) /Quitter (q/Q) : ");
    readline.prompt()})**/

    client.on('data', function (data){
        console.log(data.toString('utf-8'));
    })

    client.on('error', function(err) {
        console.log(err);
    }).then(()=>{
       readline.setPrompt("Pierre(0) /Papier(1) /Ciseaux (2) /Quitter (q/Q) : ");
       readline.prompt()
        for  (const content of readline){
        if (content == 'q' || content == 'Q') {
            process.exit(0)
        } else {
            try {
                console.log("La connexion a été fait.")
                client.write(content)

                //envoyer le numéro du joueur
                //attendre la réponse
                //afficher le score
            } catch (e) {
                console.error(e)
            }
            readline.prompt()
        }
    }} )
       .catch()
}


let client = net.createConnection({ host:'127.0.0.1', port:5000 }, () =>{
    //récup num joueur
    start()
})

