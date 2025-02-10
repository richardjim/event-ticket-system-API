const port = process.env.NODE_ENV === "test" ? process.env.TEST_PORT : process.env.PORT;

module.exports = {
  port,
};