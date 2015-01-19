var util = require("util");
var EventEmitter = require('events').EventEmitter;
var REST = require('../utils/REST');

function AbstractStore() {

    this._items = {};
    this._arg = {start: 0, limit: 10};
    this._totalCount = 0;
    this._page = 1;
    this._loading = false;
    this._resource = "";
    this._resourceQueryMethod = "";
    this._url = "";
    this._selected = "";
    this._dispatcherIndex = "";
    this.CHANGE_EVENT = "change";

    EventEmitter.call(this);

    this.emitChange = function()
    {
        this.emit(this.CHANGE_EVENT);
    };

    this.addChangeListener = function(callback) {

        this.on(this.CHANGE_EVENT, callback);
    };

    this.getSort = function() {
        return this._arg.sort;
    };

    this.getAll =  function() {
        return this._items;
    };

    this.getSelected = function()
    {
        return this._selected;
    };

    this.getTotalCount = function()
    {
        return this._totalCount;
    };

    this.getArg = function()
    {
        return this._arg;
    };

    this.getPage =  function()
    {
        return this._page;
    };

    this.isLoading = function()
    {
        return this._loading;
    };

    this.getDispatcherId = function()
    {
      return this._dispatcherIndex;
    };

    this.setSort = function(fieldName)
    {
        var sort = this._arg.sort;
        // If the fieldName matches the sort, then flip the sort around
        // otherwise start by sorting descending.
        var descending = true;
        if (sort.indexOf(fieldName) > -1) {
            // We're doing ! to make this the opposite of what it is since we're toggling
            // on the same fieldName
            descending = sort.split(".")[1] == "DESC";
        }
        this._arg.sort = fieldName+"."+(descending ? "ASC" : "DESC");
    };

    this.handleAction = function()
    {
      console.log("Subclasses must implement how to handle their own actions.");
    };

    this.refresh = function() {
        this._loading = true;
        this.emitChange();
        REST.get(this._resource+this._resourceQueryMethod, this._arg, function(data) {
            console.debug("data", data.items);
            this._items = data.items;
            this._totalCount = data.totalCount;
            this._loading = false;
            this.emitChange();
        }.bind(this));
    };
}

AbstractStore.prototype = new EventEmitter();
AbstractStore.constructor = AbstractStore;

module.exports = AbstractStore;