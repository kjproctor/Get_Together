/** @jsx React.DOM */

var React = require('react');

var GridHeader = React.createClass({
     getDefaultProps: function ()
     {
         return {
             columnModel: [],
             sort: null,
             onChangeSort: null
         }
     },

     renderDirection: function(sort, fieldName) {
        // If sort isn't specified or the sort doesn't pertain to this field, return
        if (!sort || sort.indexOf(fieldName) == -1) return;
        var direction = "v"; // Descending
        if (sort.indexOf("ASC") > 0) {
            direction = "^";
        }
        return direction;
     },

     render: function ()
     {
         var nodes = [];
         for (var fieldName in this.props.columnModel) {
            var columnName = this.props.columnModel[fieldName];
            nodes.push(<th key={columnName} data-title={columnName} onClick={this.onHeaderClick.bind(this, fieldName)}>{columnName} {this.renderDirection(this.props.sort, fieldName)}</th>);
         }

         return(
                 <thead>
                     <tr>
                       {nodes}
                     </tr>
                 </thead>
                 );

     },

     onHeaderClick: function(fieldName)
     {
        this.props.onChangeSort(fieldName);
     }

 });

module.exports = GridHeader;

