<template>
    <div>
        {{ errorMessage }}
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                errorMessage: "未找您要的内容[404]"
            }
        }
    }
</script>
