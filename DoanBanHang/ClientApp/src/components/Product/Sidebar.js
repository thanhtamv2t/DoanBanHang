import React from 'react';
import { connect } from 'react-redux';
import { Tree } from 'antd';
import { Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
const { TreeNode } = Tree;
class Sidebar extends React.Component {
  onSelectHandle = selected => {
    console.log(selected);
    this.props.history.push(`/categories/${selected}`);
  };

  renderTree = node => {
    if (this.props.categories){
      return this.props.categories.map(cat => {
        return (
          <TreeNode key={cat.catalog_id} title={cat.catalog_name} />
        )
      })
    }
  };

  render() {
    return (
      <React.Fragment>
        <Header>Categories</Header>
        <Tree
          defaultSelectedKeys={[this.props.match.params.slug]}
          onSelect={this.onSelectHandle}
          selectedKeys={[this.props.match.params.slug]}
        >
          {this.renderTree()}
        </Tree>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ categories: state.categories.categories });

export default connect(mapStateToProps)(withRouter(Sidebar));
