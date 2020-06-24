import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createHashHistory } from 'history';
import { Form, Icon, Input, Button, message } from 'antd';
import Layout from '../components/layout';
import './style.scss';
import Api from '../../js/Api';
const history = createHashHistory({ forceRefresh: true });

class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Api.post('/operas/create', values)
          .then((res) => {
            if (res.data) {
              message.success('create successfully');
              history.push('/operas');
            }
          })
          .catch((err) => {
            console.log(err);
            message.error(err.message);
          });
      }
    });

  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userData } = this.props;
    const { name, isLogin } = userData;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
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
        <h1 className="title">快来创建最新的电视剧吧！</h1>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
          <Form.Item label="剧集名字" className="item">
            {getFieldDecorator('title', {
              rules: [{ required: true }],
            })(
              <Input
                size="large"
                placeholder="剧集名字"
              />,
            )}
          </Form.Item>
          <Form.Item label="演员" className="item">
            {getFieldDecorator('actors', {
              rules: [{ required: true }],
            })(
              <Input
                size="large"
                placeholder="演员"
              />,
            )}
          </Form.Item>
          <Form.Item label="国家" className="item">
            {getFieldDecorator('country', {
              rules: [{ required: true }],
            })(
              <Input
                size="large"
                placeholder="国家"
              />,
            )}
          </Form.Item>
          <Form.Item label="类型" className="item">
            {getFieldDecorator('type', {
              rules: [{ required: true }],
            })(
              <Input
                size="large"
                placeholder="类型:"
              />,
            )}
          </Form.Item>
          <Form.Item label="单集片长" className="item">
            {getFieldDecorator('single', {
              rules: [{ required: false }],
            })(
              <Input
                size="large"
                placeholder="单集片长:"
              />,
            )}
          </Form.Item>
          <Form.Item label="首播时间" className="item">
            {getFieldDecorator('first_date', {
              rules: [{ required: false }],
            })(
              <Input
                size="large"
                placeholder="首播时间:"
              />,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout} className="item">
            <Button size="large" type="primary" htmlType="submit" className="login-form-button">
              创建
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

const wrappedMovieForm = Form.create({ name: 'MovieForm' })(MovieForm);
export default connect(mapStateToProps, null)(wrappedMovieForm);
