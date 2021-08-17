export interface Peli {
    course: GamesCourse,
    players: Array<Player>,
    match: boolean,
    fromUser?: string
}
export interface Course {
    name: string,
    layout: string,
}
export interface GamesCourse extends Course{
    par: string,
    date: string
}
export interface Player {
    name: string,
    total: number,
    plusminus: number,
    score: Array<string>,
    HC: number,
    totalHC: number,
    rank?: number,
    rankHC?: number
}
export interface PlayerHC {
    name: string,
    games: number,
    hc: number,
    runningHc: number
}
export interface Credentials {
    username: string,
    password: string,
}
export interface hcTable {
    course: Course,
    players: Array<PlayerHC>
}
export interface JSONdata {
    games: Array<Peli>,
    hc: Array<hcTable>
}