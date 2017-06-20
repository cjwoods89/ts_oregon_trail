(function () {
    /*
    * Interfaces
    */
    /*
    * Classes
    */
    //The traveler class that implements the ITraveler interface
    //This is currently in violation of its contract with the interface. 
    //Create the code required to satisfy the contract with the interface
    var Traveler = (function () {
        function Traveler(food, name, isHealthy) {
            this.food = food;
            this.name = name;
            this.isHealthy = isHealthy;
        }
        Traveler.prototype.hunt = function () {
            if (getRandomNumber(1, 10) > 5) {
                // console.log('\n\r Successful Hunt \n');
                this.food = this.food + 100;
            }
            else {
                // console.log('\n\r Failed Hunt \n');
            }
            return this.food;
        };
        Traveler.prototype.eat = function () {
            if (this.food >= 20) {
                this.food = this.food - 20;
                return this.isHealthy = true;
            }
            else {
                return this.isHealthy = false;
            }
        };
        return Traveler;
    }());
    //The wagon class that implements the IWagon interface
    //This is currently in violation of its contract with the interface.
    //Create the code required to satisfy the contract with the interface 
    var Wagon = (function () {
        function Wagon(capacity) {
            this.passengerArray = [];
            this.capacity = capacity;
        }
        // when implemented, we should add the traveler to the wagon if the capacity permits
        // this function should return the string "added" on success and "sorry" on failure
        Wagon.prototype.addPassenger = function (traveler) {
            var result;
            // console.log(this.passengerArray.length);
            if (this.passengerArray.length < this.capacity) {
                if (getRandomNumber(1, 10) > 5) {
                    this.passengerArray.push(traveler);
                    return "Added to the wagon!";
                }
                else {
                    return "Not added to the wagon!";
                }
            }
        };
        Wagon.prototype.isQuarantined = function () {
            for (var i = 0; i < this.passengerArray.length; i++) {
                if (!this.passengerArray[i].isHealthy) {
                    return false;
                }
            }
            return true;
        };
        Wagon.prototype.getFood = function () {
            var totalFood = 0;
            for (var i = 0; i < this.passengerArray.length; i++) {
                totalFood = this.passengerArray[i].food + totalFood;
            }
            return totalFood;
        };
        return Wagon;
    }());
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
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    // console.log('\n');
    // Let's create our 5 travelers!
    var traveler1 = new Traveler(getRandomNumber(0, 100), "Clark Kent", true);
    var traveler2 = new Traveler(getRandomNumber(0, 100), "Bruce Wayne", true);
    var traveler3 = new Traveler(getRandomNumber(0, 100), "Diana Price", true);
    var traveler4 = new Traveler(getRandomNumber(0, 100), "Barry Allen", true);
    var traveler5 = new Traveler(getRandomNumber(0, 100), "Hal Jordan", true);
    // Let's create our traveler array!
    var travelerArray = [traveler1, traveler2, traveler3, traveler4, traveler5];
    // Let's create our wagon!
    var wagon1 = new Wagon(4);
    // Try and add the passengers from the array
    for (var i = 0; i < travelerArray.length; i++) {
        console.log(travelerArray[i].name + " is attempting to join the wagon: " + wagon1.addPassenger(travelerArray[i]));
    }
    // Let three travelers eat!
    for (var i = 0; i < 3; i++) {
        console.log(travelerArray[i].name + " is eating. Are they still healthy? " + travelerArray[i].eat());
    }
    // Let two travelers hunt!
    // traveler4.hunt();
    // traveler5.hunt();
    for (var i = 3; i < 5; i++) {
        console.log(travelerArray[i].name + " started with " + travelerArray[i].food + " and is now hunting. New food total: " + travelerArray[i].hunt());
    }
    // // Let three travelers eat!
    // traveler1.eat();
    // if (!traveler1.isHealthy) {
    //     console.log(`${traveler1.name} got sick`);
    // }
    // traveler2.eat();
    // if (!traveler2.isHealthy) {
    //     console.log(`${traveler2.name} got sick`);
    // }
    // traveler3.eat();
    // if (!traveler3.isHealthy) {
    //     console.log(`${traveler3.name} got sick`);
    // }
    // // Let two travelers hunt!
    // traveler4.hunt();
    // traveler5.hunt();
    // Check the health status of the wagon
    if (!wagon1.isQuarantined()) {
        console.log('Your wagon is quarantined!');
    }
    ;
    console.log("The total food for the wagon is: " + wagon1.getFood() + "!");
})();
