'use strict'
// 3 hours
const monthSelect = $('#months');
const yearSelect = $('#year');
const daySelect = $('#days');
const dayForm = $('#day-form');
const dayLength = $('#num-of-days');
const years = [1985, 2025];
const selectYears = [];
const majorSelects = [monthSelect, yearSelect];
const calender = $('#calender');
// Creates an array of months
const months = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
setDayNum();
getYears();
let month;
let year;
let startDay;
let totalDays;
// Loops through each month and adds it as an option 
months.forEach( (month, i) => 
{

	// Calls the addOptions function to add months to the month selector
	addOptions(monthSelect, month, i+1);	
})

selectYears.forEach( year => 
{
	addOptions(yearSelect, year, year);
});


// Calls the getMax Days value whenever the month or year select is changed
majorSelects.forEach(select => 
{
	select.change( e =>
	{
		setDayNum();
	})
});

init();
// when the day form is submitted
dayForm.submit(e => 
{
	e.preventDefault()
	getAsWeeks(dayLength.val());
});
function setDayNum()
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
}
//adds the corrisponding month to each option 
function addOptions(select, option, index)
{
	select.append(
		$('<option>')
			//sets the value to the month number
			.val(index)
			.text(option));
}

//function used to add the years as options
function getYears()
{
	for(let i = years[0]; i<= years[1]; i++)
	{
		selectYears.push(i);
	}
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
	// Logs the number of weeks rounded up
	addCalender()
}

//when the form is submitted the calender will be populated
function addCalender()
{
	 month  = months[monthSelect.val() -1]
	 year = parseInt(yearSelect.val())
	 startDay = parseInt(daySelect.val())
	 totalDays = parseInt(dayLength.val())
	// month.append(makeDays());
	makeMonth();
}


//Function used to populate months
function makeMonth()
{
	if(totalDays>0)
	{
		$(`<div class="month" id="${month}">
			<p>${month} ${year}</p>
		</div>`
		).appendTo(calender).append(makeDays(startDay, totalDays));
		makeMonth();
	}
}

//function used to make the weeks of the month
function getExess()
{
	console.log("add day");
	return $('<p class="exess">');
}

//function used to populate the days of the weeks
function makeDays(start, end)
{
	const startDate = new Date (`${month} ${start}, ${year}`);
	console.log(startDate);
	const days = $('<div class="days">')
	for(let j = 0; j < startDate.getDay(); j++)
	{
		const exDay = getExess();
		$(days).append($(exDay));
	}	
	for(let i = start; i < (start+end); i++)
	{
		const thisDate = new Date(`${month} ${i}, ${year}`);
		
		if(thisDate.getDate())
		{
			let day = $(`<p class="weekday">${i}</p>`);
			if(thisDate.getDay() == 0 || thisDate.getDay() == 6)
			{
				$(day).removeClass('weekday');
				$(day).addClass('weekend');
			}
			days.append($(day));
			totalDays --;
		}
		else
		{
			month = months[months.indexOf(month) +1];
			startDay = 1;
			return(days);
		}
	}
	return(days);
}


//sets initial values
function init()
{
	yearSelect.val(2018);
}


