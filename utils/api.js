import { AsyncStorage } from 'react-native';
import { STORAGE_MAIN_DATA } from './constants';
import { generateId } from './helper';


export async function getDecks(){
    const data = await AsyncStorage.getItem(STORAGE_MAIN_DATA);

    return (data) ? JSON.parse(data):{};
}

export async function saveCard({question, answer, deckId}){
    const decks = await getDecks();

    const id = generateId();
    const time = new Date().getTime();
    const card = {
        id,
        answer,
        question,
        createdAt: time
    };

    decks[deckId].cards.push(card);

    await saveDeckToStorage(decks);

    return card;
}

export async function saveDeck(title){
    const decks = await getDecks();

    const id = generateId();
    const time = new Date().getTime();
    const deck = {
        id,
        title,
        createdAt: time,
        cards: []
    };

    decks[id] = deck;

    await saveDeckToStorage(decks);

    return deck;
}

async function saveDeckToStorage(decks){
    await AsyncStorage.setItem(STORAGE_MAIN_DATA, JSON.stringify(decks));
}