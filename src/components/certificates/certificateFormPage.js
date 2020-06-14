import React from 'react'
import { connect } from 'react-redux';
import { addNewCertificate } from '../../actions/certificates';
import CertificateForm from './certificateForm';

class CertificateFormPage extends React.Component {
    submit = formValues => {
        this.props.addNewCertificate(formValues);
    }

    render() {
        return <CertificateForm onSubmit={this.submit} {...this.props} />
    }
}

const mapStateToProps = state => {
    return {
        insertionError: state.insertionError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addNewCertificate: (params) => dispatch(addNewCertificate(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CertificateFormPage);