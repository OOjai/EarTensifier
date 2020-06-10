const Command = require('../../structures/Command');

const moment = require('moment');
const momentDurationFormatSetup = require('moment-duration-format');
momentDurationFormatSetup(moment);
const fastForwardNum = 10;

module.exports = class Forward extends Command {
	constructor(client) {
		super(client, {
			name: 'forward',
			description: 'Fast forwards a song (default 10 seconds).',
			cooldown: '10',
			usage: '<seconds>',
			aliases: ['ff', 'fastforward'],
			inVoiceChannel: true,
			sameVoiceChannel: true,
			playing: true,
		});
	}
	async run(client, message, args) {
		const player = client.manager.players.get(message.guild.id);

		if (args[0] && !isNaN(args[0])) {
			if ((player.position + args[0] * 1000) < player.queue[0].duration) {
				player.seek(player.position + args[0] * 1000);
				const parsedDuration = moment.duration(player.position, 'milliseconds').format('hh:mm:ss', { trim: false });
				return message.channel.send(`Fast-forwarded to ${parsedDuration}`);
			}
			else { return message.channel.send('Cannot forward beyond the song\'s duration.'); }
		}
		else if (args[0] && isNaN(args[0])) { return message.reply(`Invalid argument, must be a number.\nCorrect Usage: \`${client.settings.prefix}forward <seconds>\``); }

		if (!args[0]) {
			if ((player.position + fastForwardNum * 1000) < player.queue[0].duration) {
				player.seek(player.position + fastForwardNum * 1000);
				const parsedDuration = moment.duration(player.position, 'milliseconds').format('hh:mm:ss', { trim: false });
				return message.channel.send(`Fast-forwarded to ${parsedDuration}`);
			}
			else {
				return message.channel.send('Cannot forward beyond the song\'s duration.');
			}
		}
	}
};
