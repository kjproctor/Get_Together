/*
 * IBM Confidential - OCO Source Materials
 * Copyright (c) IBM Corp. 1992, 2014
 * Copyright (c) Internet Security Systems, Inc. 1992-2006
 * The source code for this program is not published or otherwise divested of its trade secrets,
 * irrespective of what has been deposited with the U.S. Copyright Office.
 */
var AppDispatcher = require('../AppDispatcher');

var GroupActions = {
    CHANGE_PAGE: 'Group_CHANGE_PAGE',
    CHANGE_SORT: 'Group_CHANGE_SORT',
    REFRESH: 'Group_REFRESH',
    changePage:function(page) {
        AppDispatcher.handleViewAction({ actionType:GroupActions.CHANGE_PAGE, page:page });
    },
    changeSort:function(fieldName) {
    	AppDispatcher.handleViewAction({ actionType:GroupActions.CHANGE_SORT, fieldName:fieldName });
    },
    refresh:function() {
        AppDispatcher.handleViewAction({ actionType:GroupActions.REFRESH });
    }
};
module.exports = GroupActions;