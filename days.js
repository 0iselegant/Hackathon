import { checkDate } from './meals.js';
import { datesInfo, DatesClass, meals, Meal, ingredientsList, Ingredients } from './variables.js';
import moment from 'moment'

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

// testing
console.log(createDay('20/10/2022'));
console.log(createDay('20/10/2020'))
console.log(createDay('21/10/2020'))
console.log(addMeal('21/10/2020', 'apple'))
console.log(addMeal('21/10/2020', 'apple'))
console.log(addMeal('20/10/2020', 'apple'))
// try {
//     const dayInfo = createDay('20/10/2020', 'hi');
//     console.log("Day Info:", dayInfo);
//     console.log("Dates Info:", datesInfo);
// } catch (error) {
//     console.error(error.message);
// }