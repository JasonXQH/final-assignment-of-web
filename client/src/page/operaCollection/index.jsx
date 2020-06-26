import React from "react";
import {
  Table,
  Input,
  Button,
  Select,
  Pagination,
  Form,
  message,
  Icon,
  Tooltip,
  Modal,
} from "antd";
import Layout from "../components/layout";
import "./style.scss";
import Api from "../../js/Api";
import Util from "../../js/Util";
import { connect } from "react-redux";
import { createHashHistory } from "history";
const { confirm } = Modal;
const history = createHashHistory();

class OperaCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      current: 1,
      total: 10,
      label: [
        {
          label: "剧集名字",
          value: "title",
        },
        {
          label: "国家",
          value: "country",
        },
        {
          label: "演员",
          value: "actors",
        },
        {
          label: "类型",
          value: "type",
        },
        {
          label: "信息",
          value: "single",
        },
      ],
    };
  }
  componentDidMount() {
    this.initTableData();
  }
  initTableData(current, params) {
    const token = Util.getToken();
    Api.get(`/operas/Collectionlist?page=${current}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (res.data) {
        this.setState({
          list: res.data.data,
          total: res.data.total,
        });
      }
    });
  }

  onChange = (page) => {
    const token = Util.getToken();
    Api.get(`/operas/Collectionlist?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (res.data) {
        this.setState({
          list: res.data.data,
          total: res.data.total,
          current: page,
        });
      }
    });
  };

  deleteOperafromCollection = (item) => {
    const _this = this;
    confirm({
      title: "Are you sure delete?",
      content: "Hope you know what you are doing！",
      okText: "confirm",
      okType: "danger",
      cancelText: "cancel",
      onOk() {
        const token = Util.getToken();
        Api.post(`/operas/${item._id}/deletefromCollection`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            console.log(res);
            if (res.data) {
              message.success("delete success");
              _this.initTableData();
            } else {
              message.error("fail");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  goBack() {
    history.push("/operas");
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { list, total, current, label, type } = this.state;

    return (
      <div>
        <Layout>
          <h1 className="title">我的收藏</h1>
          <Button
              size="default"
              type="danger"
              onClick={() => this.goBack()}
              style={{ marginLeft: "10px" }}
            >
              返回
            </Button>
          <div>
            <div style={{ display: "flex" }}></div>
            <Table
              bordered
              dataSource={list}
              rowKey={(row) => row._id}
              pagination={false}
              columns={[
                {
                  title: "剧集名字",
                  dataIndex: "title",
                  key: "title",
                  align: "center",
                  width: 150,
                },
                {
                  title: "演员",
                  dataIndex: "actors",
                  key: "actors",
                  align: "center",
                  width: 600,
                },
                {
                  title: "国家",
                  dataIndex: "country",
                  key: "country",
                  align: "center",
                  width: 70,
                },
                {
                  title: "类型",
                  dataIndex: "type",
                  key: "type",
                  align: "center",
                  width: 150,
                },
                {
                  title: "信息",
                  dataIndex: "single",
                  key: "single",
                  align: "center",
                  width: 150,
                },
                {
                  title: "首播时间",
                  dataIndex: "first_date",
                  key: "first_date",
                  align: "center",
                  width: 150,
                },
                {
                  title: "delete",
                  key: "delete",
                  align: "center",
                  width: 100,
                  render: (row, item) => (
                    <div className="person-table-btn">
                      <Tooltip placement="top" title={"delete"}>
                        <Icon
                          type="delete"
                          theme="twoTone"
                          twoToneColor="#eb2f96"
                          className="table-btn-item"
                          onClick={() => this.deleteOperafromCollection(item)}
                        />
                      </Tooltip>
                    </div>
                  ),
                },
              ]}
            />
            <Pagination
              style={{ marginTop: "20px" }}
              defaultPageSize={10}
              current={current}
              onChange={this.onChange}
              total={total}
            />
          </div>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData.data,
  };
};

const wrappedOperasForm = Form.create({ name: "OperaCollection" })(
  OperaCollection
);

export default connect(mapStateToProps, null)(wrappedOperasForm);
