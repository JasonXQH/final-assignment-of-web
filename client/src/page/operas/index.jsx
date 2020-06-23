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
const { Option } = Select;

class Operas extends React.Component {
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
      type: [
        {
          label: "AND",
          value: "AND",
        },
        {
          label: "OR",
          value: "OR",
        },
      ],
    };
  }
  componentDidMount() {
    this.initTableData();
  }
  initTableData(current, params) {
    const token = Util.getToken();
    Api.get(`/operas/list?page=${current}`, {
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
    Api.get(`/operas/list?page=${page}`, {
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
  handleSubmit = (e) => {
    const token = Util.getToken();
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { label1, value1, type, label2, value2 } = values;
        if (label1 === label2) {
          message.error("两个查询字段不可重复！");
        } else {
          const keyWords = `${label1}=${value1}&${label2}=${value2}`;
          if (type === "AND") {
            Api.get(`/operas/getList?${keyWords}`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
              if (res.data) {
                this.setState({
                  list: res.data.data,
                  total: res.data.total,
                  current: 0,
                });
              }
            });
          } else {
            Api.get(`/operas/getListOr?${keyWords}`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
              if (res.data) {
                this.setState({
                  list: res.data.data,
                  total: res.data.total,
                  current: 0,
                });
              }
            });
          }
        }
      }
    });
  };
  reset() {
    this.props.form.resetFields();
    this.initTableData();
  }

  createForm() {
    history.push("/operas/create");
  }
  deleteOperas = (item) => {
    const _this = this;
    confirm({
      title: "Are you sure delete?",
      content: "Hope you know what you are doing！",
      okText: "confirm",
      okType: "danger",
      cancelText: "cancel",
      onOk() {
        const token = Util.getToken();
        Api.post( `/operas/${item._id}/delete`,{
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            console.log(res);
            if (res.data) {
              message.success("delete success");
              _this.getUserList();
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
  render() {
    const { getFieldDecorator } = this.props.form;
    const { list, total, current, label, type } = this.state;

    return (
      <div>
        <Layout>
          <div className="search">
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <Form.Item className="item">
                {getFieldDecorator("label1", {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <Select
                    placeholder="请选择查询的字段"
                    style={{ width: "200px" }}
                  >
                    {label.map((item) => (
                      <Option
                        value={item.value}
                        key={item.label}
                        label={item.label}
                      >
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item className="item">
                {getFieldDecorator("value1", {
                  rules: [{ required: true }],
                })(<Input size="default" />)}
              </Form.Item>
              <Form.Item className="item">
                {getFieldDecorator("type", {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <Select placeholder="查询类型" style={{ width: "150px" }}>
                    {type.map((item) => (
                      <Option
                        value={item.value}
                        key={item.label}
                        label={item.label}
                      >
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item className="item">
                {getFieldDecorator("label2", {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <Select
                    placeholder="请选择查询的字段"
                    style={{ width: "200px" }}
                  >
                    {label.map((item) => (
                      <Option
                        value={item.value}
                        key={item.label}
                        label={item.label}
                      >
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item className="item">
                {getFieldDecorator("value2", {
                  rules: [{ required: true }],
                })(<Input size="default" />)}
              </Form.Item>
              <Form.Item className="item">
                <Button size="default" type="primary" htmlType="submit">
                  查询
                </Button>
                <Button
                  size="default"
                  type="primary"
                  onClick={() => this.reset()}
                  style={{ marginLeft: "10px" }}
                >
                  重置
                </Button>
              </Form.Item>
            </Form>
            <Button
              size="default"
              type="primary"
              onClick={() => this.createForm()}
              style={{ marginLeft: "10px" }}
            >
              新建
            </Button>
          </div>

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
                  width: 100,
                },
                {
                  title: "类型",
                  dataIndex: "type",
                  key: "type",
                  align: "center",
                  width: 200,
                },
                {
                  title: "信息",
                  dataIndex: "single",
                  key: "single",
                  align: "center",
                },
                {
                  title: "首播时间",
                  dataIndex: "first_date",
                  key: "first_date",
                  align: "center",
                },
                {
                  title: "delete",
                  key: "delete",
                  align: "center",
                  render: (row, item) => (
                    <div className="person-table-btn">
                      {
                        <Tooltip placement="top" title={"delete"}>
                          <Icon
                            type="delete"
                            theme="twoTone"
                            twoToneColor="#eb2f96"
                            className="table-btn-item"
                            onClick={() => this.deleteOperas(item)}
                          />
                        </Tooltip>
                      }
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

const wrappedOperasForm = Form.create({ name: "Operas" })(Operas);

export default connect(mapStateToProps, null)(wrappedOperasForm);
