# Function Frontend

Starter Next/Hardhat Project

## Description

This project serves as a starting point for utilizing Next.js with Hardhat for Ethereum development. It integrates frontend and smart contract functionalities.
# Functionalities
Functions:

## getBalance(): A view function allowing anyone to check the contract's current balance.

## deposit(uint256 _amount): Allows the owner to deposit additional funds into the contract. It increases the contract's balance by the provided _amount.

## withdraw(uint256 _withdrawAmount): Permits the owner to withdraw funds from the contract. It checks if the requested withdrawal amount is available and reverts if the balance is insufficient.

## burnAllCoins(uint256 n): Allows the owner to burn the entire balance. However, the current implementation includes an issue - the while loop checking for balance greater than zero could potentially result in an infinite loop, as the balance is set to zero before the loop. The loop condition should likely check for balance > n instead.
## Getting Started

### Installing

- Clone the GitHub repository to your local machine.
- Ensure you have Node.js installed. If not, download and install it.

### Executing program

1. Inside the project directory, in the terminal, run:
    ```
    npm i
    ```
2. Open two additional terminals in your VS code (or use two terminals of cmd), and run both as administrator to avoid technical issues.
3. In the second terminal, type:
    ```
    npx hardhat node
    ```
4. In the third terminal, type:
    ```
    npx hardhat run --network localhost scripts/deploy.js
    ```
5. Back in the first terminal, launch the front-end:
    ```
    npm run dev
    ```

## Help

For common problems or issues, refer to the documentation or run:

## Author/s

Contributor/s: Sally Segundo [@Hoshiyom1](https://github.com/Hoshiyom1)
