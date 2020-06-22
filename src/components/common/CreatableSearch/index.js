import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';
// import { colourOptions } from '../data';

export default class CreatableSearch extends Component {
    handleChange = (newValue, actionMeta) => {
        // console.group('Value Changed');
        // console.log(newValue);
        // console.log(`action: ${actionMeta.action}`);
        // console.groupEnd();
    };
    handleInputChange = (inputValue, actionMeta) => {
        // console.group('Input Changed');
        // console.log(inputValue);
        // console.log(`action: ${actionMeta.action}`);
        // console.groupEnd();
    };
    render() {
        const data = [
            {
                value: 1,
                label: "cerulean"
            },
            {
                value: 2,
                label: "fuchsia rose"
            },
            {
                value: 3,
                label: "true red"
            },
            {
                value: 4,
                label: "aqua sky"
            },
            {
                value: 5,
                label: "tigerlily"
            },
            {
                value: 6,
                label: "blue turquoise"
            }
        ];
        const { input, tableData } = this.props; //console.log('tableData: ', tableData);
        return (
            <CreatableSelect {...input} 
                isClearable
                onChange={this.handleChange}
                onInputChange={this.handleInputChange}
                options={data}
            />
        );
    }
}