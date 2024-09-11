const readline = require('readline');

// Initialize the readline interface for command-line input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Define the suits and ranks for a deck of cards
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

// Player wallet to keep track of money
let playerWallet = 1000; // Initial amount of money for the player

function createDeck() {
    const deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ suit, rank });
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Calculate card value for Pok Deng
function getCardValue(card) {
    if (['Jack', 'Queen', 'King', '10'].includes(card.rank)) return 0; 
    if (card.rank === 'Ace') return 1;
    return parseInt(card.rank);
}

// Calculate hand value for a player or dealer
function calculateHandValue(hand) {
    const totalValue = hand.reduce((total, card) => total + getCardValue(card), 0);
    return totalValue % 10; // Pok Deng points are modulo 10
}

// Check for special hands (Pair, Flush)
function isPair(hand) {
    return hand[0].rank === hand[1].rank;
}

function isFlush(hand) {
    return hand[0].suit === hand[1].suit;
}

// Handle betting
function placeBet(betAmount) {
    if (betAmount > playerWallet) {
        console.log("You don't have enough money to place this bet!");
        return false;
    }
    playerWallet -= betAmount;
    return true;
}

// Adjust player's wallet after the game
function payout(won, betAmount, multiplier = 1) {
    if (won) {
        const winnings = betAmount * multiplier;
        playerWallet += winnings;
        console.log(`You won!!! Received ${winnings} chips`);
    } else {
        console.log(`You lost!!!`);
    }
}

function playPokDeng(betAmount) {
    // Check if the bet can be placed
    if (!placeBet(betAmount)) return;

    let deck = createDeck();
    deck = shuffleDeck(deck);

    // Draw two cards for player and dealer
    const playerHand = [deck.pop(), deck.pop()];
    const dealerHand = [deck.pop(), deck.pop()];

    console.log('You got:', playerHand);
    console.log('The dealer got:', dealerHand);

    // Calculate the hand values
    const playerPoints = calculateHandValue(playerHand);
    const dealerPoints = calculateHandValue(dealerHand);

    console.log(`Your Points: ${playerPoints}`);
    console.log(`Dealer Points: ${dealerPoints}`);

    // Check for special hands
    const playerHasPair = isPair(playerHand);
    const dealerHasPair = isPair(dealerHand);
    const playerHasFlush = isFlush(playerHand);
    const dealerHasFlush = isFlush(dealerHand);

    if (playerHasPair) console.log("You have a Pair!");
    if (playerHasFlush) console.log("You have a Flush!");
    if (dealerHasPair) console.log("Dealer has a Pair!");
    if (dealerHasFlush) console.log("Dealer has a Flush!");

    // Determine the winner and apply payouts
    let multiplier = 1; // Base payout multiplier
    let playerWins = false;

    // Special hand bonus multipliers
    if (playerHasPair) multiplier = 2;
    if (playerHasFlush) multiplier = 2;

    if (playerPoints > dealerPoints) {
        playerWins = true;
    } else if (playerPoints === dealerPoints) {
        console.log("It's a Tie! Bet is returned.");
        playerWallet += betAmount; // Return the bet in case of a tie
        return;
    }

    // Step 10.6: Payout based on result
    payout(playerWins, betAmount, multiplier);
}

// Step 11: Ask the player if they want to continue
function askToContinue() {
    rl.question('Wanna play more (Yes/No)? ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            askForBet(); // Ask for the next bet
        } else {
            console.log(`You got total ${playerWallet} chips`);
            rl.close(); // End the game and close the interface
        }
    });
}

// Ask for the player's bet input
function askForBet() {
    console.log(`You have ${playerWallet} chips.`);
    console.log('Please put your bet');
    rl.question('', (input) => {
        const betAmount = parseInt(input);

        // Validate the input
        if (isNaN(betAmount) || betAmount <= 0) {
            console.log("Invalid bet amount! Please enter a valid number.");
            askForBet();
        } else if (betAmount > playerWallet) {
            console.log("You don't have enough money to place this bet.");
            askForBet();
        } else {
            // Proceed with the game if the bet is valid
            playPokDeng(betAmount);
            askToContinue(); // Ask the player if they want to play another round
        }
    });
}

// Start the game by asking for the bet
askForBet();
