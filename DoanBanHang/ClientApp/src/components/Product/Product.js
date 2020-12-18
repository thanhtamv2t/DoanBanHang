import React from 'react';
import { Card, Image, Header, Placeholder } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';
import { moneyFormat } from '../../utils';

const Product = ({ data }) => {
  if (!data)
    return (
      <Card>
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
        <Card.Content>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length="very short" />
              <Placeholder.Line length="medium" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
      </Card>
    );

  return (
    <Card color="teal">
      <Image
        src={data.product_image}
        as={Link}
        to={`/products/${data.product_id}`}
      />
      <Card.Content as={Link} to={`/products/${data.product_id}`}>
        <Card.Header>{data.product_name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Header floated="left" color="teal" size="huge">
          <Header.Subheader className="overstrike" color="grey">
            {moneyFormat(data.product_price * 1.1)}
          </Header.Subheader>
          {moneyFormat(data.product_price)}
        </Header>
        <AddToCart product={data} />
      </Card.Content>
    </Card>
  );
};

export default Product;
