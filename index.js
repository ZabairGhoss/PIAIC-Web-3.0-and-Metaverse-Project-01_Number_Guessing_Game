#!usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import figlet from 'figlet';
async function sleep() {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
}
async function WelCome() {
    figlet(`${('Number Guessing Game!')}`, function (err, data) {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(data);
    });
}
async function DevIntro() {
    const devTitle = chalkAnimation.glitch('Developed by Zabair Ghoss!');
    await sleep();
    devTitle.stop();
}
await WelCome();
await DevIntro();
function RandomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
async function PlayGame() {
    const targetNumber = RandomNumberGenerator(1, 100);
    let attempts = 0;
    while (true) {
        const answer = await inquirer
            .prompt({
            type: 'number',
            name: 'guess',
            message: 'guess the number between (1 - 100):',
            validate: (input) => {
                if (isNaN(input) || input < 1 || input > 100) {
                    return 'please enter a valid number between (1 - 100)!!!';
                }
                return true;
            },
        });
        const guess = answer.guess;
        attempts++;
        if (guess === targetNumber) {
            console.log((chalk.bgBlue(`Congratulations! you guessed the number in ${attempts} attempts.`)));
            await PlayAgain();
        }
        else if (guess < targetNumber) {
            console.log(chalk.bgRed(`Too Low, Try Again!`));
        }
        else {
            console.log(chalk.bgYellow(`Too High, Try Again!`));
        }
    }
}
async function PlayAgain() {
    const playAgainAnswer = await inquirer.prompt([
        {
            type: 'list',
            name: 'playAgain',
            message: 'Do you want to play again?',
            choices: ['Yes', 'No'],
        },
    ]);
    if (playAgainAnswer.playAgain === 'Yes' || playAgainAnswer.playAgain === 'YES' || playAgainAnswer.playAgain === 'yes') {
        await PlayGame();
    }
    else {
        process.exit();
    }
}
await PlayGame();
await PlayAgain();
