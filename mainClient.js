const net = require('net');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
let tab= [];
class Player {

    constructor(){
        this.pseudo = undefined;
        this.choice = undefined;
    }
    
    init() {}

    getPseudo() {
        return this.pseudo;
    }
    changePseudo(pseudo) {
        this.pseudo = pseudo;
    }

    getChoice() {
        return this.choice;
    }
    changeChoice(choice) {
        this.choice = choice;
    }

    answerUser() {
        return new Promise((resolve, reject) => {
            readline.question('', (input) => resolve(input) );
    });

    }

    async request(verb, url, content){
        let client = net.createConnection({ host:'127.0.0.1', port:5000 }, () =>{
            client.write(`${verb} /${encodeURI(url)} HTTP/1.1\r\n`)
            client.write('Content-Type: text/plain\r\n')
            client.write(`Content-Length: ${content.length}\r\n\r\n`)
            client.write(`${content}\r\n`)
        })    
        client.setTimeout(30000)
        client.setEncoding('utf8')    
        client.on('data', function (data) {
            console.log(data)
            tab.push(data);
        })    
        await new Promise(resolve => {
            client.on('close', resolve)
        })
    };

}
const start = async( ) => { 
    try{
        let player = new Player();

        console.log('Bienvenue au jeu pierre, papier, ciseaux, pour jouer rien de plus simple',
        '\nil vous suffit de saisir : Pierre(0) | Papier(1) | Ciseaux(2) | Quitter (e)',
        '\nCe jeu joue entre 2 personnes \n');
        console.log('Veuillez saisir le nom de votre pseudo : ');
        player.answerUser()
            .then(responseUser => { 
                player.changePseudo(responseUser);
                console.log('Saisissez votre choix parmis : Pierre(0) | Papier(1) | Ciseaux(2) | Quitter (e)');
                return player.answerUser();
            })
            .then(responseUser => {
                return player.changeChoice(responseUser);
            })
            .then(() => { 
                return player.request('POST',player.getPseudo(), player.getChoice());
            })
            .then(()=> { 
               return player.request('GET','','');
            })
            // Axe d'amélioration
            // .then(()=>{
            //     let tab1 = tab[tab.length-1].split(' ');
            //     console.log('tab1', tab1);
            //     let tab2 = tab1[tab.length-1].split(' ').join();
            //     console.log('tab2', tab2);
            //     let tab3 = tab1[tab.length-1].split(' ').join();
            //     console.log('tab3', tab3);
            //     let tab4 = [tab2, tab3];
            //     let tab5 = tab4[0].split(/\t1?\n1/);
            //     let tab6 = tab4[1].split(/\t1?\n1/);

            //    console.log('tab5',tab5);
            //    console.log('tab6', tab6);
            // })
            .catch(e => { 
                console.error(e);
            })
    }
    catch(e){
        console.error(e);
    }
}

start();
