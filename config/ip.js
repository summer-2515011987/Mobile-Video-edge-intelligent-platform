const config = require("../static/config.json");
const createConfig = require("../src/utils/requestManage/service");
module.exports = createConfig(config);
