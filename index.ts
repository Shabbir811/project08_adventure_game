#! /usr/bin/env node
import inquirer from "inquirer";   // here we import inquirer moudule to get input from user ;
import { randomInt } from "crypto";  // crypto is module which generate random number ;

//game variables: 
let enemies:string[]=["skeleton","zombies","warrior","assassin"]; // this is a array which containing our game's enemies names ;
let max_enemy_health:number = 85;   //there we store maximum health of our game's enemy 85 health
let max_enemy_attack_demage:number = 25;  // maximum damage when enemy  attack to our player , it's health is decrease 25 ;

//player variables:
let health = 100;    //we store our player's health;
let max_attack_demage:number = 40;   //maximum damage when our player attack to the enemy , enemy's health is decrease ;
let number_health_potion:number = 3;   // this is like as lifes of our player. we give 3 chances to our player to increase health ;
let health_potion_heal_amount:number = 20;   //every chance to increase player health by 20 ;
let health_portion_drop_chance = 50;  //50 percent 
let choices = ["\t1. Attack","\t2. Drink a health potion","\t3. Run","\t4. exit"]  // this is a array which give choices to our player ;

let running:boolean = true;  // we declear a variable with initilzation boolean value true which we using in while loop;
console.log(`-`.repeat(60));  // this for formatting

console.log("---welcome to the shabbir's game---");  // this is intro of game;

Game:
while(running){
    console.log(`-`.repeat(60));  // this for formatting;

    let enemy:string = enemies[randomInt(enemies.length)]   // we select a random enemy from enemies array by using crypto module;
    let enemy_health:number = randomInt(max_enemy_health);  // we set enemy's health randomly;
    console.log(`\t# your enemy ${enemy} has apeared! #\n`);  // this print our enemy's name who fight with us;

    while(enemy_health > 0){                     // another loop which run until our enemies health is greater then zero;
        console.log(`\tyour health: ${health}`);              //print our player's health ;
        console.log(`\t${enemy}'s health: ${enemy_health}`);  // print enemy's health;
        
        console.log(`-`.repeat(60)); // for formating;
        // use inquirer get input from player;
        let ask = await inquirer.prompt([
            {
                name: "options",
                type: "list",
                message: "\n\t\twhat would you like to do\n",
                choices:  choices
            }
        ])
        let choice = ask.options  // save player's input in variable which we get from user;
        console.log(`=`.repeat(60));   // for formating;
        
        if(choices[0].includes(choice)){    // use if else conditions if player select option 1 attack (choices array's index zero match to user input  );
            let damage_dealt = randomInt(max_attack_demage); //player damage to the enemy's health using random number b/w  max_attack_demage(40);
            let damage_taken = randomInt(max_enemy_attack_demage); //enemy damage to the player using random number b/w  max_attack_demage(25);

            health -= damage_taken;   // subtract damage from player's health;
            enemy_health -= damage_dealt;  // subtract damage from enemy's health;
            console.log(`\t> you strike the ${enemy}, for ${damage_dealt} damage`); //print enemy name and health demage;
            console.log(`\t> you receive ${damage_taken} in retalition!`);   //print player's health demage;

            if(health<1){  // use if statement (player's health less then one );
                console.log(`\t> you have taken too much damage, you are too weak to go on!`);  //print msg to the player;
                break;  // and break the 2nd loop
            }
            
        }else if(choices[1].includes(choice)){  // if choose 2nd option ;
            if(number_health_potion>0){     // if increasing chance of health which we given , is greater then zero ;
                health += health_potion_heal_amount;   // health potion add to the player's health;
            number_health_potion--;    // and subtract one chance of increasing health;
            console.log(`\t> you drink a health potion, healing for yourself ${health_potion_heal_amount} \n\t>now your health ${health}`); //print msg to the player ;
            
            console.log(`\t> you have now only ${number_health_potion} health potion is left\n`);  // print left chances of increasing health;
         
            }else{  // or else  zero chance of increasing health;
                console.log(`\t\t\t\t you have no health potion left! Deafeat enemies for chance to get one`);  // print  msg ;
                
            }   
        }else if(choices[2].includes(choice)){   // if player choose 3rd option ;
           console.log(`you run away from the ${enemy} enemy!\n`);  //print enemy name you run from ;
           continue Game; // and game continue
            
        }else if(choices[3].includes(choice)){  // if player choose 4th option ;
            console.log(`you exit the shabbir's_game`); //print msg;
            break; // exit from 2nd loop
        }
        
    }
    if(health < 1){  // if player's health is less then one
        console.log(`you limp out of the the shabbir's_game, weak for battle`); //print msg player is lose
        break;  // end the 2nd loop
        
    }  // there 2nd while loop over;

    console.log(`-`.repeat(40)); // for formating;
    console.log(`# ${enemy} was defeated #`);   // 2nd loop is end it's means enemy's health is zero that why print msg: enemy is defeated;
    console.log(`you have ${health} health left`);  // print remaining health of player;
    
    if(randomInt(0,100)< health_portion_drop_chance){ //  if random number is less then health_portion_drop_chance;
        number_health_potion++;             //there we get a increasing health chance
        console.log(`# the ${enemy} dropped a health potion! #`);  // print msg with enemy's name
        console.log(`# you have ${number_health_potion} helth potion`); //print left chances of increasing player's health
        
    }
    console.log(`-`.repeat(40)); // for formating
    let ask = await inquirer.prompt([     // get another input from player
        {
            name:"options",
            type:"list",
            message:"what would you like to do now ",
            choices:["1. contiune fighting", "2. exit shabbir's_game"]   // give two choice
        }
    ])

    if(ask.options == "1. contiune fighting"){  // if player select option 1 ,  run program from 1st while loop because we won't break 1st loop by now 
        console.log(`you continue on your adventure!`); //print msg 
        
    }else if(ask.options == "2. exit shabbir's_game"){  //if player select option 2 ,  we break first loop
        console.log(`you exit the shabbir's_game`);  //print msg exiting
        break;  // break 1st loop
    }
    
     
} // there first while loop is ended
//
//for formating only
console.log(`#`.repeat(30));
console.log(`# thank you for playing #`);
console.log(`#`.repeat(30));

