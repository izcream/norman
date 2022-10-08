import axios, { AxiosResponse } from 'axios'
import {
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} from 'discord.js'
import { config } from 'dotenv'

import { BattleMetricResponse } from './interface'

config()
const command = new SlashCommandBuilder()
  .setName(process.env.COMMAND)
  .setDescription(process.env.COMMAND_DESC)
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN)
rest
  .put(Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID), {
    body: [command]
  })
  .catch(console.error)
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.once('ready', () => console.log('🚀 NORMAN READY TO WORK!!'))
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return
  const { commandName } = interaction

  if (commandName === process.env.COMMAND) {
    const { data } = await getServerStatus(process.env.SERVER_ID)
    const embed = buildEmbeded(data.data.attributes)
    await interaction.reply({ embeds: [embed] })
  }
})

client.login(process.env.BOT_TOKEN)

function getServerStatus(serverID: string): Promise<AxiosResponse<{ data: BattleMetricResponse }>> {
  return axios.get(`https://api.battlemetrics.com/servers/${serverID}`)
}

function buildEmbeded(data: BattleMetricResponse['attributes']): EmbedBuilder {
  const status = data.status === 'online' ? ':green_circle: ออนไลน์' : ':red_circle: ออฟไลน์'
  return new EmbedBuilder()
    .setColor(data.status === 'online' ? 'Green' : 'Red')
    .setTitle(data.name)
    .addFields(
      { name: 'สถานะ', value: status, inline: true },
      { name: 'จำนวนผู้เล่น', value: `${data.players}/${data.maxPlayers}`, inline: true }
    )
}
