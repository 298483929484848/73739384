exports.run = (client) => {
    console.log('Preparing...');
    client.user.setGame(" b>help | <Beta/>");
    console.log('Loading users... '+client.users.size+'\nLoading channels... '+client.channels.size+'\nLoading servers... '+client.guilds.size+'\n'+client.user.id+' is successfully online!');
}
