/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var _ = require('underscore');
var $ = require('jquery');
var GroupStore = require('../../stores/GroupStore');
var GroupActions = require('../../actions/GroupActions');
var LocalMap = require('../common/map/LocalMap');

function getStoreState() {

    return {
        group: GroupStore.get(),
        loading: GroupStore.isLoading(),
        mapWidth: $('#group').width()
    }
}

var Group = React.createClass({

  mixins: [ Router.State ],

  getInitialState: function()
  {
    return getStoreState();
  },

  handleResize: function(e)
  {
    this.setState({mapWidth: $('#group').width()});
  },

  componentDidMount: function()
  {
    window.addEventListener('resize', this.handleResize);
    GroupStore.addChangeListener(this.onChange);
  },

  componentWillMount: function()
  {
    var id = this.getParams().id;
    GroupActions.get(id);
  },

  componentWillUnmount: function()
  {
    window.removeEventListener('resize', this.handleResize);
  },

  render: function ()
  {
    var map;
    if(this.state.group)
    {
        var group = this.state.group;
        var title = group.title;
        var description = group.description;
        var location = group.location.name+", "+group.location.description;
        var status = group.status;
        var meets = group.day_of_week_frequency+" "+group.day_of_week+" from "+group.start_time+" to "+group.end_time;
        var topic = group.topic[0].name;
        var ages;
        if(group.age_range_end == "ANY")
        {
            ages = group.age_range_start+"+";
        }
        else
        {
            ages = group.age_range_start+"-"+group.age_range_end;
        }
        map = <LocalMap location={group.location} height={400} width={this.state.mapWidth} />;
    }
    return (
            <div id="group" className="container-fluid">
               <div className="group-heading">
                <h1>{title}</h1>
                {description}
               </div>
                <div className="group-info">
                    <div className="row">
                        <div className="col-sm-3 col-md-6"><b>Meets: </b>{meets}</div>
                        <div className="col-sm-3 col-md-6"><b>Location: </b>{location}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 col-md-6"><b>Ages: </b>{ages}</div>
                        <div className="col-sm-3 col-md-6"><b>Topic: </b>{topic}</div>
                        <div className="col-sm-3 col-md-6"><b>Status: </b>{status}</div>
                    </div>
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