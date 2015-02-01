var AppDispatcher = require('../AppDispatcher');

var GroupActions = {
    CHANGE_PAGE: 'Group_CHANGE_PAGE',
    CHANGE_SORT: 'Group_CHANGE_SORT',
    REFRESH: 'Group_REFRESH',
    GET: 'Group_GET',

    changePage:function(page) {
        AppDispatcher.handleViewAction({ actionType:GroupActions.CHANGE_PAGE, page:page });
    },
    changeSort:function(fieldName) {
    	AppDispatcher.handleViewAction({ actionType:GroupActions.CHANGE_SORT, fieldName:fieldName });
    },
    refresh:function() {
        AppDispatcher.handleViewAction({ actionType:GroupActions.REFRESH });
    },
    get:function(id) {
        AppDispatcher.handleViewAction({ actionType:GroupActions.GET, id:id });
    }
};
module.exports = GroupActions;