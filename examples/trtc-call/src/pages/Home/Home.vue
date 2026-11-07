<template>
  <HomePC @show-dialog="changeDialogVisible" v-if="!isH5" />
  <HomeH5 @show-dialog="changeDialogVisible" v-else/>
  <el-dialog
    v-model="dialogVisible"
    width="500px"
  >
    <el-input
      class="login-input"
      v-model="SDKAppID"
      :placeholder="placeholderSDKAppIdText"
      @input="handleInputSDKAppId"
      @keyup.enter="handleLogin"
    />
    <el-input
      class="login-input"
      v-model="SDKSecretKey"
      :placeholder="placeholderSDKSecretKeyText"
      @input="handleInputSDKSecretKey"
      @keyup.enter="handleLogin"
    />
    <el-alert class="tips" type="warning">
      The SDKAppID and SDKSecretKey can be found in the <a href="https://console.trtc.io/overview" target="_blank">TRTC console↗</a>. Please refer to the <a href="https://trtc.io/document/35166?platform=web&amp;product=conference#.E5.AE.A2.E6.88.B7.E7.AB.AF.E7.A4.BA.E4.BE.8B.E4.BB.A3.E7.A0.81.E8.AE.A1.E7.AE.97-UserSig">document</a> for how to obtain it.
    </el-alert>

    <div class="footer">
      <el-button type="primary" round @click="() => confirm()">Confirm</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, toRefs } from 'vue';
import { useLanguage } from '../../hooks/index';
import { useMyRouter, useUserInfo } from '../../hooks';
import useLogin from '../Login/useLogin';
import { isH5 } from '../../utils';
import HomePC from './PC/Home.vue';
import HomeH5 from './H5/Home.vue';
import { trim } from '../../utils';

const { navigate } = useMyRouter();
const userInfo = toRefs(useUserInfo());
const SDKAppID = ref('');
const SDKSecretKey = ref('');
const dialogVisible = ref(false);
const { t } = useLanguage();
const { login } = useLogin();

const placeholderSDKAppIdText = computed(() => {
  return t('Please enter the SDKAppId from the console');
})

const placeholderSDKSecretKeyText = computed(() => {
  return t('Please enter the SDKSecretKey from the console');
})

const changeDialogVisible = () => {
  dialogVisible.value = !dialogVisible.value
}

const handleInputSDKAppId = () => {
  SDKAppID.value = trim(SDKAppID.value);
}

const handleInputSDKSecretKey = () => {
  SDKSecretKey.value = trim(SDKSecretKey.value);
}

const confirm = async () => {
  sessionStorage.setItem('SDKAppID', SDKAppID.value);
  sessionStorage.setItem('SDKSecretKey', SDKSecretKey.value);
  try {
    await login();
    dialogVisible.value = false;
  } catch (error) {
    alert(error);
  }
}

const handleLogin = async () => {
  sessionStorage.setItem('SDKAppID', SDKAppID.value);
  sessionStorage.setItem('SDKSecretKey', SDKSecretKey.value);
}

onMounted(() => {
  if(!sessionStorage.getItem('userID')) {
    navigate('/login');
    return;
  }
  userInfo.currentPage.value = 'home';
})
</script>

<style lang="scss" scoped>
.login-input {
  width: 400px;
  height: 48px;
  padding: 12px 20px;
  margin-top: 18px;
  margin-left: 28px;

  display: flex;
  flex-direction: row;
  align-items: center;

  background: #F9FAFC;
  border: 1px solid #E7ECF6;
  border-radius: 8px;
}

.tips {
  margin-top: 24px;
  width: 400px;
  margin-left: 28px;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px;

  .el-button {
    width: 200px;
    background-color: #1c66e5;
  }
}
</style>
