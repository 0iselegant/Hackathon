import { Meal, meals } from './variables.js'
import moment from 'moment'

function generateId() {
    if (meals.length > 0) {
        return meals[meals.length - 1].id + 1;
    } else {
        return 1;
    }
}

export function isValidDateFormat(date) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(date);
}

export function checkDate(date) {
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


export function createNewMeal(date, ingredients, name, servings) {
    // if (!isValidDateFormat(date)) {
    //     throw new Error('Error: date format is dd/mm/yyyy');
    // }
    // const dateFormatted1 = moment(date, 'DD/MM/YYYY').format('MM/DD/YYYY');
    // if (!Date.parse(dateFormatted1)) {
    //     throw new Error('Error: Invalid date');
    // }
    const validation = checkDate(date);
    if (validation !== true) {
        throw new Error(validation);
    }
    
    if (ingredients.some(ingredient => typeof ingredient !== 'string' || /\d/.test(ingredient))) {
        throw new Error('Error: Each ingredient must be a string without numeric characters');
    }
    
    if (ingredients.length !== servings.length) {
        throw new Error('Error: Number of servings must match number of ingredients');
    }
    // let dateFormatted = new Date(`${date}`)
    const dateFormatted2 = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const newMeal = new Meal(generateId(), dateFormatted2, ingredients, name, servings);
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
// const date = '29/06/2024'
// const date2 = '30/06/2024'
// const invalidDate = '29/02/2022';
// const invalidDate2 = '29/02/2022';
// const ingredients = ['chicken'];
// const ingredients2 = ['chicken', 'rice', 'hi'];
// const servings = [ 1 ];
// const servings2 = [2, 2, 1];

// try {
//     const meal = createNewMeal(date2, ingredients, 'lunch', servings);
//     console.log("New Meal:", meal);
// } catch (error) {
//     console.error(error.message)
// }
// const meal2 = createNewMeal(date, ingredients2, 'dinner', servings2);
// console.log("New Meal:", meal2);
// console.log("Meals:", meals);
// console.log(sortMeals(meals));
