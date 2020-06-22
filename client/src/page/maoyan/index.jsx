import React from "react";
import { Table, Input, Button, Select, Pagination, Form, message } from "antd";
import Layout from "../components/layout";
import "./style.scss";
import Api from "../../js/Api";
import Util from "../../js/Util";
import { connect } from "react-redux";

const { Option } = Select;

class MaoYan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      current: 1,
      total: 10,
      label: [
        {
          label: "电影名字",
          value: "title",
        },
        {
          label: "评分",
          value: "score",
        },
        {
          label: "演员",
          value: "actor",
        },
        {
          label: "上映时间",
          value: "time",
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
  initTableData(current, sort) {
    const token = Util.getToken();
    Api.get(`/maoyan/list?page=${current}&sort=${sort}`, {
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
    Api.get(`/maoyan/list?page=${page}`, {
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
            Api.get(`/maoyan/getList?${keyWords}`, {
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
            Api.get(`/maoyan/getListOr?${keyWords}`, {
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

  sort(type) {
    this.setState(
      {
        sort: type,
      },
      () => {
        this.initTableData(null, type);
      }
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { list, total, current, label, type, sort } = this.state;

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
              type={sort === "normal" ? "primary" : ""}
              style={{ marginRight: "10px" }}
              onClick={() => this.sort("normal")}
            >
              分数从高到低
            </Button>
            <Button
              type={sort === "reverse" ? "primary" : ""}
              style={{ marginRight: "10px" }}
              onClick={() => this.sort("reverse")}
            >
              分数从低到高
            </Button>
            <Button onClick={() => this.sort("undefined")}>重置</Button>
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
                  title: "电影名字",
                  dataIndex: "title",
                  key: "title",
                  align: "center",
                },
                {
                  title: "演员",
                  dataIndex: "actor",
                  key: "actor",
                  align: "center",
                  // width: 600,
                },
                {
                  title: "评分",
                  dataIndex: "score",
                  key: "score",
                  align: "center",
                },
                {
                  title: "上映时间",
                  dataIndex: "time",
                  key: "time",
                  align: "center",
                  render: (row, item) => (
                    <div>{((item || {}).time || "").slice(1)}</div>
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

const wrappedMaoYanForm = Form.create({ name: "MaoYan" })(MaoYan);

export default connect(mapStateToProps, null)(wrappedMaoYanForm);
