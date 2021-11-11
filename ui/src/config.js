const dev = {
  API_URL: 'http://localhost:3000',
};

const prod = {
  API_URL: 'http://localhost:3000',
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;
