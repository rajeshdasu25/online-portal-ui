import React from 'react';
import { Modal } from 'react-bootstrap';

function ModalPopup(props) {
    return (
        <Modal size={props.size} centered show={props.show} onHide={props.handleHideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
        </Modal>
    )
};

export default ModalPopup;