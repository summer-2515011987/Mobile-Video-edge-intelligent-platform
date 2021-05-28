<script>

  /** 开发调试(仿真登录) */
  const isDebug = true;
  const isTest = true;
  let basePath = "http://127.0.0.1:8081";
  if(isTest){
    basePath = "http://127.0.0.1:8081";
  }
  // 连接超时事件 1 分钟
  let connectionTimeout = 6000;

  export default {
    isDebug,isTest,basePath,connectionTimeout
  }
</script>
