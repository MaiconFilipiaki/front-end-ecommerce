import React, {FormEvent, useEffect, useState} from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button, Row, Col } from 'react-bootstrap'

import API from './config/API'


import Card from './components/card';
import Product from './interfaces/Product';

function App() {
  const [products, setProducts] = useState([] as Product[][])
  const [search, setSearch] = useState('');

  const brokenArray = (array: Product[]) => {
    const newArray = [];
    while (array.length > 0){
      newArray.push(array.splice(0, 5));
    }
    return newArray;
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await API.get('shopping-service/product');
      setProducts(brokenArray(response.data));
    }
    fetch();
  }, [])

  const onSearch = async (event: FormEvent) => {
    event.preventDefault();
    if (search !== '') {
      const response = await API.get(`shopping-service/product/search/${search}`);
      setProducts(brokenArray(response.data))
      return;
    }
    const response = await API.get('shopping-service/product');
    setProducts(brokenArray(response.data));
  }

  return (
    <Container fluid>
      <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
        <Navbar.Brand href="#home">MdfShopping</Navbar.Brand>
        {/* <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav> */}
        <Form inline onSubmit={e => onSearch(e)}>
          <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={search}
              onChange={e => setSearch(e.target.value)}
          />
          <Button type="submit" variant="outline-info">Search</Button>
        </Form>
      </Navbar>
      {products && products.map((i: Product[], indexF: number) => {
        if (i.length > 0) {
          return (
            <Row className="d-flex justify-content-center" key={indexF.toString()}>
              {i.map((e: Product, index: number) => (
                <Col className="d-flex justify-content-center">
                  <Card
                      description={e.description}
                      id={e.id} key={index.toString()}
                      descriptionComplete={e.descriptionComplete}
                      price={e.price}
                  />
                </Col>
              ))}
            </Row>
          )
        }
      })}
    </Container>
  );
}

export default App;
