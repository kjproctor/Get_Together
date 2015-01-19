/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Navigation = React.createClass({
                                render: function ()
                                {
                                  return(
								         <nav className="navbar navbar-custom" role="navigation">
        									<div className="container">
            									<div className="navbar-left">
            									</div>
            									<div className="navbar-right">
													<ul className="nav navbar-nav">
														<li><Link to="Login">Login</Link></li>
													</ul>
													<ul className="nav navbar-nav">
                                                        <li><Link to="Groups">Groups</Link></li>
                                                    </ul>
													<ul className="nav navbar-nav">
														<li><Link to="Contact">Contact</Link></li>
													</ul>
            									</div>
        									</div>
    									</nav>
										);
                                }

                            });
module.exports = Navigation;