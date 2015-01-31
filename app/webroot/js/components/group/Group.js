/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var GroupStore = require('../../stores/GroupStore');
var GroupActions = require('../../actions/GroupActions');
var _ = require('underscore');

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
    var group;
    if(this.state.group)
    {
        group = this.state.group;
        var groupDescription = group.description;
        group = <div>{groupDescription}</div>;
    }
    return (
      <div>
        <h1>Group</h1>
            {group}
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