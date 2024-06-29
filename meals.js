import moment from 'moment'

// MEALS

var meals = [
];

class Meal {
    constructor(id, date, ingredients) {
        this.id = id;
        this.date = date;
        this.ingredients = ingredients;
        this.name = `Meal ${id}` 
        // this.servings = servings;
    }
}





function generateId() {
    if (meals.length > 0) {
        return meals[meals.length - 1].id + 1;
    } else {
        return 1;
    }
}

function isValidDateFormat(date) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(date);
}

function createNewMeal(date, ingredients) {
    if (!isValidDateFormat(date)) {
        throw new Error('Error: date format is dd/mm/yyyy');
    }
    const dateFormatted = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const newMeal = new Meal(generateId(), dateFormatted, ingredients);
    meals.push(newMeal);
    return newMeal;
}

// pass in meals array
function sortMeals(meals) {
    let sortedMeals = meals.slice();
    for (let i = 0; i < sortedMeals.length - 1; i++) {
        for (let j = i + 1; j < sortedMeals.length; j++) {
            let date1 = new Date(sortedMeals[i].date);
            let date2 = new Date(sortedMeals[j].date);
            if (date1.getTime() > date2.getTime()) {
                let temp = sortedMeals[i];
                sortedMeals[i] = sortedMeals[j];
                sortedMeals[j] = temp;
            }
        }
    }

    return sortedMeals;
}


const date = '29/06/2024'
const date2 = '30/06/2024'
const invalidDate = '29/2222/22';
const ingredients = ['chicken', 'rice', 'broccoli'];
const ingredients2 = ['chicken', 'rice', 'hi'];

const meal2 = createNewMeal(date2, ingredients2);
const meal = createNewMeal(date, ingredients);


// DATES


function checkDate(date) {
    const error1 = "Error: date format is dd/mm/yyyy";
    const error2 = "Error: Invalid date";

    if (!isValidDateFormat(date)) {
        return error1;
    }

    const dateFormatted1 = moment(date, 'DD/MM/YYYY').format('MM/DD/YYYY');
    if (!Date.parse(dateFormatted1)) {
        return error2;
    }

    return true;
}

function createDay(date) {
    const validation = checkDate(date);
    if (validation !== true) {
        throw new Error(validation);
    }

    const dateFormatted2 = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    // console.log(dateFormatted);
    const newDate = new Date(dateFormatted2);

    let existingDate = datesInfo.find(info => info.date.getTime() === newDate.getTime());

    if (!existingDate) {
        const info = new DatesClass(newDate, []);
        datesInfo.push(info);
    }
    return datesInfo;
}

function addMeal(date, meals) {
    const validation = checkDate(date);
    if (validation !== true) {
        throw new Error(validation);
    }

    const dateFormatted2 = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const newDate = new Date(dateFormatted2);

    let existingDate = datesInfo.find(info => info.date.getTime() === newDate.getTime());

    if (!existingDate) {
        throw new Error('Error: Date not found');
    } else {
        existingDate.meals.push(meals);
    }
    return datesInfo;
}

function totalCalories(date) {
    const validation = checkDate(date);
    if (validation !== true) {
        throw new Error(validation);
    }
    const dateFormatted2 = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const newDate = new Date(dateFormatted2);

    let existingDate = datesInfo.find(info => info.date.getTime() === newDate.getTime());
    
    if (!existingDate) {
        throw new Error('Error: Date not found');
    }

    let totalCal = 0;
    existingDate.meals.forEach(mealName => {
        let meal = meals.find(element => element.name === mealName);
        if (meal) {
            meal.ingredients.forEach(ingredientName => {
                let ingredient = ingredientsList.find(element => element.name === ingredientName);
                if (ingredient) {
                    totalCal = totalCal + ingredient.totalCalories;
                    // // call the serves to calories function
                    // totalCal = totalCal + servesToCalories();
                }
            })
        }
    })
}

var datesInfo = [];

class DatesClass {
    constructor(date, meals) {
        this.date = date;
        this.meals = meals;
    }
}

createDay("27/06/2024")
addMeal("27/06/2024", meal)
addMeal("27/06/2024", meal2)
createDay("28/06/2024")
addMeal("28/06/2024", meal)
createDay("29/06/2024")
addMeal("29/06/2024", meal2)


// INGREDIENTS 


var ingredientsList = [];

class Ingredients {
    constructor(caloriespergram, totalcalories, name) {
        this.caloriespergram = caloriespergram;
        this.totalcalories = totalcalories;
        this.name = name;
    }
}

// testing
// console.log(createDay('20/10/2022'));
// console.log(createDay('20/10/2020'))
// console.log(createDay('21/10/2020'))
// console.log(addMeal('21/10/2020', 'apple'))
// console.log(addMeal('21/10/2020', 'apple'))
// console.log(addMeal('20/10/2020', 'apple'))

export default {"sortMeals": sortMeals, "createNewMeal": createNewMeal, "meals": meals, "Meal": Meal, "createDay": createDay, "addMeal": addMeal, "totalCalories": totalCalories, "datesInfo": datesInfo, "ingredientsList": ingredientsList} 