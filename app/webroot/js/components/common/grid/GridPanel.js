/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');

var GridHeader = require('./GridHeader');
var GridRow = require('./GridRow');
var SingleCellRow = require('./SingleCellRow');

var GridPanel = React.createClass({
  getDefaultProps: function ()
  {
      return {
          sort: null,
          data: {},
          columnModel: {},
          onChangeSort: null,
          onRowClick:null,
          width: window.innerWidth
      }
  },

  handleResize: function(e)
  {
      //console.debug("window size: ", window.innerWidth);
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
    var data = this.props.data;
    var gridRows = [];
    var gridHeader;
    if(window.innerWidth > 700)
    {
        gridHeader = <GridHeader columnModel={this.props.columnModel} />;
    }
    if (_.isEmpty(data)) {
        gridRows.push(<tr key="noresults"><td colSpan={_.keys(this.props.columnModel).length}><div style={{textAlign: 'center'}}>No results</div></td></tr>);
    } else {
        gridRows = data.map(function (row, index) {
            return this.createGridRow(row);
        }, this);
    }
    return (
           <table className="table table-striped">
               {gridHeader}
               <tbody>
                 {gridRows}
               </tbody>
           </table>
           );
  },

   createGridRow: function(row)
   {
       var columns = _.keys(this.props.columnModel);
       var labels = _.values(this.props.columnModel);
       var onRowClick = this.props.onRowClick;
       var gridRow;
       if(window.innerWidth > 700)
       {
            gridRow = <GridRow key={row.id} rowId={row.id} data={row} columns={columns} onRowClick={onRowClick}/>;
       }
       else
       {
            gridRow = <SingleCellRow key={row.id} rowId={row.id} data={row} columns={columns} labels={labels} />;
       }
       return gridRow;
   }
});

module.exports = GridPanel;

