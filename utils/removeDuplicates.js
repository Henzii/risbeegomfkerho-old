"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDuplicates = void 0;
const removeDuplicates = (games, oldGames) => {
    // Hashmappi vanhoista peleistä
    const dateMap = oldGames.reduce((p, c) => {
        p.set(c.course.name + c.course.date, true);
        return p;
    }, new Map());
    const filteredGames = games.filter(g => {
        return dateMap.get(g.course.name + g.course.date) !== true;
    });
    return filteredGames;
};
exports.removeDuplicates = removeDuplicates;
