<template>
  <Layout>
    <div class="home-h5">
      <Segmented class="segment" />
      <div class="btn-panel">
        <Button class="home-btn" @click="goCall">
          <Icon :src="CallSrc" />
          {{ t('1v1 Call') }}
        </Button>
        <Button class="home-btn" @click="goGroupCall">
          <Icon :src="GroupCallSrc" />
          {{ t('Group Call') }}
        </Button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts" setup>
import { useLanguage, useMyRouter } from '../../../hooks';
import { defineEmits } from 'vue';
import Layout from '../../../components/Layout/Layout.vue';
import Button from '../../../components/common/Button/Button.vue';
import Icon from '../../../components/common/Icon/Icon.vue';
import Segmented from '../../../components/common/Segmented/Segmented.vue';
import CallSrc from '../../../assets/Home/h5-call.svg';
import GroupCallSrc from '../../../assets/Home/h5-groupcall.svg';

const { t } = useLanguage();
const { navigate } = useMyRouter();
const emit = defineEmits(['show-dialog']);

const goCall = () => {
  if(!sessionStorage.getItem("SDKAppID") || !sessionStorage.getItem("SDKSecretKey")) {
    emit('show-dialog')
    return 
  }
  navigate('/call');
}
const goGroupCall = () => {
  if(!sessionStorage.getItem("SDKAppID") || !sessionStorage.getItem("SDKSecretKey")) {
    emit('show-dialog')
    return 
  }
  navigate('/groupCall');
}

</script>


<style lang="scss" scoped>
@import './Home.scss';

</style>