<template>
    <div id="index">
        <a-card>
            <a-button type="primary" @click="goFunctionalPage">函数式组件</a-button>
        </a-card>
    </div>
</template>
<script>
export default {
    name: 'index',
    methods: {
        goFunctionalPage() {
            this.$router.push('/functional-page');
        }
    }
};
</script>
<style lang="less">
#index {
    padding: 50px;
}
</style>
