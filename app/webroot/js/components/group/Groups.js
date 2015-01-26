/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var GroupStore = require('../../stores/GroupStore');
var GroupActions = require('../../actions/GroupActions');
var Grid = require('../common/grid/Grid');
var _ = require('underscore');

function getStoreState() {
    return {
        page: GroupStore.getPage(),
        groups: GroupStore.getAll(),
        totalCount: GroupStore.getTotalCount(),
        loading: GroupStore.isLoading()
    }
}

var Groups = React.createClass({
    getDefaultProps: function() {
        return {
            resultsPerPage: GroupStore.getArg().limit
        }
    },

    getInitialState: function() {
      return getStoreState();
    },

    componentDidMount: function() {
        GroupStore.addChangeListener(this.onChange);
    },

    componentWillMount: function()
    {
       GroupActions.refresh();
    },

    render: function ()
    {
        var body;
        var groups = this.state.groups;
        return (
                <div className="Groups">
                    <h1>Groups</h1>

                    <Grid  key="GroupsGrid"
                        columnModel={{"title": "Group", "day_of_week": "Day", "start_time": "Time", "location.description": "Location"}}
                        results={groups}
                        loading={this.state.loading}
                        totalCount={this.state.totalCount}
                        page={this.state.page}
                        resultsPerPage={this.props.resultsPerPage}
                        sort={this.state.sort}
                        onChangePage={this.onChangePage}
                        onChangeSort={this.onChangeSort}
                        loading={this.state.loading}
                        onRowClick={this.onRowClick} />
                </div>
                );
    },

    onChange: function()
    {
        if(this.isMounted())
        {
            this.setState(getStoreState());
        }
    },

    onChangePage: function(page)
    {
        GroupActions.changePage(page);
    },

    onChangeSort: function(fieldName)
    {
        GroupActions.changeSort(fieldName);
    }

});
module.exports = Groups;