export interface BattleMetricResponse {
  type: string
  id: string
  attributes: Attribute
  relationships: Relationship
}

export interface Attribute {
  id: string
  name: string
  address: null
  ip: string
  port: number
  players: number
  maxPlayers: number
  rank: number
  location: number[]
  status: string
  details: Detail
  private: boolean
  createdAt: string
  updatedAt: string
  portQuery: number
  country: string
  queryStatus: string
}

export interface Detail {
  version: string
  time: string
}

export interface Relationship {
  game: Game
}

export interface Game {
  data: Data
}

export interface Data {
  type: string
  id: string
}
