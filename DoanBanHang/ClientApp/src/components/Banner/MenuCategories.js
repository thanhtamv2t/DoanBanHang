import React from 'react';
import { Icon, Dropdown, Placeholder } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class MenuCategory extends React.Component {
  renderCategories = () => {
    if (this.props.categories)
      return this.props.categories.map(({ catalog_id, catalog_name}) => (
        <Dropdown.Item key={catalog_id} as={Link} to={`/categories/${catalog_id}`}>
          {catalog_name}
        </Dropdown.Item>
      ));
    return (
      <Dropdown.Item>
        <Placeholder>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      </Dropdown.Item>
    );
  };

  render() {
    return (
      <Dropdown
        item
        text={
          <React.Fragment>
            <Icon name="bars" /> Danh mục
          </React.Fragment>
        }
        className="categoryBox"
      >
        <Dropdown.Menu>
          <React.Fragment>{this.renderCategories()}</React.Fragment>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.categories };
};

export default connect(mapStateToProps)(MenuCategory);
