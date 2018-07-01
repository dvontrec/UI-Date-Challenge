'use strict'
// Sets the initial variables
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

//adds the options to the year select 
selectYears.forEach( year => 
{
	addOptions(yearSelect, year, year);
});


// Calls the getMax Days value whenever the month or year select is changed
majorSelects.forEach(select => 
{
	//when the year or month is changed 
	select.change( e =>
	{	
		//set the maximum day number
		setDayNum();
	})
});

//calls the init function
init();
// when the day form is submitted
dayForm.submit(e => 
{
	//prevent the page from reloading
	e.preventDefault()
	//hides the form for selecting a time length
	$(dayForm).hide();
	//calls the add calender function
	addCalender()
});

//function used to set the maximum number of days
function setDayNum()
{
	// gets the maximum number of days of the selected month and year
	let numDays = getMaxDays(monthSelect.val(),yearSelect.val());
	//sets the days value to be the value the getDays function returns
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
	//loops through all numbers between years[0] to years[1] and adds them to the selections
	for(let i = years[0]; i<= years[1]; i++)
	{
		selectYears.push(i);
	}
}
// Adds a day up till the maximum number of days
function getDays(numDays)
{
	//creates an empty days array
	let days = [];
	//loops through all numbers 1- tha max number of days in the month
	for(let i = 1; i <= numDays; i++)
	{
		//adds the number to the array
		days.push(i);
	}
	//returns the days array
	return days;
}
// Function to find the maximum number of days in a month
function getMaxDays(month, year)
{
	// returns the maximum number of days given the year and the month
	return new Date(year, month, 0).getDate();
}

//when the form is submitted the calender will be populated
function addCalender()
{
	$('#reset-form').show();
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
	const head = (`
		<div class="month" id="${month}">
			<p>${month} ${year}</p>
			<div class="days head">
			<p>S</p><p>M</p><p>T</p><p>W</p><p>Th</p><p>F</p><p>S</p>
			</div>
		</div>`);
	if(totalDays>0)
	{
		$(head).appendTo(calender).append(makeDays(startDay, totalDays));
		makeMonth();
	}
}

function addExtra(target, start, end)
{
	for(let j = start; j < end; j++)
	{
		const exDay = $('<p class="exess">');
		$(target).append($(exDay));
	}
}

function getADay()
{
	const section = $(`<div>`)
	const dayList = ['S','M','T','W','Th','F','S'];
	for(let i = 0; i < dayList.length; i++)
	{
		section.append(`<p>${dayList[i]}</p>`)
	}
	console.log(section);
	return(section);
}

//function used to populate the days of the weeks
function makeDays(start, end)
{
	const startDate = new Date (`${month} ${start}, ${year}`);
	const days = $('<div class="days">');
	addExtra(days, 0, startDate.getDay());	
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
			if(totalDays <= 0)
			{
				addExtra(days,thisDate.getDay(), 6);
			}
		}
		else
		{	
			const lastDate = new Date(`${month} ${i-1}, ${year}`);
			addExtra(days, lastDate.getDay(),6);
			if(month === "December")
			{
				month = "January";
				year = year +1;
			}
			else{month = months[months.indexOf(month) +1];}
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



