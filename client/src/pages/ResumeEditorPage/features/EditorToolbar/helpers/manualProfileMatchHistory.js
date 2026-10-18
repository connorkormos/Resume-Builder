// Offer row actions only when the next history step changes this particular match.
export function getManualProfileMatchStatus(history, sessionId, profileFieldId) {
    const getMatch = (snapshot) => snapshot?.manualProfileMatches?.[sessionId]?.[profileFieldId];
    const current = getMatch(history.present);
    const previous = getMatch(history.past.at(-1));
    const next = getMatch(history.future[0]);

    return {
        isMatched: Boolean(current),
        canUndo: Boolean(current && history.past.length > 0 && previous?.matchId !== current.matchId),
        canRedo: Boolean(next && next.matchId !== current?.matchId),
    };
}
