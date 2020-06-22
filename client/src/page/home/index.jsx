import React from 'react';
import Layout from '../components/layout';
import './style.scss';
import Api from '../../js/Api';
import Util from '../../js/Util';
import { connect } from 'react-redux';
import WordCloud from 'react-d3-cloud';

const fontSizeMapper = (word) => Math.log2(word.value) * 5;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.initTableData();
  }
  initTableData(current, params) {
    const token = Util.getToken();
    Api.get(`/douban/getAll`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (res.data) {
        const { data } = res.data || {};
        const result = [];
        data.forEach((element) => {
          result.push({ text: element.quote, value: parseInt(Math.random() * 100) });
        });
        this.setState({
          list: result,
        });
      }
    });
  }

  render() {
    const { list } = this.state;
    const { userData } = this.props;
    // const { name } = userData;
    return (
      <div>
        <Layout>
          <div className="word-cloud">
            <WordCloud width={1200} data={list} fontSizeMapper={fontSizeMapper} rotate={0} />
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

export default connect(mapStateToProps, null)(Home);
