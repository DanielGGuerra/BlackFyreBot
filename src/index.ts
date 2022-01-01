import dotenv from 'dotenv'
dotenv.config()

import Discord, { Intents } from 'discord.js'
import { searchPlayerStaticChamp } from './components/commands/searchPlayerStaticChamp'

const start = async() => {
    const client = new Discord.Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES
        ]
    })

    client.on("ready", () => {
        console.log('Start bot!')
    })

    client.on("messageCreate", async msg => {
        const [ command, action, ...aggs] = msg.content.split(' ')

        if(command=='bot') {
            if(action == 'player-champ') {
                const result = await searchPlayerStaticChamp(aggs.join(' '))
                
                msg.channel.send({
                    content: result || 'Não encontrado',
                })
            }
        }
    })
    client.login(process.env.TOKEN_BOT)
}

start()
