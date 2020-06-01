import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        // <div className="container">
        //     <div className="row">
        //         <div className="col-md-12">
        //             <div className="error-template">
        //                 <h1>Oops!</h1>
        //                 <h2>404 Not Found</h2>
        //                 <div className="error-details">
        //                     Sorry, an error has occured, Requested page not found!
        //                 </div>
        //                 <div className="error-actions">
        //                     <Link to='/'><span className="glyphicon glyphicon-home"></span>Take Me Home</Link>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <Row>
            <Col md={12} sm={12} xs={12}>
                <Card style={{'height': '80vh'}}>
                    <Card.Body>
                        <div className="error-template">
                            <h1>Oops!</h1>
                            <Image src="404.png" fluid />
                            <h2>Page Not Found</h2>
                            {/* <div className="error-details">
                                Sorry, an error has occured, Requested page not found!
                            </div> */}
                            <div className="error-actions">
                                <Link to='/'><span className="glyphicon glyphicon-home"></span>Take Me Home</Link>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default NotFound;
