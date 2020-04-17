import React from 'react';

function CardBox(props) {
    const CardHeader = props.header ? props.header : 'Header';
    // const CardContent = props.content ? props.content : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ';

    return (
        <div className="card">
            <div className="card-header"><h5>{CardHeader}</h5></div>
            <div className="card-body">
                {props && props.title && <div className="card-title">{props.title}</div>}
                {props && props.content && <div className="card-content">{props.content}</div>}
            </div>
        </div>
    )
};

export default CardBox;