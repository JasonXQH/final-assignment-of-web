import React from "react";
import { connect } from "react-redux";
import { createHashHistory } from "history";
import "./style.scss";
import { Icon, Dropdown, Menu } from "antd";
import Util from "../../../js/Util";
const history = createHashHistory();
const { Fragment } = React;

class CommonHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      name: "",
    };
  }
  componentDidMount() {}
  goSign(type) {
    history.push(`/${type}`);
  }
  goHome() {
    history.push("/");
  }
  logout() {
    Util.setToken("");
    window.location.reload("/");
  }
  goManage() {
    history.push("/manage");
  }

  goTarget(target) {
    history.push(`/${target}`);
  }
  render() {
    const { userData } = this.props;
    const { name, isLogin } = userData;
    const menu = (
      <Menu>
        <Menu.Item key="0" onClick={() => this.logout()}>
          退出
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="header-nav">
        <div className="home-logo">
          <div className="logo-text" onClick={() => this.goHome()}>
            电影
          </div>
          <div className="tab-bar">
            {name === "admin" ? (
              <div className="bar-item" onClick={() => this.goManage()}>
                用户管理
              </div>
            ) : null}
            {isLogin && (
              <div style={{ display: "flex" }}>
                <div
                  className="bar-item"
                  onClick={() => this.goTarget("douban")}
                >
                  豆瓣Top250
                </div>
                <div
                  className="bar-item"
                  onClick={() => this.goTarget("maoyan")}
                >
                  猫眼Top100
                </div>
                <div
                  className="bar-item"
                  onClick={() => this.goTarget("operas")}
                >
                  剧集
                </div>
                <div
                  className="bar-item"
                  onClick={() => this.goTarget("taobao")}
                >
                  淘宝咖啡
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="nav-right">
          <div className="mine">
            {!isLogin ? (
              <Fragment>
                <div className="sign" onClick={() => this.goSign("login")}>
                  登录
                </div>
                <div className="split-line">|</div>
                <div className="sign" onClick={() => this.goSign("register")}>
                  注册
                </div>
              </Fragment>
            ) : (
              <Dropdown overlay={menu}>
                <div className="icon-header">
                  <Icon
                    type="smile"
                    className="icon-mine icon"
                    theme="twoTone"
                  />
                  <span className="user-name">{name}</span>
                  <Icon type="caret-down" className="down icon" />
                </div>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData.data,
  };
};

export default connect(mapStateToProps, null)(CommonHeader);
