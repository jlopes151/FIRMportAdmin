/**
 * Creates a pageable and sortable grid that maintains partial compatibility with Dojo DataGrid syntax
 *
 * @param args a JSON object with the following properties: *
 *    -attachPoint              The DOM node to create the widget under
 *    -className                The CSS class name to apply to the grid
 *    -structure                The layout of the grid
 *    -initialSort              Column to use for inital sorting
 *    -pageSize                 The number of elements to include in a page (0 or null implies all in collection)
 *    -canSort                  Indicator for whether or not to sort
 *    -data:                    Function to call when a sponsor is selected
 */

if(typeof pagedGrid == 'undefined') pagedGrid = {};
pagedGrid.sortOrders = {
    ascending: 1,
    descending: -1
}; 

function PagedGrid(args) {

    var _id = null;
    var _css = null;
    var _attachPoint = null;
    var _pageSize = null;
    var _table = null;
    var _structure = null;
    var _data = null;
    var _currentIndex = 0;
    var _lastButton = null;
    var _nextButton = null;
    var _showingLabel = null;
    var _currentSortField = null;
    var _currentSortOrder = null;
    var _canSort = null;
    var _defaultSort = null;

    // Over the "Edit" column, referenced in a couple of places
    var _BLANKSPACE = "&nbsp;";

    if(typeof args.canSort != 'undefined') _canSort = args.canSort; else _canSort = true;
    if(typeof args.pageSize != 'undefined') _pageSize = args.pageSize; else _pageSize = -1;
    if(typeof args.className != 'undefined') _css = args.className; else _css = '';
    if(typeof args.attachPoint != 'undefined') _attachPoint = args.attachPoint; else throw "Invalid Argument: You must specifiy a node to attach to!";
    if(typeof args.structure != 'undefined') _structure = args.structure; else throw "Invalid Argument: You must specifiy a structure for the grid!";
    if(typeof args.data != 'undefined') _data = args.data;
    if(typeof args.defaultSort != 'undefined') _defaultSort = args.defaultSort; else _defaultSort = 'NoColumnWillEverBeNamedThis';

    //Compatibility methods
    //Used to replicate dojox.grid.DataGrid behavior
    var _compatibility = {};
    _compatibility.grid = {
        getItem : function(index) {
            return _getItem(index);
        }
    };

    //Event handlers
    //Called when the next arrow is clicked
    //sets the index to the start of the next page
    var _next = function(ev) {
        if(_nextButton.disabled) return;
        _currentIndex += _pageSize;
        _renderRows(_currentIndex);
    };

    //Called when the last arrow is clicked
    //sets the current index into the data array to the start of the prior page
    var _last = function(ev) {
        if(_lastButton.disabled) return;
        _currentIndex -= _pageSize;
        _renderRows(_currentIndex);
    };

    //Public methods
    /**
     * Renders the grid given the data
     *
     * @param data data matching the format specified in the layout
     */
    this.render = function(data) {
        _data = data;
        //if there is no data, remove all rows in the table so that the next
        //render call will correctly re-create the rows

        if(_data.length <= 0) {
            _destroyRows(0);
        //if there is no body, then render the entire grid
        } else if($('#' + _table.id + "_body").get().length == 0) {
            _render();
        //if a table body exists and there is data, render the data into the existing rows
        } else {
            //_destroyRows(0);
            _renderRows(0);
        }
    };

    /**
     * Public wrapper around the destroy function.  Completely removes the grid and all DOM objects.
     */
    this.destroy = function() {
        _destroy();
    };
    /**
     * Get the item from the data array given its index
     *
     * @param index 
     */
    this.getItem = function(index) {
        return _getItem(index);
    };

    //Private Helpers
    var _getItem = function(index) {
        return _data[index];
    };
    
    var _startup = function() {
        _id = bfdsmgr.util.getUniqueId("PageGrid_");
        //Create the table and assign the reference to the private _table
        _table = $("<table width='100%'></table>").attr("id", _id).addClass(_css).appendTo($(_attachPoint)).get(0);
        if(_data != null) {
            _render();
        }
    };
    
    var _setPageButtonContext = function(rows) {
        if(_currentIndex == 0) {
            $(_lastButton.domNode).addClass('pagedGridLightText');
            _lastButton.disabled = true;
        } else {
            $(_lastButton.domNode).removeClass('pagedGridLightText');
            _lastButton.disabled = false;
        }

        if(_currentIndex + _pageSize >= _data.length) {
            $(_nextButton.domNode).addClass('pagedGridLightText');
            _nextButton.disabled = true;
        } else {
            $(_nextButton.domNode).removeClass('pagedGridLightText');
            _nextButton.disabled = false;
        }

        _showingLabel.innerHTML = "&nbsp;&nbsp;" + (_currentIndex + 1) + "-" + (_currentIndex + rows) + " of " + _data.length + "&nbsp;&nbsp;";
    };
    
    var _render = function() {
        _createHeader(_table, _structure);
        var rows = _pageSize > 0 && _pageSize < _data.length ? _pageSize : _data.length;
        _createBody(_table, _structure, _data, rows);
        if(_pageSize > 0) {
            _createPageButtons();
            _setPageButtonContext(rows);
        }
    };
    
    var _renderRows = function(startIndex) {
        if(startIndex < 0 || startIndex > _data.length - 1) throw "Invalid State: Start index out of bounds";
        var tbody = $('#' + _table.id + '_body').get(0);
        var rows = _pageSize > 0 && _pageSize < _data.length - startIndex ? _pageSize : _data.length - startIndex;
        if(tbody.rows.length < rows)  {
            _destroyRows(0);
            $(tbody).remove();
            tbody = null;
        }
        if(tbody == null) {
            _createBody(_table, _structure, _data, _pageSize > 0 && _pageSize < _data.length ? _pageSize : _data.length);
        } else {
            if(rows < tbody.rows.length) {
                _destroyRows(rows);
            }
            _updateBody(tbody, _structure, _data, rows, startIndex);
        }
        if(_pageSize >0) _setPageButtonContext(rows);
    };
    
    var _destroyRows = function(startIndex) {
        var tbody = $('#' + _table.id + '_body').get(0);
        if(typeof tbody == 'undefined' || startIndex < 0) return;
        while(tbody.rows.length > startIndex){
            tbody.deleteRow(tbody.rows.length-1);
        }
    };
    
    var _destroy = function() {
        _destroyRows(0);
        $(_table).remove();
    };
    
    var _createHeader = function(table, structure) {
        var thead = $("<thead>").appendTo($(table)).get(0);
        var row = thead.insertRow(-1);
        for(var i in structure) {
            var layout = structure[i];

            if(!layout.hidden) {
                var cell = row.insertCell(-1);

                // The header column name.  (The "undefined" column is the last column over the edit button.)
                cell.innerHTML = typeof layout.name == 'undefined' ? _BLANKSPACE : layout.name;

                // Set up sort functionality and icon.
                if(_canSort) {
                    cell.sortBy = layout.field;
                    cell.onclick = function() {
                        _sortByColumn(this);
                    };

                    // Filter out the &nbsp column since it may have a field name that matches _defaultSort
                    if(layout.name != _BLANKSPACE && _defaultSort == layout.field){
                        $("<img>").attr({id: "pagedGridSortIcon", src: "widgets/PagedGrid/res/arrow_down.png"}).appendTo($(cell));
                    }
                }
                cell.className = typeof layout.headerClasses == 'undefined' ? 'pagedGridPageGridCell' : 'pagedGridPageGridCell ' + layout.headerClasses;
                cell.style.width = typeof layout.width == 'undefined' ?  (100 / structure.length) + '%' : layout.width;
            }
        }
    };

    var _sortByColumn = function(node) {

        // the column that was just clicked
        var columnName = node.sortBy;

        //neat bit of logic to determine sort order based on a column name
        if(_currentSortOrder == null) {
            _currentSortOrder = pagedGrid.sortOrders.descending;
        }
        else {
            if(_currentSortField == columnName) {
               _currentSortOrder = -_currentSortOrder;
            }
        }
        _currentSortField = columnName;

        //basic sorting algorithm
        _data.sort(
            function(a, b) {
                if(a[columnName] > b[columnName]) {
                    return _currentSortOrder;
                }
                if(a[columnName] < b[columnName]) {
                    return -_currentSortOrder;
                }
                return 0;
            }
        );

        // hide the current icon
        var icon = $("#pagedGridSortIcon").get(0);
        if(typeof icon != 'undefined' && icon != null) {
            var parent = icon.parentNode;
            parent.removeChild(icon);
        }

        // show the new icon
        if(_currentSortOrder == pagedGrid.sortOrders.ascending) {
            $("<img>").attr({id: "pagedGridSortIcon", src: "widgets/PagedGrid/res/arrow_down.png"}).appendTo($(node));
        }
        else {
            $("<img>").attr({id: "pagedGridSortIcon", src: "widgets/PagedGrid/res/arrow_up.png"}).appendTo($(node));
        }

        _currentIndex = 0;
        _renderRows(0);
    };

    //displaying body of the grid on update
    var _updateBody = function(tbody, structure, data, rows, startIndex) {
        for(var i = 0; i < rows; i++) {
            var row = tbody.rows[i];
            var dataItem = data[i + startIndex];
            _updateCell(row, dataItem, structure, i + startIndex);
        }
    };
    
    // creating body of grid
    var _createBody = function(table, structure, data, rows) {
        var tbody = $("<tbody>").attr("id",table.id + '_body').appendTo($(table)).get(0);
        for(var i = 0; i < rows; i++) {
            var row = tbody.insertRow(-1);
            // gridRowEven doesn't exist
            row.className = i%2==0 ? 'gridRowEven' : 'gridRowOdd';
            /*
             * this doesn't work in ie7, need to use the latest version of ie or firefox
             */
            row.setAttribute('onclick','setRowToEdit(this); return true');
            row.setAttribute('ondblclick','activateEditPage(this); return true');            
            var dataItem = data[i];
            _createCell(row, dataItem, structure, i);
        }
    };
    
    //create cell logic
    var _createCell = function(row, dataItem, structure, index) {
        for(var j in structure) {
            var layout = structure[j];
            
            if(layout.button) {
                var cell = row.insertCell(-1);
                cell.className = typeof layout.classes == 'undefined' ? 'pagedGridCell' : 'pagedGridCell ' + layout.classes;
                var value = typeof dataItem[layout.field] =='undefined' ? '&nbsp;' : dataItem[layout.field];
                cell.innerHTML = "<input type='button' value='Relate' onclick='bfdsmgr.tasf.ta2kSubFirmDialog();'/>";
            }else if(layout.hidden){
                var cell = row.insertCell(-1);
                cell.className = typeof layout.classes == 'undefined' ? 'bfdsHidden' : 'bfdsHidden ' + layout.classes;
                var value = typeof dataItem[layout.field] =='undefined' ? '&nbsp;' : dataItem[layout.field];
                cell.innerHTML = typeof layout.formatter == 'function' ? layout.formatter.apply(_compatibility, [value, index]) : value;
            }else{
                var cell = row.insertCell(-1);
                cell.className = typeof layout.classes == 'undefined' ? 'pagedGridCell' : 'pagedGridCell ' + layout.classes;
                var value = typeof dataItem[layout.field] =='undefined' ? '&nbsp;' : dataItem[layout.field];
                if(value == null){value = '';}
                cell.innerHTML = typeof layout.formatter == 'function' ? layout.formatter.apply(_compatibility, [value, index]) : value;
            }
            
        }
    };
    
    //update cell logic
    var _updateCell = function(row, dataItem, structure, index) {
        var i = 0;
        for(var j in structure) {
            var layout = structure[j];
            
            if(layout.button) {
                var cell = row.cells[i];
                cell.className = typeof layout.classes == 'undefined' ? 'pagedGridCell' : 'pagedGridCell ' + layout.classes;
                var value = typeof dataItem[layout.field] =='undefined' ? '&nbsp;' : dataItem[layout.field];
                cell.innerHTML = "<input type='button' value='Relate' onclick='bfdsmgr.tasf.ta2kSubFirmDialog();'/>";
                i++;
            }else if(layout.hidden){
                var cell = row.cells[i];
                cell.className = typeof layout.classes == 'undefined' ? 'bfdsHidden' : 'bfdsHidden ' + layout.classes;
                var value = typeof dataItem[layout.field] =='undefined' ? '&nbsp;' : dataItem[layout.field];
                cell.innerHTML = typeof layout.formatter == 'function' ? layout.formatter.apply(_compatibility, [value, index]) : value;
                i++;
            }else{
                var cell = row.cells[i];
                cell.className = typeof layout.classes == 'undefined' ? 'pagedGridCell' : 'pagedGridCell ' + layout.classes;
                var value = typeof dataItem[layout.field] =='undefined' ? '&nbsp;' : dataItem[layout.field];
                if(value == null){value = '';}
                cell.innerHTML = typeof layout.formatter == 'function' ? layout.formatter.apply(_compatibility, [value, index]) : value;
                i++;
            }
            
        }
    };
    
    //creating the buttons for page next/prev in the widget.
    var _createPageButtons = function() {
        var div = $('<div>').appendTo($(_attachPoint)).get(0);
        div.style.margin = 'auto';
        div.style.width = '100%';
        div.style.textAlign = 'center';
        _lastButton = {domNode: $('<a>').attr("href", '#').addClass('pagedGridLink pagedGridLinkButton').html("&lt;&lt;").click(_last).appendTo($(div)).get(0), disabled: false};
        _showingLabel = $('<span>').addClass('pagedGridText').attr("innerHTML", '').appendTo($(div)).get(0);
        _showingLabel.style.margin = '5px, 0, 5px, 0';
        _nextButton = {domNode: $('<a>').attr("href", '#').addClass('pagedGridLink pagedGridLinkButton').html("&gt;&gt;").click(_next).appendTo($(div)).get(0), disabled: false};
    };
 
    _startup();
}