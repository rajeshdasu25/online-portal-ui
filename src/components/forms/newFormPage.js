import React from 'react'
import { connect } from 'react-redux';
import { fetchAllCertificates } from '../../actions/certificates';
import NewForm from './newForm';

class FormSubmitPage extends React.Component {
    submit = formValues => { 
        this.props.addNewCertificate(formValues);
    }

    componentDidMount() {
        this.props.fetchAllCertificates();
    }

    render() {
        return <NewForm onSubmit={this.submit} {...this.props} />
    }
}

const mapStateToProps = state => {
    return {
        certificates: state.certificates
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCertificates: () => dispatch(fetchAllCertificates()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormSubmitPage);