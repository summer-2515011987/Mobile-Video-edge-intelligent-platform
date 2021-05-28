import createConfig from "./service";
let { defaultIp } = createConfig(window.ipconfig);
const isProduction = process.env.NODE_ENV === "production";

// 接口报错处理
const tryErr = function({ err, apiName }) {
  return err;
};
