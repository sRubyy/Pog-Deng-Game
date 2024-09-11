# Pok Deng Game

## Overview

Pok Deng is a simple command-line card game where you compete against a dealer. The game involves betting, drawing cards, and determining the winner based on card values and special hands.

## Features

- **Card Drawing**: Draw two cards each for the player and the dealer.
- **Betting System**: Place bets and win or lose chips based on the game outcome.
- **Card Values**: Aces are worth 1 point, cards 2 to 9 have their face values, and Kings, Queens, Jacks, and 10s are worth 0 points.
- **Special Hands**: Check for pairs and flushes.
- **Game Continuation**: Choose to play more rounds or stop and view your total chips.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/sRubyy/Pok-Deng-Game.git
    ```

2. **Navigate to the Project Directory**:
    ```bash
    cd Pok-Deng-Game
    ```

3. **Install Dependencies**:
    ```bash
    npm install
    ```

### Running the Game

1. **Add the Start Script**:
    Edit the `package.json` file to include the following in the `"scripts"` section:
    ```json
    "scripts": {
      "start": "node index.js"
    }
    ```

2. **Start the Game**:
    ```bash
    npm start
    ```

3. **Follow the Prompts**:
    - Enter your bet when prompted.
    - The game will display your hand, the dealer's hand, and the result of the round.
    - Decide whether to play more or stop.
    - Your total chips will be displayed at the end.

## Game Rules
- **Player**:
  - Start with 1000 chips

- **Card Values**:
  - Ace: 1 point
  - Numbers 2 to 9: Face values
  - King, Queen, Jack, and 10: 0 points

- **Winning**:
  - The hand with the highest value wins.
  - Payouts are based on the bet amount and special hand multipliers.

## Testing

To run the tests, ensure you have Jest installed and then use the following command:

```bash
npm test