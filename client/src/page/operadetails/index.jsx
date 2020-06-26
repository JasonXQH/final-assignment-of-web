import React from "react";
import { connect } from "react-redux";
import { createHashHistory } from "history";
import { Form, Input, Button  } from "antd";
import Layout from "../components/layout";
import "./style.scss";
import Api from "../../js/Api";
const history = createHashHistory({ forceRefresh: true });

class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state = {
      _id: null,
      actors: null,
      country: null,
      first_date: null,
      now: null,
      other_name: null,
      single: null,
      station: null,
      title: null,
      type: null,
      url: null,
    };
  }

  async componentDidMount() {
    await this.populateOpera();
  }

  async populateOpera() {
    const operaname = this.props.match.params.id; //获取url参数
    const opera = Api.get(`/operas/${operaname}`);
    const details = (await opera).data;
    const infos = details.targetOpera[0];
    const {
      _id,
      actors,
      country,
      first_date,
      now,
      other_name,
      single,
      station,
      title,
      type,
      url,
    } = infos;
    this.setState({
      _id,
      actors,
      country,
      first_date,
      now,
      other_name,
      single,
      station,
      title,
      type,
      url,
    });
    // console.log(actors)
  }
  back() {
    history.push('/operas');
  }
  render() {
    const {
      _id,
      actors,
      country,
      first_date,
      now,
      other_name,
      single,
      station,
      title,
      type,
      url,
    } = this.state;
    console.log(actors);
    const { getFieldDecorator } = this.props.form;
    const { userData } = this.props;
    const { name, isLogin } = userData;
    const formItemLayout = {
      labelCol: { span: 50 },
      wrapperCol: { span: 60 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 22,
          offset: 2,
        },
      },
    };

    return (
      <Layout>
        <strong className="title">DetailedInformation</strong>
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          className="login-form"
        >
          <Form.Item label="剧集名字" className="item">
            <Input size="large" value={title} />
          </Form.Item>
          <Form.Item label="演员" className="item">
            <Input.TextArea rows={4} size="large" value={actors} />
          </Form.Item>
          <Form.Item label="国家" className="item">
            <Input size="large" value={country} />
          </Form.Item>
          <Form.Item label="类型" className="item">
            <Input size="large" value={type} />
          </Form.Item>
          <Form.Item label="单集片长" className="item">
            <Input size="large" value={single} />
          </Form.Item>
          <Form.Item label="首播时间" className="item">
            <Input size="large" value={first_date} />
          </Form.Item>
          <Form.Item label="更新至" className="item">
            <Input size="large" value={now} />
          </Form.Item>
          <Form.Item label="别名" className="item">
            <Input size="large" value={other_name} />
          </Form.Item>
          <Form.Item label="电视台" className="item">
            <Input size="large" value={station} />
          </Form.Item>
          <Form.Item label="url" className="item">
            <Input size="large" value={url} />
          </Form.Item>
          <Form.Item {...tailFormItemLayout} className="item">
            <Button
              size="large"
              type="primary"
              onClick={() => this.back()}
              className="login-form-button"
            >
              返回
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData.data,
  };
};

const wrappedMovieForm = Form.create({ name: "MovieForm" })(MovieForm);
export default connect(mapStateToProps, null)(wrappedMovieForm);
