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
        var groups = this.createDataModel(this.state.groups);
        return (
                <div className="Groups">
                    <h1>Groups</h1>

                    <Grid  key="GroupsGrid"
                        columnModel={{"link": "Group", "day_of_week": "Day", "time": "Time", "age_range": "Ages", "location.description": "Location", "topic_name": "Topic"}}
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

    createDataModel: function(groups)
    {
        for(var i=0; i<groups.length; i++)
        {
          groups[i].link = <Link to={"Group"} params={{id:groups[i].id}} tabIndex="-1" onClick={this.onClick}>{groups[i].title}</Link>;
          if(groups[i].age_range_end == "ANY")
          {
            groups[i].age_range = groups[i].age_range_start+"+";
          }
          else
          {
            groups[i].age_range = groups[i].age_range_start+"-"+groups[i].age_range_end;
          }
          groups[i].time = groups[i].start_time+"-"+groups[i].end_time;
          groups[i].topic_name = groups[i].topic[0].name;
        }
        return groups;
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
    },

    onRowClick: function(id)
    {
        console.debug("onRowClick:", id);
    }


});
module.exports = Groups;