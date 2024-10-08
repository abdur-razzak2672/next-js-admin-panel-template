// import node module libraries
import { Row, Col } from 'react-bootstrap';

const PageHeading = props => {
  const { heading } = props;
  return (
    <Row>
      <Col lg={12} md={12} xs={12}>
         <div>
          <h3 className="mb-0 fw-bold">{heading}</h3>
        </div>
      </Col>
    </Row>
  )
}

export default PageHeading