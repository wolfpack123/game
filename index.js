#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Who Wants To Be Kritiative? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's the answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    },
  });

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} \n Wow! You're a Genius`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');

    console.log(
      chalk.green(
        `You win!`
      )
    );
    process.exit(0);
  });
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'What is my favourite drink\n',
    choices: [
      'Whiskey',
      'Rum',
      'Brandy',
      'Wine',
    ],
  });

  return handleAnswer(answers.question_1 === 'Whiskey');
}

async function question2() {
  const answers = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message: 'Favourite cigarette\n',
    choices: ['Advance', 'Insignia', 'Davidoff', 'Dunhill'],
  });
  return handleAnswer(answers.question_2 === "Insignia");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: 'question_3',
    type: 'list',
    message: `place Gilli like to visit the most\n`,
    choices: ['isolation', 'city', 'hill', 'beach'],
  });

  return handleAnswer(answers.question_3 === 'hill');
}

async function question4() {
  const answers = await inquirer.prompt({
    name: 'question_4',
    type: 'list',
    message: 'Which of the following is NOT a primitive type?\n',
    choices: [
      'boolean',
      'number',
      'null',
      'object', // Correct
    ],
  });
  return handleAnswer(answers.question_4 === 'object');
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
winner();