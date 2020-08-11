//Object Destructuring

/*const person = {
    name: 'Ankit',
    age: 24,
    location: {
        city: 'Moga',
        temp: 42
    }
}

console.log(`${person.name} is ${person.age} years old`);

//destructuring syntax
const { name= 'default name',age : AgeInYears = 0 } = person;

console.log(`${name} is ${AgeInYears} years old`);

//the names have to be same 
const { city, temp } = person.location;
//or we can assign a new var name 
const { city:locationCity, temp:temperature } = person.location;

if(city&&temp){
    console.log(`It's ${temp} degrees C in ${city} right now`);
}

if(locationCity&&temperature){
    console.log(`It's ${temperature} degrees C in ${locationCity} right now`);
}


//Practise
const Book = {
    name: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
}

const { name: publisherName = 'Self-Published' } = Book.publisher;

console.log(publisherName);
*/


//Array Destructuring
// Uses [] instead of {} to destructure
// also matches by position instead of matching by name
// no variable renaming concept here because the names are arbitrary
const addresses = ["Rajindera Estate", "Moga", "Punjab", 142001];
const [ , city, state] = addresses;
console.log(`you are in ${city}, ${state}`);

const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];
const [itemName, , mediumPrice, large] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);