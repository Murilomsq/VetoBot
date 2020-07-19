module.exports = {
    name: 'ajuda',
    execute(message, args){

        const member1 = message.mentions.members.first();
       

        const serverRoles = message.guild.roles.cache;
        
        if(message.member === member1){
            console.log("works");
        }

        
    }
}