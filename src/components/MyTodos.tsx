import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const MyTodos: FC = () => {
  return (
    <div>
      <h5>MyTodos</h5>
      <Row>
        <Col xs={12} md={4} lg={3}>
          <Card
            bg='light'
            key='light'
            text={'light'.toLowerCase() === 'light' ? 'dark' : 'white'}
            className='mb-2'
          >
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant='primary' size='sm' className=''>
                Edit
              </Button>
              <Button variant='primary' size='sm' className='pull-right'>
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MyTodos;
