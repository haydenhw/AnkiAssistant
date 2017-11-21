import React from 'react';
import PropTypes from 'prop-types';

export default function LandingPageCard(props) {
  const { className, content, icon, title } = props;
  return (
    <div className={className}>
      <div className="card-icon-frame">
        <img src={icon} alt="info card icon" />
      </div>
      <h1 className>{title}</h1>
      <p className>{content}</p>
    </div>
  );
}

LandingPageCard.propTypes = {
  className: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
