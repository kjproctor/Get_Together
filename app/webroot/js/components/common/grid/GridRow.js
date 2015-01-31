/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');
var GridRow = React.createClass({
    getDefaultProps: function ()
    {
        return {
                 data: [],
                 columns: [],
                 rowId: null,
                 onRowClick:null
               }
    },

    render: function()
    {
        var row = this.props.data;
        var columns = this.props.columns;
        var gridColumns = [];
        for(var i=0; i<columns.length; i++)
        {
            var uniqueKey;
            if(row[columns[i]])
            {
                uniqueKey = row[columns[i]]+Math.random()*2+Math.random();
            }
            else
            {
               uniqueKey = "null_grid_column"+Math.random()*2+Math.random();
            }
            if(columns[i].indexOf(".") > -1)
            {
                var subObjectName = this.getSubObjectName(columns[i]);
                var subObjectValue = this.getSubObjectValue(columns[i]);
                gridColumns.push(<td key={uniqueKey}>{row[subObjectName][subObjectValue]}</td>);
            }
            else
            {
                gridColumns.push(<td key={uniqueKey}>{row[columns[i]]}</td>);
            }
        }

        return (<tr className="standard-row" onClick={this.onClick}>{gridColumns}</tr>);
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

module.exports = GridRow;

