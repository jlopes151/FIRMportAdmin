//This function is a loader function that will fire when the DOM is loaded, but before the page has rendered
$(document).ready(function()
{
	//this call slides the Nav Buttons onto the screen
    slide("#sliding-navigation", 15, 15, 150, .8);
    //this is a list of the navigable anchors
	var elements = "#sliding-navigation li.sliding-element a";
    //and this iterates through the anchors, making subMenu items child nodes to their respective parent
    //N.B. The SubMenu index is based on the number of Menu and Submenu items above it, so they are not linear on the
    //index.jsp page...it's a little effort to add a new submenu item, but with the small number of menu items,
    //hopefully this will not be a major problem for maintenance
	$(elements).each(function(i){
			var subMenu = "subMenu"+i;
			$(this).append(document.getElementById(subMenu));
		}
	);
	//document.title = "FIRMport Admin";
	$('navPageH1').replaceWith('FIRMport Admin');
});

function slide(navigation_id, pad_out, pad_in, time, multiplier)
{
	// creates the target paths
	var list_elements = navigation_id + " li.sliding-element";
	var link_elements = list_elements + " a";
	var sub_menu = "ul.subMenu";
	
	// initiates the timer used for the sliding animation
	var timer = 0;
	
	// creates the slide animation for all list elements 
	$(list_elements).each(function(i)
	{
		// margin left = - ([width of element] + [total vertical padding of element])
		$(this).css("margin-left","-180px");
		// updates timer
		timer = (timer*multiplier + time);
		$(this).animate({ marginLeft: "0" }, timer);
		$(this).animate({ marginLeft: "15px" }, timer);
		$(this).animate({ marginLeft: "0" }, timer);
	});
}

function setFieldPage(view){
    var uri = view + "?reload=" + Math.random();
    document.getElementById("field-block").src = uri;
}