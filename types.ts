export interface Peli {
    _id: string,
    course: Course,
    date?: Date,
    players: Array<Player>,
    match?: boolean,
    fromUser?: string
}
export interface Course {
    name: string,
    layout: string,
    par?: number,
}
export interface Player {
    name: string,
    total: number,
    plusminus: number,
    score: Array<string>,
    totalHC?: number,
    HC?: number,
    rank?: number,
    rankHC?: number
}
export interface Credentials {
    username: string,
    password: string,
}
export interface PlayerHC {
    name: string,
    games: number,
    lastRounds: Array<number>,
    hc: number,
    median: number,
    average: number,

}
export interface hcTable {
    course: Course,
    players: Array<PlayerHC>
}
