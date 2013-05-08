/* Taken from http://stackoverflow.com/questions/563406/add-days-to-datetime-using-javascript */
Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);

    return dat;
}

function Calendar(id)
{
	// this.cal_id = id; // TODO: maybe get the element itself at this point
	this.calendar = document.getElementById(id);
	this.id = id;
}

Calendar.numDaysInCal = 35;
Calendar.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
Calendar.dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

Calendar.start_of_cal = function(date)
{
	/* create date for the 1st of the month */
	var startOfMonth = new Date(date);
	startOfMonth.setDate(1); 

	/* compute date for the start of the week */
	var startOfCal = new Date(startOfMonth);
	startOfCal.setDate(startOfMonth.getDate() - startOfMonth.getDay());

	return startOfCal;
}

Calendar.prototype.render = function(date)
{
	// var calTable = Calendar.create_empty_calendar();
	// this.calendar.innerHTML = '';
	// this.calendar.appendChild(calTable);

	this.create_empty_calendar();
	this.populate_table(date);
}

Calendar.prototype.populate_table = function(date)
{
	var title = document.getElementById(this.id + '-calTitle');
	title.innerHTML = Calendar.monthNames[date.getMonth()] + " " + String(date.getFullYear());

	var leftcontrol = document.getElementById(this.id + '-lc');
	var prevMonth = new Date(date);
	prevMonth.setMonth(prevMonth.getMonth() - 1);

	leftcontrol.setAttribute("onclick", "c = new Calendar('" + String(this.id) + "'); c.render(new Date('" + String(prevMonth) + "'));");

	var rightcontrol = document.getElementById(this.id + '-rc');
	var nextMonth = new Date(date);
	nextMonth.setMonth(nextMonth.getMonth() + 1); //hack

	rightcontrol.setAttribute("onclick", "c = new Calendar('" + String(this.id) + "'); c.render(new Date('" + String(nextMonth) + "'));");
	// leftcontrol.setAttribute("onclick", "document.getElementById('" + this.id + "').render()");
	// leftcontrol.onclick = "document.getElementById('" + this.id + "')";

	var start = Calendar.start_of_cal(date);
	for (var r = 0; r < 5; r++)
	{	
		for (var c = 0; c < 7; c++)
		{
			var id = this.id + "-" + String(r) + "-" + String(c);
			var cell = document.getElementById(id);
			cell.innerHTML = String(start.getDate());

			if (date.getMonth() != start.getMonth())
				cell.className = "cntr content_odd";
			else
				cell.className = "cntr";
			start = start.addDays(1);
		}
	}
}

Calendar.prototype.create_empty_calendar = function()
{
	this.calendar.innerHTML = ''; // clear previous contents of the calendar div

	
	var table = document.createElement("TABLE");
	this.calendar.appendChild(table);

	var controlsRow = document.createElement("TR");
	table.appendChild(controlsRow);

	controlsRow.innerHTML = "<th><a href='javascript:void(0)' id='" + this.id + "-lc'>&lt;</a></th> <th id='" + this.id + "-calTitle' colspan='5'></th> <th><a href='javascript:void(0)' id='" + this.id + "-rc'>&gt;</a></th>";	

	// var leftControl = document.createElement("TD");
	// leftControl.id = "leftcontrol";
	// leftControl.innerHTML = "&lt;";
	// var calendarTitle = document.createElement("TD");
	// leftControl.id = "calendarTitle";
	// var rightControl = document.createElement("TD");
	// rightControl.id = "rightcontrol";
	// rightcontrol.innerHTML = "&gt;";

	var dayNameRow = document.createElement("TR");
	dayNameRow.className = "header";
	table.appendChild(dayNameRow);

	//dayNameRow.innerHTML = "<td>Sun</td><td>Mon</td><td>Tues</td><td>Wed</td><td>Thurs</td><td>Fri</td><td>Sat</td>";
	dayNameRow.innerHTML = "<td>Su</td><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td>";

	for (var r = 0; r < 5; r++)
	{	
		var row = document.createElement("TR");
		row.className = "content_even";
		table.appendChild(row);
		for (var c = 0; c < 7; c++)
		{
			var cell = document.createElement("TD");
			cell.className = "cntr";
			cell.id = this.id + "-" + String(r) + "-" + String(c);
			row.appendChild(cell);
		}
	}
}

// TODO: handle march 2014, need more rows


