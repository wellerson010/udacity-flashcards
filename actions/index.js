import { ADD_DECK, ADD_CARD } from '../utils/constants';

export function addDeck(deck){
    return {
        type: ADD_DECK,
        deck
    }
}

export function addCard(card, deckId){
    return {
        type: ADD_CARD,
        card,
        deckId
    }
}