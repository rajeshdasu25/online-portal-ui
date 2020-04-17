import React from 'react';

function WidgetInfo(props) {
    const theme = props.theme ? props.theme : 'blue';

    return (
        <div className={`widget-info ${theme}`}>
            <div className="widget-info-icon"><i className="glyphicon glyphicon-user" aria-hidden="true"></i></div>
            <div className="widget-info-count"><h1>{props.count}</h1></div>
            <div className="widget-info-text"><span>{props.text}</span></div>
        </div>
    )
};

export default WidgetInfo;