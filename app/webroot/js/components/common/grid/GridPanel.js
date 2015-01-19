/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');

var GridHeader = require('./GridHeader');
var GridRow = require('./GridRow');

var GridPanel = React.createClass({
  getDefaultProps: function ()
  {
      return {
          sort: null,
          data: {},
          columnModel: {},
          onChangeSort: null,
          onRowClick:null
      }
  },

  render: function ()
  {
    var data = this.props.data;
    var gridRows = [];
    if (_.isEmpty(data)) {
        gridRows.push(<tr key="noresults"><td colSpan={_.keys(this.props.columnModel).length}><div style={{textAlign: 'center'}}>No results</div></td></tr>);
    } else {
        gridRows = data.map(function (row, index) {
            return this.createGridRow(row);
        }, this);
    }
    return (
           <table className="GridPanel table">
               <GridHeader sort={this.props.sort} columnModel={this.props.columnModel} onChangeSort={this.props.onChangeSort}/>
               <tbody>
                 {gridRows}
               </tbody>
           </table>
           );
  },    

   createGridRow: function(row)
   {
       var columns = _.keys(this.props.columnModel);
       var onRowClick = this.props.onRowClick;
       //this.formatDateTime(columns, row);
       return <GridRow key={row.id} rowId={row.id} data={row} columns={columns} onRowClick={onRowClick}/>
   },

   formatDateTime: function(columns, row)
   {
     for(var i=0; i < columns.length; i++)
       {
           if(columns[i].toLowerCase().contains("date"))
           {
               //row[columns[i]] = moment(row[columns[i]]).format("M/D/YYYY HH:mm:s zz");
               row[columns[i]] = new Date(row[columns[i]]).toString();
           }

       }
   }
});

module.exports = GridPanel;

