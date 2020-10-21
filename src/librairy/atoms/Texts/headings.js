import PropTypes from "prop-types";
export const H1 = ({ children }) => {
  return <h1>{children}</h1>;
};

H1.propTypes = {
  children: PropTypes.any
}

export const H2 = ({ children }) => {
  return <h2>{children}</h2>;
};

H2.propTypes = {
  children: PropTypes.any
}

export const H3 = ({ children, id = null }) => {
  return <h3 id={id}>{children}</h3>;
};

H3.propTypes = {
  children: PropTypes.any
}

export const H4 = ({ children, id = null }) => {
  return <h4 id={id}>{children}</h4>;
};

H4.propTypes = {
  children: PropTypes.any
}

export const Subtitle = ({ children }) => {
  return <p className='subtitle'>{children}</p>;
};

Subtitle.propTypes = {
  children: PropTypes.any
}