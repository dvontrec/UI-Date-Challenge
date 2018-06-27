'use strict'
//2 hours
const monthSelect = $('#months');
const yearSelect = $('#year');
const daySelect = $('#days');
const dayForm = $('#day-form');
const dayLength = $('#num-of-days');

const majorSelects = [monthSelect, yearSelect];
// Creates an array of months
const months = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];


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
		let numDays = getMaxDays(monthSelect.val(),yearSelect.val());
		let days = getDays(numDays)
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

dayForm.submit(e => 
{
	e.preventDefault()
	getAsWeeks(dayLength.val());
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
// Adds a day up till the maximum number of days
function getDays(numDays)
{
	let days = []
	for(let i = 1; i <= numDays; i++)
	{
		days.push(i);
	}
	return days;
}
// Function to find the maximum number of days in a month
function getMaxDays(month, year)
{
	// returns the maximum number of days given the year and the month
	return new Date(year, month, 0).getDate();
}
// Function used to convert days to weeks
function getAsWeeks(days)
{
	console.log(Math.ceil(days/7));
}
