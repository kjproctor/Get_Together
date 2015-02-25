/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var _ = require('underscore');
var GroupStore = require('../../stores/GroupStore');
var GroupActions = require('../../actions/GroupActions');
var LocalMap = require('../common/map/LocalMap');

function getStoreState() {
    return {
        group: GroupStore.get(),
        loading: GroupStore.isLoading()
    }
}

var Group = React.createClass({

  mixins: [ Router.State ],

  getInitialState: function()
  {
    return getStoreState();
  },

  componentDidMount: function()
  {
    GroupStore.addChangeListener(this.onChange);
  },

  componentWillMount: function()
  {
    var id = this.getParams().id;
    GroupActions.get(id);
  },

  render: function ()
  {
    var map;
    if(this.state.group)
    {
        var group = this.state.group;
        var title = group.title;
        var description = group.description;
        var location = "Location: "+group.location.name+", "+group.location.description;
        var status = "Status: "+group.status;
        var meets = "Meets: "+group.day_of_week_frequency+" "+group.day_of_week+" from "+group.start_time+" to "+group.end_time;
        var topic = "Topic: "+group.topic[0].name;
        var ages;
        if(group.age_range_end == "ANY")
        {
            ages = "Ages: "+group.age_range_start+"+";
        }
        else
        {
            ages = "Ages: "+group.age_range_start+"-"+group.age_range_end;
        }
        map = <LocalMap location={group.location} />;
    }
    return (
            <div className="container-fluid">
                <h1>{title}</h1>
                <h3>{description}</h3>
                <div className="row">
                    <div className="col-sm-3 col-md-6">{meets}</div>
                    <div className="col-sm-3 col-md-6">{location}</div>
                </div>
                <div className="row">
                    <div className="col-sm-3 col-md-6">{ages}</div>
                    <div className="col-sm-3 col-md-6">{topic}</div>
                    <div className="col-sm-3 col-md-6">{status}</div>
                </div>
                {map}
            </div>
    );
  },

  onChange: function()
  {
    if(this.isMounted())
    {
        this.setState(getStoreState());
    }
  }
});

module.exports = Group;