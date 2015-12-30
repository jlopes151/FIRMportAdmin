

function ComboBox(args) {
    var _argDefined = function(arg) {
        return typeof arg != 'undefined';
    };

    var _attachPoint = null;
    var _widgetId = null;
    var _hiddenInputId = null;
    var _inputName = null;
    var _serviceUrl = null;
    var _paging = false;
    var _onChangeHandler = function() {};
    var _onSelectHandler = function() {};

    if(_argDefined(args.attachPoint)) {
        _attachPoint = args.attachPoint;
        _widgetId = _attachPoint + '_widget';
        _hiddenInputId = _attachPoint + '_hiddenInput';
    }
    else throw "Invalid Argument: attachPoint must be defined";
    if(_argDefined(args.serviceUrl)) _serviceUrl = args.serviceUrl; else throw "Invalid Argument: serviceUrl must be defined";
    if(_argDefined(args.inputName)) _inputName = args.inputName; else throw "Invalid Argument: inputName must be defined";
    if(_argDefined(args.paging)) _paging = args.paging;
    if(typeof args.onChangeHandler == "function") _onChangeHandler = args.onChangeHandler;
    if(typeof args.onSelectHandler == "function") _onSelectHandler = args.onSelectHandler;


    var _flexboxOnSelect = function() {
        $('#' + _hiddenInputId).val(this.getAttribute('hiddenValue'));
        _isValid();
        _onChangeHandler();
        _onSelectHandler();
    };

    var _render = function() {
        $('#' + _attachPoint).append('<div id="' + _widgetId + '"></div>');
        $('#' + _attachPoint).append('<input type="hidden" id="' + _hiddenInputId + '" name="' + _inputName + '"/>');

        $('#' + _widgetId).flexbox(_serviceUrl, {
            paging: _paging,
            onSelect: _flexboxOnSelect
        });

        $('#' + _widgetId + '_input').keyup(function() {
            $('#' + _hiddenInputId).val('');
            _isValid();
            _onChangeHandler();
        });
    };

    var _isValid = function() {
        var isValid = $('#' + _hiddenInputId).val() != null && $('#' + _hiddenInputId).val() != '';
        if(!isValid) {
            $('#' + _widgetId + '_input').addClass("invalidInput");
        }
        else {
            $('#' + _widgetId + '_input').removeClass("invalidInput");
        }
        return isValid;
    };

    this.isValid = function() {
        return _isValid();
    };

    this.getDisplayedValue = function() {
        return $('#' + _widgetId + '_input').val();
    };

    this.getSelectedItemId = function() {
        return $('#' + _hiddenInputId).val();
    };

    this.clear = function() {
        $('#' + _widgetId + '_input').val('');
        $('#' + _hiddenInputId).val('');
    };

    this.render = function() {
        _render();
    };

    $(document).ready(_render);
}