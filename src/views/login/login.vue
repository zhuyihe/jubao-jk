<template>
<div class="login">
  <v-header></v-header>
  <mu-text-field v-model="value13" label="UserName" label-float help-text="用户名为6-12长度的字符" icon="account_circle"></mu-text-field><br/>
  <mu-text-field v-model="value14" label="Password" label-float error-text="请输入密码" icon="locked"></mu-text-field><br/>
</div>
 
</template>
<script>
export default {
  data () {
    return {
      value13: '',
      value14: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
  background: $white;
}
</style>


