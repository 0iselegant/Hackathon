import { checkDate } from './meals.js';
import { datesInfo, DatesClass, meals, Meal, ingredientsList, Ingredients } from './variables.js';
import moment from 'moment'
import { createNewMeal } from './meals.js';

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

function addMeal(date, mealNames) {
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
        mealNames.forEach(mealName => {
            let existingMeal = meals.find(meal => meal.name === mealName);
            if (!existingMeal) {
                throw new Error(`Error: '${mealName} not found`);
            }
            existingDate.meals.push(existingMeal);
        });
    }
    return datesInfo;
}

// fake func
// get the ingredient from meals, and get its number of servings
// pass it into the servesToCalories function
// servesToCalories calls the nameToGams function to return no. of grams expected from the number of serves
function servesToCalories(name, servings) {
    return 2 * servings;
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
        let meal = meals.find(element => element.name === mealName.name);
        if (meal) {
            for (let i = 0; i < meal.ingredients.length; i++) {
                totalCal = totalCal + servesToCalories(meal.ingredients[i], meal.servings[i]);
            }

        }
    })
    return totalCal;
}

// testing
console.log(createDay('20/10/2022'));
console.log(createDay('20/10/2020'))
console.log(createDay('21/10/2020'))

const date = '20/10/2022'
const ingredients = ['chicken', 'pasta'];
const servings = [ 1, 2 ];
const date2 = '20/09/2022'
const ingredients2 = ['chicken', 'pasta'];
const servings2 = [ 1, 2 ];
try {
    const meal = createNewMeal(date, ingredients, 'lunch', servings);
    const meal2 = createNewMeal(date2, ingredients2, 'dinner', servings2);
    console.log("New Meal:", meal);
} catch (error) {
    console.error(error.message)
}

console.log(addMeal('20/10/2022', ['lunch']))
// console.log(addMeal('20/10/2022', ['dinner']))
// console.log("meals:")
// console.log(datesInfo);
// console.log(addMeal('21/10/2020', 'apple'))
// console.log(addMeal('20/10/2020', 'apple'))
console.log(totalCalories('20/10/2022'));
// try {
//     const dayInfo = createDay('20/10/2020', 'hi');
//     console.log("Day Info:", dayInfo);
//     console.log("Dates Info:", datesInfo);
// } catch (error) {
//     console.error(error.message);
// }