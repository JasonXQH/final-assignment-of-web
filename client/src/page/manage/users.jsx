import React from 'react';
import { Table, Icon, Tooltip, message, Modal } from 'antd';
import Util from '../../js/Util';
import Api from '../../js/Api';
import './style.scss';
const { confirm } = Modal;

class UsersManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userListData: [],
    };
  }

  componentDidMount() {
    this.getUserList();
  }

  getUserList() {
    const token = Util.getToken();
    Api.get('/users/list', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (res.data) {
        this.setState({
          userListData: res.data.data,
        });
      }
    });
  }

  // 删除
  deleteUser = (item) => {
    const _this = this;
    confirm({
      title: 'Are you sure delete?',
      content: 'Hope you know what you are doing！',
      okText: 'confirm',
      okType: 'danger',
      cancelText: 'cancel',
      onOk() {
        const token = Util.getToken();
        const postUrl = `/users/${item._id}/delete`;
        Api.post(
          postUrl,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
          .then((res) => {
            console.log(res);
            if (res.data) {
              message.success('delete success');
              _this.getUserList();
            } else {
              message.error('fail');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  render() {
    const { userListData } = this.state;
    return (
      <div>
        <Table
          bordered
          dataSource={userListData}
          rowKey={(row) => row._id}
          columns={[
            {
              title: 'id',
              dataIndex: '_id',
              key: '_id',
              align: 'center',
            },
            {
              title: 'name',
              dataIndex: 'name',
              key: 'name',
              align: 'center',
            },
            {
              title: 'auth',
              dataIndex: 'auth',
              key: 'auth',
              align: 'center',
            },
            {
              title: 'handle',
              key: 'handle',
              align: 'center',
              render: (row, item) => (
                <div className="person-table-btn">
                  {item.name !== 'admin' ? (
                    <Tooltip placement="top" title={'delete'}>
                      <Icon
                        type="delete"
                        theme="twoTone"
                        twoToneColor="#eb2f96"
                        className="table-btn-item"
                        onClick={() => this.deleteUser(item)}
                      />
                    </Tooltip>
                  ) : (
                    '--'
                  )}
                </div>
              ),
            },
          ]}
        />
      </div>
    );
  }
}
export default UsersManage;
