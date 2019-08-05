import React from "react";
import './styles.css';
const IFrame = props => {
  const { link } = props;
  return (
    <div className="iframediv">
      <iframe src={link} width="100%" height="600px" background-color="white"/>
    </div>
  );
};

export default IFrame;
