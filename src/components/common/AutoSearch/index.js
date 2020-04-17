import React from 'react';

export default class AutoSearchText extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            SearchQuery: '',
            SearchResults: []
        }
    }

    getInfo = () => {
        let items = this.props.data;
        const regex = new RegExp(`^${this.state.SearchQuery}`, 'i');
        let SearchSuggestions = items.sort().filter(v => {
            regex.test(v.certification_Name);
        });
        this.setState({
            SearchResults: SearchSuggestions
        })
    }

    handleInputChange = () => {
        this.setState({
            SearchQuery: this.search.value
        }, () => {
            this.getInfo();
        });
    }

    renderSuggestions = () => {
        const options = this.state.SearchResults.map(r => (
            <li key={r.id}>
                {r.name}
            </li>
        ))
        return <ul>{options}</ul>
    }

    render() {
        return (
            <div id="notebooks">
                <input placeholder="Search for..." ref={input => this.search = input} onChange={this.handleInputChange} />
                {this.renderSuggestions()}
            </div>
        );
    }

}