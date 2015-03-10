/** @jsx React.DOM */

var React = require('react');

var GridHeader = React.createClass({
     getDefaultProps: function ()
     {
         return {
             columnModel: []
         }
     },

     render: function ()
     {
         var nodes = [];
         for (var fieldName in this.props.columnModel) {
            var columnName = this.props.columnModel[fieldName];
            nodes.push(<th key={columnName} data-title={columnName}>{columnName}</th>);
         }

         return(
                 <thead>
                     <tr>
                       {nodes}
                     </tr>
                 </thead>
                 );

     }
 });

module.exports = GridHeader;

