/** @jsx React.DOM */
/*
 * results
 *   List of data results to display. For example a list of devices.  Use the columnModel to pick what data on the device to display
 * columnModel
 *   maps grid column names and object fields to use from the results
 *   {"id":"Device ID", "hostName":"DeviceName"}
 * */
var React = require('react');
var _ = require('underscore');
var $ = require('jquery');
var GridPanel = require('./GridPanel');
var GridPaginator = require('./GridPaginator');

var Grid = React.createClass({

     getDefaultProps: function()
     {
         return {
             sort: null,
             loading: false,
             page: 1,
             results: [],
             totalCount: 0,
             columnModel: {},
             resultsPerPage: 2,
             onChangePage: null,
             onChangeSort: null,
             onRowClick: null
         }
     },

     componentDidUpdate: function () 
     {
        var nodes = $(this.getDOMNode()).find(".loading-container");

        if (nodes.length > 0) {
            var lc = $(nodes[0]);
            var tbody = $(lc.parent().children('.grid-body').find('tbody')[0]);
            lc.offset(tbody.offset());
            lc.width(tbody.width());
            lc.height(tbody.height()); 
        }
     },

     render: function ()
     {
         var results = this.props.results;
         var columnModel = this.props.columnModel;
         var loading = this.props.loading ? <div className="loading-container"><div className="loading">Loading&#8230;</div></div> : "";
         console.debug(results);
         return (
                 <div className="Grid">
                     <div className="grid-container panel panel-default">
                         {loading}
                         <div className="grid-body">
                             <GridPanel data={results}
                             columnModel={columnModel}
                             sort={this.props.sort}
                             onRowClick={this.props.onRowClick}
                             onChangeSort={this.props.onChangeSort}/>
                         </div>
                         <div className="grid-footer clearfix">
                                 <GridPaginator 
                                 resultsPerPage={this.props.resultsPerPage} 
                                 totalCount={this.props.totalCount} 
                                 page={this.props.page} 
                                 onChangePage={this.props.onChangePage}/>
                         </div>
                     </div>
                 </div>
                 );
     }
});
module.exports = Grid;