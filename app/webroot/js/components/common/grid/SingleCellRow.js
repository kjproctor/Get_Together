/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');
var SingleCellRow = React.createClass({
    getDefaultProps: function ()
    {
        return {
                 data: [],
                 columns: [],
                 labels: [],
                 rowId: null,
                 onRowClick:null
               }
    },

    render: function()
    {
        var cell = this.createCell();
        return (<tr className="standard-row" onClick={this.onClick}>{cell}</tr>);
    },

    createCell: function()
    {
        var row = this.props.data;
        var columns = this.props.columns;
        var labels = this.props.labels;
        var items = [];
        for(var i=0; i<columns.length; i++)
        {
            if(columns[i].indexOf(".") > -1)
            {
                var subObjectName = this.getSubObjectName(columns[i]);
                var subObjectValue = this.getSubObjectValue(columns[i]);
                items.push(<li><strong>{labels[i]}:</strong> {row[subObjectName][subObjectValue]}</li>);

            }
            else
            {
                items.push(<li><strong>{labels[i]}:</strong> {row[columns[i]]}</li>);
            }
        }
        return (
            <td>
                <ul>
                    {items}
                </ul>
            </td>);
    },

    getSubObjectName: function(object)
    {
        return object.split(".")[0];
    },

    getSubObjectValue: function(object)
    {
        return object.split(".")[1];
    },

    onClick: function()
    {
        if (!_.isNull(this.props.onRowClick))
        {
            this.props.onRowClick(this.props.rowId);
        }
    }
});

module.exports = SingleCellRow;