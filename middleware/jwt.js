const jwt = require('jsonwebtoken');

const createJwt = (title) => {
  return jwt.sign({ title }, process.env.SECRET, {
    expiresIn: '2h',
  });
};

const tokenDecoder = (token) => {
  return jwt.decode(token);
};

const authenticateMiddleware = async (req, res, next) => {
  // {
  //     'Authorization': 'Bearer jdanasjdnas kdaskd'
  // }

  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob2xkZXIiOiJhbmVtb25lIiwiaWF0IjoxNjM1Mjc1OTAzLCJleHAiOjE2MzUyODMxMDN9.mUaIK_qLI39QV0Auj_UFGzm2FIDnGW23vRuTdHy-svs
  /**
   * split("ey") => [Bearer , JhbGc, Job2xk]
   * split(" ") => [Bearer, eyJhbGciOi..]
   * const [bearer, token] = auth.split(" ")
   * const [state, setState] = useState();
   * const state = useState()[0]
   */

  // if (req.session.activeUser === '')

  const auth = req.headers.authorization;
  const [bearer, token] = auth.split(' ');

  try {
    await jwt.verify(token, process.env.SECRET);
    return next();
  } catch (error) {
    return res.status(401).json('Unauthenticated access!');
  }
};

module.exports = {
  createJwt,
  authenticateMiddleware,
  tokenDecoder,
};