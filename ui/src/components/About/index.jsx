import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uiActions from '../../redux/actions/uiActions';

const About = ({
  changePageTitle,
}) => {
  const [aboutData, setaboutData] = useState({
    client: { host: '' },
    server: { current_time: 0 },
    services: [],
  });

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    setaboutData({
      ...aboutData,
      client: { host: res.data.IPv4 },
      server: { current_time: Math.floor(new Date() / 1000) },
      services: [],
    });
  };

  useEffect(() => {
    getData();
    changePageTitle('About');
  }, []);
  return (
    <div>
      <pre>
        {JSON.stringify(aboutData, null, 2)}
      </pre>
    </div>
  );
};

About.propTypes = {
  changePageTitle: PropTypes.func.isRequired,
};

function mapState(state) {
  const { username } = state.user.userData;
  return {
    username,
  };
}

const actionCreators = {
  changePageTitle: uiActions.changePageTitle,
};

export default connect(mapState, actionCreators)(About);
