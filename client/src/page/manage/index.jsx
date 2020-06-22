import React from 'react';
import { Tabs } from 'antd';
import Layout from '../components/layout';
import UsersManage from './users';

const { TabPane } = Tabs;

class ManageTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Layout>
        <Tabs defaultActiveKey="1">
          <TabPane tab="user management" key="1">
            <UsersManage key="user" />
          </TabPane>
        </Tabs>
      </Layout>
    );
  }
}

export default ManageTab;
