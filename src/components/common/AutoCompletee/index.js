import React from 'react';
import { Field } from 'redux-form';
import Autocomplete from 'react-autocomplete';
import { fakeCategorizedRequest } from './utils';
// import './style.css';

export default class AutoCompleteText extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            unitedStates: [],
            loading: false
        }
        this.requestTimer = null
    }

    render() {
        const { FieldId, FieldName } = this.props;
        return (
            <div id={FieldId}>
                <Autocomplete
                    inputProps={{ id: FieldName, name: FieldName, className: 'form-control' }}
                    value={this.state.value}
                    items={this.state.unitedStates}
                    getItemValue={(item) => item.name}
                    onSelect={(value, state) => this.setState({ value, unitedStates: [state] })}
                    onChange={(event, value) => {
                        this.setState({ value, loading: true, unitedStates: [] })
                        clearTimeout(this.requestTimer)
                        this.requestTimer = fakeCategorizedRequest(value, (items) => {
                            this.setState({ unitedStates: items, loading: false })
                        })
                    }}
                    renderItem={(item, isHighlighted) => (
                        item.header ?
                            <div
                                className="item item-header"
                                key={item.header}
                            >{item.header}</div>
                            : <div
                                className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                                key={item.abbr}
                            >{item.name}</div>
                    )}
                    renderMenu={(items, value) => (
                        <div className="menu">
                            {value === '' ? (
                                <div className="item">Type of the name of a United State</div>
                            ) : this.state.loading ? (
                                <div className="item">Loading...</div>
                            ) : items.length === 0 ? (
                                <div className="item">No matches for {value}</div>
                            ) : items}
                        </div>
                    )}
                    isItemSelectable={(item) => !item.header}
                />
            </div>
        );
    }

}