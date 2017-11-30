import React from 'react';
import PropTypes from 'prop-types';

export default function LandingPageCard(props) {
  const { content, iconClassName, infoType, title } = props;
  return (
    <div className="landing-card">
      <div>
        <span className={`${infoType} ${iconClassName}`}></span>
      </div>
      <h1 className={`landing-card-title ${infoType}`}>{title}</h1>
      <p className="landing-card-text">{content}</p>
    </div>
  );
}

LandingPageCard.propTypes = {
  iconClassName: PropTypes.string.isRequired,
  infoType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
