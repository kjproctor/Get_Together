/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');

var GridPaginator = React.createClass({

     getDefaultProps: function()
     {
         return {
             page: 1,
             resultsPerPage: 10,
             totalCount: 0,
             onChangePage: null
         }
     },

     render: function ()
     {
         var numPages;
         if(this.props.totalCount == this.props.resultsPerPage)
         {
             numPages = 0;
         }
         else
         {
             numPages = Math.ceil(this.props.totalCount/this.props.resultsPerPage);
         }
         var paginatorBody;
         if(numPages > 1)
         {
             var previous = "";
             var next = "";

             if(this.props.page > 1){
                 previous = <span onClick={this.prevPage} className="previous" ref="prev"><i className="glyphicon glyphicon-chevron-left"></i>Prev</span>
             }
             if(this.props.page != numPages){
                 next = <span onClick={this.nextPage} className="next" ref="next">Next<i className="glyphicon glyphicon-chevron-right"></i></span>
             }

             var options = [];
             for(var i = 1; i<= numPages; i++){
                 options.push(<option key={i} value={i}>{i}</option>);
             }
             paginatorBody =  (<div>
                                 <div className="col-xs-4">{previous}</div>
                                 <div className="col-xs-4 center">
                                    <select value={this.props.page} onChange={this.changePage}>
                                      {options}
                                    </select> / {numPages} </div>
                                 <div className="col-xs-4 right">{next}</div>
                               </div>);
         }
         else
         {
             paginatorBody = (<div>
                                <div className="col-xs-4"></div>
                                <div className="col-xs-4 center">{this.props.totalCount} results</div>
                                <div className="col-xs-4"></div>
                              </div>);
         }
         return (
             <div className="row">
               {paginatorBody}
             </div>
         );
     },

      changePage: function(event, pageModifier){
          var page = !_.isUndefined(pageModifier) ? (this.props.page + pageModifier) : parseInt(event.target.value);
          console.debug("page: ", page);
          if (!_.isNull(this.props.onChangePage)) {
              this.props.onChangePage(page);
          }
      },

      prevPage: function(event){
          this.changePage(event, -1);
      },

      nextPage: function(event){
          this.changePage(event, 1);
      }
});
module.exports = GridPaginator;