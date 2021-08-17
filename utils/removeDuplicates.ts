import { Peli } from "../types";

export const removeDuplicates = (games: Array<Peli>, oldGames: Array<Peli>): Array<Peli>=> {
    
    // Hashmappi vanhoista peleistä
    const dateMap = oldGames.reduce((p, c) => {
        p.set( c.course.name+c.course.date, true);
        return p;
    }, new Map());

    const filteredGames = games.filter(g => {
        return dateMap.get(g.course.name+g.course.date) !== true;
    });
    return filteredGames;

};