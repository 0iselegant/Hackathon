import { Meal, meals } from './variables.js'
import moment from 'moment'

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
    // let dateFormatted = new Date(`${date}`)
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

// testing
const date = '29/06/2024'
const date2 = '30/06/2024'
const invalidDate = '29/2222/22';
const ingredients = ['chicken', 'rice', 'broccoli'];
const ingredients2 = ['chicken', 'rice', 'hi'];

try {
    const meal = createNewMeal(date2, ingredients);
    console.log("New Meal:", meal);
} catch (error) {
    console.error(error.message)
}
const meal2 = createNewMeal(date, ingredients2);
console.log("New Meal:", meal2);
console.log("Meals:", meals); // Output all meals for verification
console.log(sortMeals(meals));
