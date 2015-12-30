/**
 * Creates a pageable and sortable grid that maintains partial compatibility with Dojo DataGrid syntax
 *
 * @param args a JSON object with the following properties: *
 *    -attachPoint              The DOM node to create the widget under
 *    -className                The CSS class name to apply to the grid
 *    -structure                The layout of the grid
 *    -pageSize                 The number of elements to include in a page (0 or null implies all in collection)
 *    -canSort                  Indicator for whether or not to sort
 *    -data:                    data set for the widget
 *    -filterColumn:            Column name with which to filter on
 *    -width                    The width of the widget
 */

if(typeof filteredPagedGrid == 'undefined') filteredPagedGrid = {};

function FilteredPagedGrid(args) {
    var _id = null;
    var _css = null;
    var _attachPoint = null;
    var _pageSize = null;
    var _structure = null;
    var _gridDiv = null;
    var _canSort = null;
    var _filterLabel = null;
    var _defaultSort = null;
    // cache the initial data set for resetting filtering
    var _initialDataSet = null;
    var _pagedGrid = null;
    var _pagedGridAttachPoint = "filteredPagedGrid";
    var _filterColumn = null;
    var _width = null;
    var _queryString = '';

    if(typeof args.canSort != 'undefined') _canSort = args.canSort; else _canSort = true;
    if(typeof args.pageSize != 'undefined') _pageSize = args.pageSize; else _pageSize = -1;
    if(typeof args.className != 'undefined') _css = args.className; else _css = '';
    if(typeof args.filterLabel != 'undefined') _filterLabel = args.filterLabel; else _filterLabel = '';
    if(typeof args.defaultSort != 'undefined') _defaultSort = args.defaultSort; else _defaultSort = '';
    if(typeof args.attachPoint != 'undefined') _attachPoint = args.attachPoint; else throw "Invalid Argument: You must specifiy a node to attach to!";
    if(typeof args.structure != 'undefined') _structure = args.structure; else throw "Invalid Argument: You must specifiy a structure for the grid!";
    if(typeof args.filterColumn != 'undefined') _filterColumn = args.filterColumn; else throw "Invalid Argument: You must specifiy a filter function for the grid!";
    if(typeof args.data != 'undefined') _initialDataSet = args.data;  else throw "Invalid Argument: You must specify an initial data set for filtering.";
    if(typeof args.width != 'undefined') _width = args.width;  else _width = 'auto';

    /*  ------ PRIVATE METHODS -------  */

    var _init = function(){
        _id = bfdsmgr.util.getUniqueId("FilteredPagedGrid_");
        _buildFilterGrid();
        _buildPagedGrid();
 
        bfdsmgr.tasf.getTA2kViewCompany();
                
        this.rebuildTheGrid = function(){

            // activate the wait cursor of the mouse, reactivate at the end of the buildFilterGrid
            $("<div id='reportloading' class='bfdsmgrCenter'><img id='loadingimg' border='0' src='loading.gif'/><br />Loading...</div>").appendTo($(_attachPoint)).get(0);
            /*
                from the existing page grid pass the new from and to month values to ajax in the reports initializeFilteredGrid
            */
            bfdsmgr.tasf.setSearchName( document.getElementById('pf_lng_nm').value,
            							 document.getElementById('ta2k_view_mgmt_co').value,
            							 document.getElementById('ta2k_sub_firm_nm').value, 
            							 document.getElementById('ta2k_sub_firm_dlr_num').value, 
            							 document.getElementById('ta2k_sub_firm_nscc_mbr_num').value 
            						   );

            // destroy the existing datagrid before the new init
            _destroy();
            
            bfdsmgr.tasf.initializeFilteredGrid();

            _buildPagedGrid();
            
        };
    };

    var _buildFilterGrid = function(){
        /* 
         * Use this function to create the filtered grid div or any other customization, Any customization
         * will be reflected on all pages, copy this js file and load the new one in the parent page
         */
        _gridDiv = $('<div class=pagedGridBorder width="'+_width+'">').attr("id", _id).addClass(_css).appendTo($(_attachPoint)).get(0);
/* 
 * Keep in case a search feature is needed 	
 *        
*/        
        $("<span style='position: relative; left: 0px;'>Parent Name:</span>").appendTo($(_gridDiv)).get(0);
        $("<input id='pf_lng_nm' style='position: relative; left: 5px; 'size='20' maxlength='20'/>").appendTo($(_gridDiv)).get(0);
        $("<span style='position: relative; left: 10px;'>MCompany:</span>").appendTo($(_gridDiv)).get(0);
        $("<select id='ta2k_view_mgmt_co' style='position: relative; left: 15px;' ></select>").appendTo($(_gridDiv)).get(0);
        $("<span style='position: relative; left: 20px;'>Firm Name:</span>").appendTo($(_gridDiv)).get(0);
        $("<input id='ta2k_sub_firm_nm' style='position: relative; left: 25px; 'size='20' maxlength='20' />").appendTo($(_gridDiv)).get(0);
        $("<span style='position: relative; left: 30px;'>Dealer #:</span>").appendTo($(_gridDiv)).get(0);
        $("<input id='ta2k_sub_firm_dlr_num' style='position: relative; left: 35px; 'size='10' maxlength='10' />").appendTo($(_gridDiv)).get(0);
        $("<span style='position: relative; left: 40px;'>NSCC Member Num:</span>").appendTo($(_gridDiv)).get(0);
        $("<input id='ta2k_sub_firm_nscc_mbr_num' style='position: relative; left: 45px; 'size='2' maxlength='2' />").appendTo($(_gridDiv)).get(0);
        $("<br/><br/><input id='srchbtn' style='position: relative; left: 0px;' value='Submit' type='button' onclick='rebuildTheGrid();'/>").appendTo($(_gridDiv)).get(0);
        $("</div>").appendTo($(_gridDiv)).get(0);
        // create enable filter and cancel filter buttons
        //$('#filterInput').keyup(_enableFilter);
        //$('#clearFilter').click(_clearFilter);

        $('#reportloading').remove();
    };

    var _buildPagedGrid = function(){
        // create the attach point for the pagedGrid
        $("<div></div>").attr("id", _pagedGridAttachPoint).addClass(_css).appendTo($(_gridDiv)).get(0);
        //initialize the paged grid for this widget
        _pagedGrid = new PagedGrid({
            canSort: _canSort,
            pageSize: _pageSize,
            className: _css,
            defaultSort: _defaultSort,
            attachPoint: document.getElementById(_pagedGridAttachPoint),
            structure: _structure,
            data: _initialDataSet
        });
    };

    var _destroy = function(){
        $(_gridDiv).remove();
        _pagedGrid.destroy();
    };

    //This prototype is provided by the Mozilla foundation and
    //is distributed under the MIT license.
    //http://www.ibiblio.org/pub/Linux/LICENSES/mit.license
    var _filterArray = function(func, array) {
        var list = [];
        for (var i = 0, l = array.length; i < l; i++)
            if (func.call(array, array[i], i, array)) list.push(array[i]);
        return list;
    };

    var _enableFilter = function(){
        _queryString = $('#filterInput').val();
        if (_queryString=='undefined' || _queryString==''){
            return;
        }
        var filteredData = _filterArray(_filterFunction, _initialDataSet);
        _pagedGrid.render(filteredData);
    };

    var _filterFunction = function(x){
        var string = x[_filterColumn];
        if(string == null){
            return;
        }
        if (bfdsmgr.util.startsWith(string.toLowerCase(), _queryString.toLowerCase())){
            return x;
        } else {
            return;
        }
    };

    var _clearFilter = function(){
        if(_pagedGrid == null){
            return;
        }
        _pagedGrid.render(_initialDataSet);
        $('#filterInput').val('');
    };

    /*  ------ PUBLIC METHODS ------  */

    this.getData = function(id){
        return _initialDataSet;
    };

    this.destroy = function(){
        _destroy();
    };

    this.render = function(data){
        _initialDataSet = data;
        _pagedGrid.render(data);
    };

    this.clearFilter = function(){
        _clearFilter();
    };

    //initial this object
    _init();
}
