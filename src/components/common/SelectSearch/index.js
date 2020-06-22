import React, { Component } from 'react';
import Select from 'react-select';

class SelectSearch extends Component {
    state = {
        selectedOption: null
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        // console.log(`Option selected:`, selectedOption);
    }

    render() {
        /*const { input, data, meta, label, placeholder, isClearable, defaultClientValues } = this.props;
        let deepCloneObj;

        if (data) {
            deepCloneObj = JSON.parse(JSON.stringify(data));
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
                    onChange={option => {console.log('option: ', option); return input.onChange(option.value)}}
                    onBlur={input.onFocus(input.value)} />
                {meta.touched && (meta.eror && <span className="error">{meta.error}</span>)}
            </div>
        );*/
        const customStyles = {
            option: (provided, state) => ({
                ...provided,
                borderBottom: '1px dotted pink',
                color: state.isSelected ? 'red' : 'blue',
                padding: 20,
            }),
            control: () => ({
                // none of react-select's styles are passed to <Control />
                width: 200,
            }),
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition };
            }
        }
        const jsonData = [
            { value: 1, label: "cerulean" },
            { value: 2, label: "fuchsia rose" },
            { value: 3, label: "true red" },
            { value: 4, label: "aqua sky" },
            { value: 5, label: "tigerlily" },
            { value: 6, label: "blue turquoise" }
        ];
        const { input, data, placeholder } = this.props;
        const { selectedOption } = this.state;
        let deepCloneObj;
        deepCloneObj = data && JSON.parse(JSON.stringify(data));

        return (
            <div className="form-group">
                <Select className="CertificationsList" {...input} placeholder={placeholder}
                    options={jsonData}
                    onChange={this.handleChange}
                    // autoFocus={true}
                    value={selectedOption}
                    // styles={customStyles}
                    // getOptionLabel={option => option}
                    // getOptionValue={option => option}
                />
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