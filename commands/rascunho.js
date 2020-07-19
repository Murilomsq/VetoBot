const { ActivityFlags } = require("discord.js");

function ordenarVeto(map, vetos){
    
    const removedIndex = map.ordemVeto;
    arrayOrdem.splice(map.ordemVeto, 1);
    arrayOrdem.unshift("" + map.symbol + "" + map.name + "" + map.mapState);
    for(let props in vetos){
        if(vetos[props].ordemVeto < removedIndex){
            vetos[props].ordemVeto += 1;
        }
    }
    map.ordemVeto = 0;
}



function ordenarVetoMd3(){

    
    const removedIndex = map.ordemVeto;
    let startIndex;



    //Se for um pick


    if(doneAction = 'pick'){ 
        
        
        
        //Tirando o elemento pickado

        arrayOrdem.splice(removedIndex, 1);


        //Checando quantos mapas ja foram pickados e colocando os picks em baixo deles e reoganizando os indicies
        if(arrayOrdem[1].startsWith('+')){
            startIndex = 2;
            
            arrayOrdem.splice(startIndex, 0, "" + map.symbol + "" + map.name + "" + map.mapState);

            for(let props in vetos){
                if(vetos[props].ordemVeto < removedIndex && vetos[props].ordemVeto > startIndex){
                    vetos[props].ordemVeto += 1;
                }
            }
            map.ordemVeto = startIndex;
            
        }
        else if(arrayOrdem[0].startsWith('+')){
            startIndex = 1;
            
            arrayOrdem.splice(startIndex, 0, "" + map.symbol + "" + map.name + "" + map.mapState);

            for(let props in vetos){
                if(vetos[props].ordemVeto < removedIndex && vetos[props].ordemVeto > startIndex){
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


    else if(doneAction = 'ban'){
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