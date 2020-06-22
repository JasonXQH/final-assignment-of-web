import React from "react";
import { Table, Input, Button, Select, Pagination, Form, message } from "antd";
import Layout from "../components/layout";
import "./style.scss";
import Api from "../../js/Api";
import Util from "../../js/Util";
import { connect } from "react-redux";

const { Option } = Select;

class TaoBao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: null,
      list: [],
      current: 1,
      total: 10,
      label: [
        {
          label: "商品名称",
          value: "title",
        },
        {
          label: "店铺",
          value: "shop",
        },
        {
          label: "城市",
          value: "location",
        },
        {
          label: "价格",
          value: "price",
        },
        {
          label: "销量",
          value: "deal",
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
    Api.get(`/taobao/list?page=${current}&sort=${sort}`, {
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
    Api.get(`/taobao/list?page=${page}`, {
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
    const { sort } = this.state;
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
            Api.get(`/taobao/getList?${keyWords}&sort=${sort}`, {
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
            Api.get(`/taobao/getListOr?${keyWords}&sort=${sort}`, {
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
    this.state.sort = null;
    this.initTableData();
  }
  sort(type) {
    if (type == null) {
      this.setState(
        {
          sort: null,
        },
        () => {
          this.initTableData(null, type);
        }
      );
    } else {
      this.setState(
        {
          sort: type,
        },
        () => {
          this.initTableData(null, type);
        }
      );
    }
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
              价格从高到低
            </Button>
            <Button
              type={sort === "reverse" ? "primary" : ""}
              onClick={() => this.sort("reverse")}
              style={{ marginRight: "10px" }}
            >
              价格从低到高
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
                  title: "商品名称",
                  dataIndex: "title",
                  key: "title",
                  align: "center",
                },
                {
                  title: "店铺",
                  dataIndex: "shop",
                  key: "shop",
                  align: "center",
                },
                {
                  title: "城市",
                  dataIndex: "location",
                  key: "location",
                  align: "center",
                },
                {
                  title: "价格",
                  dataIndex: "price",
                  key: "price",
                  align: "center",
                  width: 100,
                },
                {
                  title: "销量",
                  dataIndex: "deal",
                  key: "deal",
                  align: "center",
                  width: 200,
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

const wrappedTaoBaoForm = Form.create({ name: "TaoBao" })(TaoBao);

export default connect(mapStateToProps, null)(wrappedTaoBaoForm);
