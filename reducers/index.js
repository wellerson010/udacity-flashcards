import { ADD_DECK, ADD_CARD } from '../utils/constants';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case ADD_CARD:
            const { deckId, card } = action;
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    cards: state[deckId].cards.concat(card)
                }
            }
        case ADD_DECK:
            const { deck } = action;

            return {
                ...state,
                [deck.id]: deck
            }
        default:
            return state;
    }
}