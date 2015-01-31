/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var { Route, Redirect, RouteHandler, Link } = Router;
var $ = require('jquery');
window.$ = $;
var Navigation = require('./components/common/Navigation');
var Login = require('./components/common/Login');
var Groups = require('./components/group/Groups');
var Group = require('./components/group/Group');
var Contact = require('./components/common/Contact');

var App = React.createClass({
                                render: function ()
                                {
                                    return (
                                            <div>
											   <Navigation />
											   <div className="app-dock">
                                               		<RouteHandler/>
                                               </div>
                                            </div>
                                            );
                                }
                            });

var routes = (
  <Route handler={App} path="/">
    <Route name="Login" handler={Login} />
    <Route name="Groups" handler={Groups} />
    <Route name="Group" path="Group/:id" handler={Group}/>
    <Route name="Contact" handler={Contact} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});