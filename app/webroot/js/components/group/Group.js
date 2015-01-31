/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var GroupStore = require('../../stores/GroupStore');
var GroupActions = require('../../actions/GroupActions');
var Grid = require('../common/grid/Grid');
var _ = require('underscore');

var Group = React.createClass({

  render: function () {
    return (
      <div>
        <h1>Group</h1>
      </div>
    );
  }
});

module.exports = Group;