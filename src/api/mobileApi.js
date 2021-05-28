import request from "@/utils/request";

let BASEPATH = "/smartedge";
// let BASEPATH = "";

//登录
var loginPath = "/login";

// 边缘节点管理
var findNodeListPath = "/edgenode/find";
var addNodePath = "/edgenode/add";
var delNodePath = "/edgenode/del";
var editNodePath = "/edgenode/edit";
var nodeDetailPath = "/edgenode/info"; //边缘节点详情页面

// 应用列表展示
var findAppListPath = "/app/find";
var deployAppPath = "/app/deploy";
var undeployAppPath = "/app/undeploy";

// 下发任务
var findTaskListPath = "/task/find";
var addTaskPath = "/task/add";
var delTaskPath = "/task/del";
var startTaskPath = "/task/start";
var stopTaskPath = "/task/stop"; //中止

// 展示结果
var findResultListPath = "/result/task";
var findResultDetailPath = "/result/find";

// 视频源管理
var findVideolListPath = "/stream/find";
var addVideoPath = "/stream/add";
var delVideoPath = "/stream/del";
var editVideoPath = "/stream/edit";

//日志管理列表
var findLogListPath = "/log/find";

function login(data) {
  return request({
    url: BASEPATH + loginPath,
    method: "post",
    data: data,
  });
}
function findNodeList(data) {
  return request({
    url: BASEPATH + findNodeListPath,
    method: "post",
    data: data,
  });
}
function addNode(data) {
  return request({
    url: BASEPATH + addNodePath,
    method: "post",
    data: data,
  });
}
function delNode(data) {
  return request({
    url: BASEPATH + delNodePath,
    method: "post",
    data: data,
  });
}
function editNode(data) {
  return request({
    url: BASEPATH + editNodePath,
    method: "post",
    data: data,
  });
}
function nodeDetail(data) {
  return request({
    url: BASEPATH + nodeDetailPath,
    method: "post",
    data: data,
  });
}
function findAppList(data) {
  return request({
    url: BASEPATH + findAppListPath,
    method: "post",
    data: data,
  });
}
function deployApp(data) {
  return request({
    url: BASEPATH + deployAppPath,
    method: "post",
    data: data,
  });
}
function undeployApp(data) {
  return request({
    url: BASEPATH + undeployAppPath,
    method: "post",
    data: data,
  });
}
function findTaskList(data) {
  return request({
    url: BASEPATH + findTaskListPath,
    method: "post",
    data: data,
  });
}
function addTask(data) {
  return request({
    url: BASEPATH + addTaskPath,
    method: "post",
    data: data,
  });
}
function delTask(data) {
  return request({
    url: BASEPATH + delTaskPath,
    method: "post",
    data: data,
  });
}
function startTask(data) {
  return request({
    url: BASEPATH + startTaskPath,
    method: "post",
    data: data,
  });
}
function stopTask(data) {
  return request({
    url: BASEPATH + stopTaskPath,
    method: "post",
    data: data,
  });
}
function findResultList(data) {
  return request({
    url: BASEPATH + findResultListPath,
    method: "post",
    data: data,
  });
}
function findResultDetail(data) {
  return request({
    url: BASEPATH + findResultDetailPath,
    method: "post",
    data: data,
  });
}
function findVideolList(data) {
  return request({
    url: BASEPATH + findVideolListPath,
    method: "post",
    data: data,
  });
}
function addVideo(data) {
  return request({
    url: BASEPATH + addVideoPath,
    method: "post",
    data: data,
  });
}
function delVideo(data) {
  return request({
    url: BASEPATH + delVideoPath,
    method: "post",
    data: data,
  });
}
function editVideo(data) {
  return request({
    url: BASEPATH + editVideoPath,
    method: "post",
    data: data,
  });
}
function findLogList(data) {
  return request({
    url: BASEPATH + findLogListPath,
    method: "post",
    data: data,
  });
}
var service = {
  login,
  findNodeList,
  addNode,
  delNode,
  editNode,
  nodeDetail,
  findAppList,
  deployApp,
  undeployApp,
  findTaskList,
  addTask,
  delTask,
  startTask,
  stopTask,
  findResultList,
  findResultDetail,
  findVideolList,
  addVideo,
  delVideo,
  editVideo,
  findLogList,
};

export default service;
