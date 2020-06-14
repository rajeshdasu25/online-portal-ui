import React, { Component } from 'react';
import Select from 'react-select';

class SelectSearch extends Component {
    render() {
        const { input, tableData, meta, /*label,*/ placeholder, isClearable, defaultClientValues } = this.props;
        let deepCloneObj;

        if (tableData) {
            deepCloneObj = JSON.parse(JSON.stringify(tableData));
            deepCloneObj.map((row) => {
                row.value = row.Id;
                row.label = row.Name;
                delete (row.Name);
                delete (row.Value);
                delete (row.Id);
            });
        } else {
            deepCloneObj = JSON.parse(JSON.stringify(defaultClientValues));
        }

        return (
            <div className="form-group">
                <Select className="CertificationsList" {...input} placeholder={placeholder}
                    options={deepCloneObj} isClearable={isClearable}
                    onChange={value => {console.log('value: ', value); return input.onChange(value)}}
                    onBlur={input.onFocus(input.value)} />
                {meta.touched && (meta.eror && <span className="error">{meta.error}</span>)}
            </div>
        );
    }
}

SelectSearch.defaultProps = {
    defaultClientValues: [
        { value: "CB", label: "Consumer Bank" },
        { value: "GP", label: "GPCC" },
        { value: "LY", label: "LYFE" }
    ]
}

export default SelectSearch;