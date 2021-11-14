
const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const { token } = require('./config.json');
const { fetchData } = require('./price');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, 'GUILD_MEMBERS', 'GUILD_INVITES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'] });

// When the client is ready, run this code (only once)
client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
      });

       client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()){
                 console.log('not a command')
         } 

 	const { commandName } = interaction;

 	if (commandName === 'commands' && interaction.channelId === "900919063692333106") {
		const helpEmbed = new MessageEmbed()
    
        // Set the title of the field
        .setTitle("Here's a list of things I can do!")
        // Set the color of the embed
        .setColor(0x46496)
        // Set the main content of the embed
        .setDescription( "\r\n" + "\r\n" + "**/commands** - List of commands" + "\r\n" + "**/admin** - List of Admins" + "\r\n" + "**/price** (Only in Price-Check Channel) - Current price information of PatCoin" + "\r\n" + "**/site** - PatCoin website" + "\r\n" + "**/buy** - where to buy PatCoin" + "\r\n" +  "**/address** - Official PatCoin Contract Address" + "\r\n" +"**/tracker** - PatCoin Tracker");
      // Send the embed to the same channel as the message
      await interaction.reply({embeds: [helpEmbed]});
 	} else if (commandName === 'site' && interaction.channelId === "900919063692333106") {
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setURL('https://patcoin.io/')
				.setLabel('PatCoin Website')
				.setStyle('LINK'),
		);
 		await interaction.reply({content: 'This is the Official PatCoin Website' , components: [row]});
 	} else if (commandName === 'tracker' && interaction.channelId === "900919063692333106") {
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setURL('https://patboard.netlify.app/')
				.setLabel('PatBoard Tracker')
				.setStyle('LINK'),
		);
 		await interaction.reply({content: 'This is the PatBoard Tracker' , components: [row]});
 	} else if (commandName === 'buy' || commandName === 'address' && interaction.channelId === "900919063692333106") {
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setURL('https://pancakeswap.finance/swap')
				.setLabel('PancakeSwap')
				.setStyle('LINK'),
		);
		const addressEmbed = new MessageEmbed()
			.setColor('0x46496')
			.setTitle('PatCoin Contract Address')
			.setDescription('0xE265467D89ed55c2B5fE3cACDac85A7d13ADACb1');
 		await interaction.reply({ embeds: [addressEmbed], components: [row]});
 	} else if (commandName === "admin" && interaction.channelId === "900919063692333106") {
		interaction.guild.roles.fetch()
		.then(roles => console.log(`${roles}`))
		.catch(console.error);
		// members = Client.guild.roles.cache.find(role => role.name === 'Admin').members.map(m=>m.user.tag);

		// 	 const adminsEmbed = new MessageEmbed()
		// 	 .setColor('0x46496')
		// 	 .setTitle('List of Admins')
		// 	 .setDescription(members.join("\n"));
		// 	await interaction.reply({embeds: [adminsEmbed]});
	 } else if (commandName === "price" && interaction.channelId === "900919063692333106") {
			let res = await fetchData();
			const priceEmbed = new MessageEmbed()
			 .setColor('0x46496')
			 .setTitle('PatCoin Price Information')
			 .setURL('https://poocoin.app/tokens/0xe265467d89ed55c2b5fe3cacdac85a7d13adacb1')
			 .setDescription('Price: ' + res.current + '\r\n' + 'Market Cap: ' + res.cap);
			await interaction.reply({embeds: [priceEmbed]});
	 }
 });


// Login to Discord with your client's token
client.login(token);


// client.on('message', price);
     
//     async function price(msg) {
//         if (msg.content === '/price' && msg.channel.id === "909157714029051967") {
   
//             let url = proccess.env.liveStatsAPI
//             let response = await fetch(url);
//             let json = await response.json();
//             const embed = new MessageEmbed()
//         // Set the title of the field
//                 .setTitle("Current price information of PatCoin:")
//         // Set the color of the embed
//                 .setColor(0x2FC8F2)
//         // Set the main content of the embed
//                 .setDescription( "\r\n" + "\r\n" + 'Price is $' + parseFloat(json.price).toFixed(13) + 'USD' 
//                                 + "\r\n" + 'Circulating supply is ' + parseFloat((json.circulating_supply).toFixed(2)).toLocaleString('EN-en') + ' Tokens.'
//                                 + "\r\n" + 'Percent of supply burned is ' + parseFloat(((json.total_burned / json.max_supply) * 100)).toFixed(2) + '%'
//                                 + "\r\n" + 'Current Market Cap is $' + parseFloat((json.market_cap).toFixed(2)).toLocaleString('EN-en') + ' USD' + "\r\n"
//         );
//       // Send the embed to the same channel as the message
//                 msg.reply(embed);
//     }};
