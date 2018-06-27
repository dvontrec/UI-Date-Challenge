const monthSelect = $('#months');
const yearSelect = $('#year');
const daySelect = $('#day');

// Creates an array of months
const months = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];

// Loops through each month and adds it as an option 
months.forEach( (month, i) => {

	// Calls the addOptions function to add months to the month selector
	addOptions(monthSelect, month, i+1);	
})

// Calls the getMax Days value whenever the month or year select is changed
monthSelect.change( e => {console.log(getMaxDays(monthSelect.val(),yearSelect.val()))})

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