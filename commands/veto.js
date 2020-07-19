


//Ordem de acontecimentos md1
const md1Schedule = [
    'veto1',
    'veto2',
    'veto1',
    'veto2',
    'veto1',
    'veto2',
]

//Ordem de acontecimentos md3
const md3Schedule = [
    'veto1',
    'veto2',
    'pick1',
    'pick2',
    'veto1',
    'veto2',
]

//Definindo a legenda

//Informação guardada dos picks e bans
const vetos = {

    mirage: {
        name:"Mirage",
        symbol:"",
        ordemVeto:0,
        mapState:''
    },
    train: {
        name:"Train",
        symbol:"",
        ordemVeto:1,
        mapState:''
    },
    overpass: {
        name:"Overpass",
        symbol:"",
        ordemVeto:2,
        mapState:''
    },
    dust2: {
        name:"Dust2",
        symbol:"",
        ordemVeto:3,
        mapState:''
    },
    vertigo: {
        name:"Vertigo",
        symbol:"",
        ordemVeto:4,
        mapState:''
    },
    nuke: {
        name:"Nuke",
        symbol:"",
        ordemVeto:5,
        mapState:''
    },
    inferno: {
        name:"Inferno",
        symbol:"",
        ordemVeto:6,
        mapState:''
    }
}

//slice unshift



let arrayOrdem = [
"" + vetos.mirage.symbol + "" + vetos.mirage.name + "" + vetos.mirage.mapState,
"" + vetos.train.symbol + "" + vetos.train.name + "" + vetos.train.mapState,
"" + vetos.overpass.symbol + "" + vetos.overpass.name + "" + vetos.overpass.mapState,
"" + vetos.dust2.symbol + "" + vetos.dust2.name + "" + vetos.dust2.mapState,
"" + vetos.vertigo.symbol + "" + vetos.vertigo.name + "" + vetos.vertigo.mapState,
"" + vetos.nuke.symbol + "" + vetos.nuke.name + "" + vetos.nuke.mapState,
"" + vetos.inferno.symbol + "" + vetos.inferno.name + "" + vetos.inferno.mapState
];






//Declaração das variáveis "globais"
let asmsg, gameFormat, vetoState, turn = 0;

//Definindo o formato da mensagem enviada
let msg;

//Definindo os usuários marcados

let team1, team2;

//Criando a variável que ira guardar a role Vetando

let vetoRole;

//Definindo a função execute
const execute = function(message, args) {



    //Criando uma variável pra informar a ação que acabou de acontecer
    let doneAction;


    const serverRoles = message.guild.roles.cache;
    let mapaEscolhido = args[0];
    

    //Cria a role Vetando no começo da execução
    if(serverRoles.find(role => role.name === 'Vetando') === undefined && gameFormat === undefined){
        message.guild.roles.create({ data: { name: 'Vetando', color: 'BLUE' } });
    }

    vetoRole = serverRoles.find(role => role.name ==='Vetando');




    //Deleta todas as mensagens anteriores 
    try {
        if(gameFormat === undefined){
            message.channel.bulkDelete(100);
        }
    } catch (error) {
        console.log("erro no primeiro bulkdelete")
    }
    

    //Não deixa o comando ser executado sem argumentos
    if (!args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    } 
   

    //Não permite o usuário digitar o formato mais de uma vez
    else if(gameFormat != undefined & (args[0] === 'md1' || args[0] === 'md3' || args[0] === 'md5')){
        
        return message.channel.send('\`\`\`O formato de jogo já foi escolhido \`\`\`'); 
        
    }
    //Não deixa o usuário vetar um mapa que ja foi vetado
    else if(gameFormat !== undefined && (gameFormat === 'votingmd1' || gameFormat === 'votingmd3' || gameFormat === 'votingmd5')){
        if(vetos[args[0].toLowerCase()].symbol !== ""){
            try {
                errorText.delete();
            } catch(err){}
             message.channel.send('\`\`\`O mapa já foi pickado/vetado \`\`\`'); 
            console.log("mapchosen");
            return;
        }
        
    }

    //Define o formato de argumento que o usuário deve colocar na hora de escolher quem vai vetar
    else if(gameFormat !== undefined && gameFormat.slice(0, 14) === 'choosingPlayers' && (message.mentions.members.size !== 2)){
       return message.channel.send('\`\`\`Argumentos inválidos\`\`\`');
    }

    //Não deixa o usuário digitar um comando random

    
    


    //Seta coisas para a md1
    if (args[0] === 'md1' & gameFormat === undefined) {
        gameFormat = 'choosingPlayersmd1';
        vetoState = md1Schedule[turn];
        vetos.format = 'MD1';
    }
    //Seta coisas para a md3
    else if(args[0] === 'md3' & gameFormat === undefined){       
        gameFormat = 'choosingPlayersmd3';
        vetoState = md3Schedule[turn];
        vetos.format = 'MD3';
    } 
    
    //Marcando os jogadores

    else if((gameFormat === 'choosingPlayersmd1' || gameFormat === 'choosingPlayersmd3') && message.mentions.members.size === 2){
        
        team1 = message.mentions.members.first();
        team2 = message.mentions.members.last();

        team1.roles.add(vetoRole);
        team2.roles.add(vetoRole);

        if(gameFormat === 'choosingPlayersmd1'){
            gameFormat = 'votingmd1';
        }else if(gameFormat === 'choosingPlayersmd3'){
            gameFormat = 'votingmd3';
        }
    }



    //Banning commands
    else if(message.member === personTurn(turn, team1, team2) & vetoState.slice(0,4) === 'veto' & (gameFormat === 'votingmd1' || gameFormat === 'votingmd3') & args[0].toLowerCase() === 'mirage' & turn < 7){banMap(message, args);}
    else if(message.member === personTurn(turn, team1, team2) & vetoState.slice(0,4) === 'veto' & (gameFormat === 'votingmd1' || gameFormat === 'votingmd3') & args[0].toLowerCase() === 'inferno' & turn < 7){banMap(message, args);}
    else if(message.member === personTurn(turn, team1, team2) & vetoState.slice(0,4) === 'veto' & (gameFormat === 'votingmd1' || gameFormat === 'votingmd3') & args[0].toLowerCase() === 'train' & turn < 7){banMap(message, args);}
    else if(message.member === personTurn(turn, team1, team2) & vetoState.slice(0,4) === 'veto' & (gameFormat === 'votingmd1' || gameFormat === 'votingmd3') & args[0].toLowerCase() === 'nuke' & turn < 7){banMap(message, args);}
    else if(message.member === personTurn(turn, team1, team2) & vetoState.slice(0,4) === 'veto' & (gameFormat === 'votingmd1' || gameFormat === 'votingmd3') & args[0].toLowerCase() === 'dust2' & turn < 7){banMap(message, args);}
    else if(message.member === personTurn(turn, team1, team2) & vetoState.slice(0,4) === 'veto' & (gameFormat === 'votingmd1' || gameFormat === 'votingmd3') & args[0].toLowerCase() === 'overpass' & turn < 7){banMap(message, args);}
    else if(message.member === personTurn(turn, team1, team2) & vetoState.slice(0,4) === 'veto' & (gameFormat === 'votingmd1' || gameFormat === 'votingmd3') & args[0].toLowerCase() === 'vertigo' & turn < 7){banMap(message, args);}

    //picking commands

    else if(message.member === personTurn(turn, team1, team2) & vetoState.slice(0,4) === 'pick' & (gameFormat === 'votingmd1' || gameFormat === 'votingmd3') & args[0].toLowerCase() === 'mirage' & turn < 7){pickMap(message, args);}
    else if(message.member === personTurn(turn, team1, team2) & vetoState.slice(0,4) === 'pick' & (gameFormat === 'votingmd1' || gameFormat === 'votingmd3') & args[0].toLowerCase() === 'inferno' & turn < 7){pickMap(message, args);}
    else if(message.member === personTurn(turn, team1, team2) & vetoState.slice(0,4) === 'pick' & (gameFormat === 'votingmd1' || gameFormat === 'votingmd3') & args[0].toLowerCase() === 'train' & turn < 7){pickMap(message, args);}
    else if(message.member === personTurn(turn, team1, team2) & vetoState.slice(0,4) === 'pick' & (gameFormat === 'votingmd1' || gameFormat === 'votingmd3') & args[0].toLowerCase() === 'nuke' & turn < 7){pickMap(message, args);}
    else if(message.member === personTurn(turn, team1, team2) & vetoState.slice(0,4) === 'pick' & (gameFormat === 'votingmd1' || gameFormat === 'votingmd3') & args[0].toLowerCase() === 'dust2' & turn < 7){pickMap(message, args);}
    else if(message.member === personTurn(turn, team1, team2) & vetoState.slice(0,4) === 'pick' & (gameFormat === 'votingmd1' || gameFormat === 'votingmd3') & args[0].toLowerCase() === 'overpass' & turn < 7){pickMap(message, args);}
    else if(message.member === personTurn(turn, team1, team2) & vetoState.slice(0,4) === 'pick' & (gameFormat === 'votingmd1' || gameFormat === 'votingmd3') & args[0].toLowerCase() === 'vertigo' & turn < 7){pickMap(message, args);}
    



    //Apagando o log e imprimindo o atual
    try {
        message.channel.bulkDelete(100);
    } catch (error) {}
    

    if(turn < 6 && gameFormat.slice(0, 14) !== 'choosingPlayer' ){
        if(turn % 2 === 0){
             message.channel.send("\`\`\`" + team1.user.username+", escolha um mapa para " + vetoState.slice(0,4) + "\`\`\`");
        }
        else {
             message.channel.send("\`\`\`" + team2.user.username+", escolha um mapa para " + vetoState.slice(0,4) + "\`\`\`");
        }  
    }
    else if(gameFormat.slice(0, 14) === 'choosingPlayer'){
        if(message.mentions.members.size === 0){
            message.channel.send(" \`\`\`Marque o nome dos 2 jogadores que vão vetar no formato \n!!veto nome1 nome2 \`\`\`");
        }
    }
    else{
        message.channel.send("Vetos finalizados");
    }
    

    //Apagando a última table e imprimindo a atualizada
    
    

    
    updateMsg(message, args, vetos);
    message.channel.send(msg);  
    
}
        
    
module.exports = {
    name: 'veto',
    execute
}


//Picka o mapa no objeto vetos
function pickMap(message, args, asmsg){
    vetos[args[0].toLowerCase()].symbol = '+ ';
    if(turn === 2){
        vetos[args[0].toLowerCase()].mapState = '   --->  Map' + (turn - 1) + ' (' + team1.user.username + ')';
    }
    else if(turn === 3){
        vetos[args[0].toLowerCase()].mapState = '   --->  Map' + (turn - 1) + ' (' + team2.user.username + ')';
    }

    doneAction = 'pick';
    turn = turn + 1;

    //idenficação do tipo de game
    
    if(gameFormat === 'votingmd1'){
        vetoState = md1Schedule[turn];
    }
    else if(gameFormat === 'votingmd3'){
        vetoState = md3Schedule[turn];
    }


}

//Bane o mapa no objeto vetos
function banMap(message, args, asmsg){
    vetos[args[0].toLowerCase()].symbol = '- ';
    turn = turn + 1;
    doneAction = 'ban';
    
    //idenficação do tipo de game e atualizando o veto
    
    if(gameFormat === 'votingmd1'){
        vetoState = md1Schedule[turn];
    }
    else if(gameFormat === 'votingmd3'){
        vetoState = md3Schedule[turn];
    }


}

//encontrando o mapa que sobrou
function lastMap(){
    if(vetos.mirage.symbol === ''){return vetos.mirage}
    if(vetos.inferno.symbol === ''){return vetos.inferno}
    if(vetos.vertigo.symbol === ''){return vetos.vertigo}
    if(vetos.dust2.symbol === ''){return vetos.dust2}
    if(vetos.train.symbol === ''){return vetos.train}
    if(vetos.overpass.symbol === ''){return vetos.overpass}
    if(vetos.nuke.symbol === ''){return vetos.nuke}
}

//Atualiza a table a ser enviada
function updateMsg(message, args, vetos){

    if(turn !== 0 ){
        ordenarVetoMd3(vetos[args[0].toLowerCase()], vetos);
    }

    //pickando o mapa que sobra
    if(turn === 6){
        const thisMap = lastMap();
        thisMap.symbol = '+ ';
        if(gameFormat === 'votingmd1'){
            thisMap.mapState = '   --->  Map';
        }
        else if(gameFormat === 'votingmd3'){
            thisMap.mapState = '   --->  Map' + (turn - 3);
        }
        doneAction = 'pick';
        ordenarVetoMd3(thisMap, vetos);
        }

    msg =`\`\`\`diff
                                 ${vetos.format} 
${arrayOrdem[0]}
${arrayOrdem[1]}
${arrayOrdem[2]}
${arrayOrdem[3]}
${arrayOrdem[4]}
${arrayOrdem[5]}
${arrayOrdem[6]}
\`\`\``

    
}

//Retorna de quem é a vez
function personTurn(turn, team1, team2){
    if(turn % 2 === 0){
        return team1;
    } else {
        return team2;
    }
}

//Atualizando o objeto com as ordens dos mapas
function ordenarVetoMd3(map, vetos){


    const removedIndex = map.ordemVeto;
    let startIndex;

    //Se for um pick


    if(doneAction === 'pick'){ 
        
        //Tirando o elemento pickado
        arrayOrdem.splice(removedIndex, 1);


        //Checando quantos mapas ja foram pickados e colocando os picks em baixo deles e reoganizando os indicies
        if(arrayOrdem[1].startsWith('+')){
            startIndex = 2;
            
            arrayOrdem.splice(startIndex, 0, "" + map.symbol + "" + map.name + "" + map.mapState);

            for(let props in vetos){
                if(vetos[props].ordemVeto < removedIndex && vetos[props].ordemVeto >= startIndex){
                    vetos[props].ordemVeto += 1;
                }
            }
            map.ordemVeto = 2;
            
        }
        else if(arrayOrdem[0].startsWith('+')){
            startIndex = 1;
            
            arrayOrdem.splice(startIndex, 0, "" + map.symbol + "" + map.name + "" + map.mapState);

            for(let props in vetos){
                if(vetos[props].ordemVeto < removedIndex && vetos[props].ordemVeto >= startIndex){
                    vetos[props].ordemVeto += 1;
                }
            }
            map.ordemVeto = startIndex;
        }
        else{
            startIndex = 0;
            
            arrayOrdem.unshift("" + map.symbol + "" + map.name + "" + map.mapState);

            for(let props in vetos){
                if(vetos[props].ordemVeto < removedIndex){
                    vetos[props].ordemVeto += 1;
                }
            }
            map.ordemVeto = startIndex;
        }
    }


    //if its a ban


    else if(doneAction === 'ban'){
        arrayOrdem.splice(removedIndex, 1);
        arrayOrdem.push("" + map.symbol + "" + map.name + "" + map.mapState);

        for(let props in vetos){
            if(vetos[props].ordemVeto > removedIndex){
                vetos[props].ordemVeto -= 1;
            }
        }
        map.ordemVeto = 6;
    }

}




