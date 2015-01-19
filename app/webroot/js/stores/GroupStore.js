var util = require("util");
var AbstractStore = require("./AbstractStore");
var AppDispatcher = require('../AppDispatcher');
var GroupActions = require('../actions/GroupActions');

var GroupStore = function()
{
    AbstractStore.call(this);
    this._arg = {start: 0, limit: 10};
    this._resource = "/Get_Together/groups/";
    this._resourceQueryMethod = "findAll";

    this.handleAction = function(payload)
    {
        var action = payload.action;
        switch(action.actionType) {
            case GroupActions.REFRESH:
                this.refresh();
                break;
            case GroupActions.CHANGE_PAGE:
                this._page = action.page;
                this._arg.start = this._page * this._arg.limit;
                this.refresh();
                break;
            case GroupActions.CHANGE_SORT:
                this.setSort(action.fieldName);
                this.refresh();
                break;
            default:
            // do nothing
        }
        return true;
    };

    this._dispatcherIndex = AppDispatcher.register(this.handleAction.bind(this));
};

GroupStore.prototype = new AbstractStore();
GroupStore.constructor = GroupStore;
//make this a singleton
module.exports = exports = new GroupStore();