/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Navigation = React.createClass({
      getDefaultProps: function()
      {
          return {
              width: window.innerWidth
          }
      },

      handleResize: function(e)
      {
          this.setState({width: window.innerWidth});
      },

      componentDidMount: function()
      {
          window.addEventListener('resize', this.handleResize);
      },

      componentWillUnmount: function()
      {
          window.removeEventListener('resize', this.handleResize);
      },

      render: function ()
      {
          var menu;
          var button;
          var style;
          if(window.innerWidth > 700)
          {
            style = "menuContainer";
            menu = this.createMenu(false);
          }
          else
          {
            style = "menuContainerSm";
            button = this.createButton();
            menu = this.createMenu(true);
          }
          return (
            <div className={style}>
                {button}
                {menu}
            </div>
          );
      },

      createMenu: function(hide)
      {
            var display;
            if(hide)
            {
                display = "navbar navbar-custom collapse";
            }
            else
            {
                display = "navbar navbar-custom expand";
            }
            return (
                      <nav ref="menuNavigation" className={display}>
                          <div className="container">
                              <div className="navbar-left"></div>
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
      },

      createButton: function()
      {
            return (
                 <button type="button" className="btn btn-default navigation-menu-button" aria-label="Menu" onClick={this.onClick}>
                    <span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
                 </button>
            );
      },

      	onClick: function()
      	{
      		this.toggleCollapse();
      	},

      	toggleCollapse: function()
      	{
      		var navBar = this.refs.menuNavigation.getDOMNode();
          	if(navBar.className == "navbar navbar-custom collapse")
      		{
      			navBar.className = "navbar navbar-custom expand";
      		}
      		else if(navBar.className =="navbar navbar-custom expand")
      		{
      			navBar.className = "navbar navbar-custom collapse";
      		}
      	}

});
module.exports = Navigation;