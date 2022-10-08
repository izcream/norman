declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly BOT_TOKEN: string
    readonly BOT_ID: string
    readonly GUILD_ID: string
    readonly SERVER_ID: string
    readonly CHANNEL_ID: string
    readonly COMMAND: string
    readonly COMMAND_DESC: string
  }
}
