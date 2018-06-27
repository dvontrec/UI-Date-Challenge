'use strict'

const monthSelect = $('#months');
const yearSelect = $('#year');
const daySelect = $('#days');

const majorSelects = [monthSelect, yearSelect];
// Creates an array of months
const months = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];

let numDays = getMaxDays(monthSelect.val(),yearSelect.val());
let days = [];
getDays()

// Adds a day up till the maximum number of days
function getDays()
{
	days.splice(0,days.length);
	for(let i = 1; i <= numDays; i++)
	{
		days.push(i);
	}
}

//adds the days to day select
days.forEach((day) =>
{	
	addOptions(daySelect, day, day);
})
// Loops through each month and adds it as an option 
months.forEach( (month, i) => 
{

	// Calls the addOptions function to add months to the month selector
	addOptions(monthSelect, month, i+1);	
})


// Calls the getMax Days value whenever the month or year select is changed
majorSelects.forEach(select => 
{
	select.change( e =>
	{
		console.log(days.length)
		getDays();
		console.log(days.length)
		// Removes all options 
		daySelect.find('option')
			.remove()
			.end();
		// Adds options back
		days.forEach((day) =>
		{	
			addOptions(daySelect, day, day);
		})
	})
});

//adds the corrisponding month to each option 
function addOptions(select, option, index)
{
	select.append(
		$('<option>')
			//sets the value to the month number
			.val(index)
			.text(option));
}

// Function to find the maximum number of days in a month
function getMaxDays(month, year)
{
	// returns the maximum number of days given the year and the month
	return new Date(year, month, 0).getDate();
}
