const {
    rl,
    createDeck,
    shuffleDeck,
    getCardValue,
    calculateHandValue,
    isPair,
    isFlush,
    placeBet,
    payout,
    setPlayerWallet,
    getPlayerWallet
} = require('../index');

afterAll(() => {
    rl.close();
});

test('createDeck generates a deck of 52 cards', () => {
    const deck = createDeck();
    expect(deck.length).toBe(52);
    expect(deck[0]).toHaveProperty('suit');
    expect(deck[0]).toHaveProperty('rank');
});

test('shuffleDeck shuffles the deck', () => {
    const deck = createDeck();
    const shuffledDeck = shuffleDeck([...deck]); // Copy the deck to keep the original intact
    console.log('Original Deck:', deck);
    console.log('Shuffled Deck:', shuffledDeck);
    expect(shuffledDeck).not.toEqual(deck);
});

test('getCardValue returns correct values', () => {
    expect(getCardValue({ suit: 'Hearts', rank: 'Ace' })).toBe(1);
    expect(getCardValue({ suit: 'Hearts', rank: '5' })).toBe(5);
    expect(getCardValue({ suit: 'Hearts', rank: 'King' })).toBe(0);
});

test('calculateHandValue calculates hand value correctly', () => {
    const hand = [
        { suit: 'Hearts', rank: '5' },
        { suit: 'Clubs', rank: '3' }
    ];
    expect(calculateHandValue(hand)).toBe(8);
});

test('isPair detects pairs correctly', () => {
    const pairHand = [
        { suit: 'Hearts', rank: '5' },
        { suit: 'Clubs', rank: '5' }
    ];
    const nonPairHand = [
        { suit: 'Hearts', rank: '5' },
        { suit: 'Clubs', rank: '3' }
    ];
    expect(isPair(pairHand)).toBe(true);
    expect(isPair(nonPairHand)).toBe(false);
});

test('isFlush detects flushes correctly', () => {
    const flushHand = [
        { suit: 'Hearts', rank: '5' },
        { suit: 'Hearts', rank: '3' }
    ];
    const nonFlushHand = [
        { suit: 'Hearts', rank: '5' },
        { suit: 'Clubs', rank: '3' }
    ];
    expect(isFlush(flushHand)).toBe(true);
    expect(isFlush(nonFlushHand)).toBe(false);
});

test('placeBet correctly updates playerWallet', () => {
    setPlayerWallet(100); // Reset wallet amount before test
    expect(placeBet(20)).toBe(true);
    expect(getPlayerWallet()).toBe(80);
    expect(placeBet(100)).toBe(false);
});

test('payout correctly updates playerWallet', () => {
    setPlayerWallet(100); // Reset wallet amount before test
    payout(true, 20, 2); // Win with multiplier 2
    expect(getPlayerWallet()).toBe(140);
    payout(false, 20); // Loss
    expect(getPlayerWallet()).toBe(120);
});
