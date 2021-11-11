import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const WelcomeTitle = ({ username }) => {
  const [sentence, setSentence] = useState('');

  useEffect(() => {
    const today = new Date();
    const curHr = today.getHours();
    if (curHr < 12) {
      setSentence('Good morning, ');
    } else if (curHr < 18) {
      setSentence('Good afternoon, ');
    } else {
      setSentence('Good evening, ');
    }
  }, []);

  return (
    <Typography variant="h4">{`${sentence} ${username}`}</Typography>
  );
};

WelcomeTitle.propTypes = {
  username: PropTypes.string.isRequired,
};

export default WelcomeTitle;
