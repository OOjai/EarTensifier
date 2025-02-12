const { MessageEmbed } = require('discord.js');

const Command = require('../../structures/Command');

module.exports = class Vaporwave extends Command {
    constructor(client) {
        super(client, {
            name: 'vaporwave',
            description: {
                content: 'Turns the vaporwave filter on or off.',
            },
            voiceRequirements: {
                isInVoiceChannel: true,
                isInSameVoiceChannel: true,
                isPlaying: true,
            },
            options: [
                {
                    name: 'on',
                    description: 'Turns on the vaporwave filter.',
                    type: 1,
                },
                {
                    name: 'off',
                    description: 'Turns off the vaporwave filter.',
                    type: 1,
                },
            ],
            slashCommand: true,
        });
    }
    async run(client, ctx, args) {
        const player = client.music.players.get(ctx.guild.id);
        const embed = new MessageEmbed();

        if ((ctx.isInteraction && ctx.interaction.options.data[0].name == 'off') || (args[0] && (args[0].toLowerCase() == 'reset' || args[0].toLowerCase() == 'off'))) {
            player.filter.setVaporwave(false);
            embed.setAuthor('Turned off vaporwave', ctx.author.displayAvatarURL());
        }
        else {
            player.filter.setVaporwave(true);
            embed.setAuthor('Turned on vaporwave', ctx.author.displayAvatarURL());
        }
        embed.setColor(client.config.colors.default);
        return ctx.sendMessage({ content: null, embeds: [embed] });
    }
};
