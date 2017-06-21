(function(){

    /*
    * Interfaces
    */

    //interface describing what attributes and methods a traveler should have
    interface ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;

        //when implemented, There should be 50% chance to increase the traveler's food by 100.
        //return the travelers new food value
        hunt(): number;

        //when implemented, we should check to see if the traveler has a food supply of 20
        //If they do then we should consume 20 of the available food supply
        //If they don't have 20 food then we should change isHealthy to false
        //return the travelers health after attempting to eat
        eat(): boolean;
    }

    //interface describing what the passenger array should look like
    interface IPassengerArray {
        [index:number]:Traveler
    }

    // food(wagon)
    // Return the total amount of food among all occupants of the wagon.

    //interface describing attributes and methods a wagon should have
    interface IWagon{
        capacity: number;
        passengerArray: IPassengerArray;

        // when implemented, we should add the traveler to the wagon if the capacity permits
        // this function should return the string "added" on success and "sorry" on failure
        addPassenger(traveler: Traveler): string;

        //this should return true if there is at least one unhealthy person in the wagon
        //if everyone is healthy false should be returned
        isQuarantined(): boolean;

        //Return the total amount of food among all passengers of the wagon.
        getFood(): number;

    }

    /*
    * Classes
    */

    //The traveler class that implements the ITraveler interface
    //This is currently in violation of its contract with the interface. 
    //Create the code required to satisfy the contract with the interface
    class Traveler implements ITraveler {
        food: number;
        name: string;
        isHealthy: boolean;

        constructor(food:number, name:string, isHealthy: boolean){
            this.food = food;
            this.name = name;
            this.isHealthy = isHealthy;
        }

        hunt(){
            if (getRandomNumber(1,10) > 5) {
                // console.log('\n\r Successful Hunt \n');
                this.food = this.food + 100;
            } else {
                // console.log('\n\r Failed Hunt \n');
            }
            return this.food;
        }

        eat() {
            if (this.food >= 20) {
                this.food = this.food - 20;
                return this.isHealthy = true;
            } else {
                return this.isHealthy = false;
            }
        }

    }

    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface 
    class Wagon implements IWagon {
        capacity: number;
        passengerArray = [];

        constructor(capacity: number){
            this.capacity = capacity;
        }

        // when implemented, we should add the traveler to the wagon if the capacity permits
        // this function should return the string "added" on success and "sorry" on failure
        addPassenger(traveler: Traveler){
            let result;

            // console.log(this.passengerArray.length);
                
            if (this.passengerArray.length < this.capacity) {
                
                if (getRandomNumber(1,10) > 5) {

                    this.passengerArray.push(traveler);
                    return "Added to the wagon!";

                } else {

                    return "Not added to the wagon!";

                }
            }

            return "Maximum capacity reached!"
        }

        isQuarantined() {
            for (var i = 0; i < this.passengerArray.length; i++) {

                if (!this.passengerArray[i].isHealthy){
                    return false;
                }
            }
            return true;
        }

        getFood(){
            let totalFood = 0;

            for (var i = 0; i < this.passengerArray.length; i++) {
                totalFood = this.passengerArray[i].food + totalFood;
            }

            return totalFood;
        }


    }

    /*
    * Play the game
    *
    * DONE - Create 5 healthy travelers object with a random amount of food between 0 and 100 (inclusive)
    *
    * DONE - Create wagon with an empty passenger list and a capacity of 4.
    *
    * DONE - Make 3 of 5 the travelers eat by calling their eat methods
    *
    * DONE - Make the remaining 2 travelers hunt
    *
    * DONE - Create an array of your travelers, loop over the array of travelers and give each traveler a 50% chance
    * of attempting to be being added to the wagon using the wagons addPassenger method.
    *
    * DONE - Run the isQuarantined method for the wagon
    *
    * DONE - Run the getFood method for the wagon
    *
    * the return values of all the methods should be displayed in the console using console.log()
    * the console.log statements should not live inside any methods on the objects 
    *
    */

    function getRandomNumber(min, max){

        return Math.floor(Math.random() * (max - min + 1) + min);

    }
    // console.log('\n');
    
    // Let's create our 5 travelers!
    let traveler1 = new Traveler (getRandomNumber(0, 100), "Clark Kent", true);
    let traveler2 = new Traveler (getRandomNumber(0, 100), "Bruce Wayne", true);
    let traveler3 = new Traveler (getRandomNumber(0, 100), "Diana Price", true);
    let traveler4 = new Traveler (getRandomNumber(0, 100), "Barry Allen", true);
    let traveler5 = new Traveler (getRandomNumber(0, 100), "Hal Jordan", true);

    // Let's create our traveler array!
    let travelerArray = [traveler1, traveler2, traveler3, traveler4, traveler5];

    // Let's create our wagon!
    let wagon1 = new Wagon (4);        

    // Try and add the passengers from the array
    for (var i = 0; i < travelerArray.length; i++) {
        console.log(`${travelerArray[i].name} is attempting to join the wagon: ${wagon1.addPassenger(travelerArray[i])}`);
    }

    // Let three travelers eat!
    for (var i = 0; i < 3; i++) {
        console.log(`${travelerArray[i].name} is eating. Are they still healthy? ${travelerArray[i].eat()}`);
    }

    // Let two travelers hunt!
    for (var i = 3; i < 5; i++) {
        console.log(`${travelerArray[i].name} started with ${travelerArray[i].food} total food and is now hunting. New food total: ${travelerArray[i].hunt()}`);
    }

    // Check the health status of the wagon
    if (!wagon1.isQuarantined()){
        console.log('Your wagon is quarantined!');  
    };
    
    // Show total food!
    console.log(`The total food for the wagon is: ${wagon1.getFood()}!`);

})();