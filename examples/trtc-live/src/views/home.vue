<template>
  <div style="display: flex; align-items:center; height: 100vh;">
  <pre-live-view
    :user-info="userInfo"
    :room-id="givenRoomId"
    :enable-scheduled-live="true"
    @on-create-room="handleCreateLive"
    @on-enter-room="handleEnterLive"
    @on-logout="handleLogOut"
    @on-update-user-name="handleUpdateUserName"
  ></pre-live-view>

  <t-dialog
    :header="false"
    body="这是对话框内容，对话框标题已被隐藏"
    confirmBtn="Save"
    cancelBtn="Cancel"
    :visible="show"
    :onClose="bodyClose"
    :onConfirm="bodyConfirm"
  >
    <div>
      <div style="margin-bottom: 5px;">SDKAppID</div>
      <t-input
        v-model="inputData.sdkAppId"
        placeholder="Please input SDKAppID"
      />
      <div style="margin-top: 18px; margin-bottom: 5px;"> SDKSecretKey</div>
      <t-input
        style="margin-bottom: 18px;"
        v-model="inputData.sdkSecretyKey"
        placeholder="Please input SDKSecretKey"
      />
    <t-alert theme="warning">
      <template #message> The SDKAppID and SDKSecretKey can be found in the <a href="https://console.trtc.io/overview" target="_blank">TRTC console↗</a>. Please refer to the <a href="https://trtc.io/document/35166?platform=web&product=conference#.E5.AE.A2.E6.88.B7.E7.AB.AF.E7.A4.BA.E4.BE.8B.E4.BB.A3.E7.A0.81.E8.AE.A1.E7.AE.97-UserSig">document</a> for how to obtain it.</template>
    </t-alert>
    </div>
  </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { TUIRoomType } from "@tencentcloud/tuiroom-engine-js";
import { PreLiveView, liveRoom, RoomEvent, LanguageOption, ThemeOption } from '@tencentcloud/livekit-web-vue3';
import router from '@/router';
import { getBasicInfo } from '@/config/basic-info-config';
import { useRoute } from 'vue-router';
import { Ref, ref, reactive, onMounted, onUnmounted } from 'vue';
import i18n from '../locales/index';
import { getLanguage, getTheme, safelyParse } from  '../utils/utils';

const route = useRoute();
const givenRoomId: Ref<string> = ref((route.query.roomId) as string);

const userInfo = reactive({
  userId: '',
  userName: '',
  avatarUrl: '',
  sdkAppId: '',
  sdkSecretKey: '',
});
const inputData = reactive({
  sdkAppId: '',
  sdkSecretyKey: '',
})
const show = ref(false)

function bodyClose() {
  show.value = false;
}

function bodyConfirm() {
  const { sdkAppId, sdkSecretyKey } = inputData;
  if (!sdkAppId || !sdkSecretyKey) {
    alert('Please input SDKAppID and SDKSecretKey');
    return;
  }
  sessionStorage.setItem('sdkAppId', sdkAppId)
  sessionStorage.setItem('sdkSecretKey', sdkSecretyKey)
  userInfo.sdkAppId = sdkAppId;
  userInfo.sdkSecretKey = sdkSecretyKey;
  let currentUserInfo = getBasicInfo(Number(sdkAppId), sdkSecretyKey);
  currentUserInfo && sessionStorage.setItem('tuiLive-userInfo', JSON.stringify(currentUserInfo));
  userInfo.userId = currentUserInfo?.userId || '';
  userInfo.userName = currentUserInfo?.userName || '';
  userInfo.avatarUrl = currentUserInfo?.avatarUrl || '';
  sessionStorage.setItem('tuiLive-userInfo', JSON.stringify({
    userId: userInfo.userId,
    userName: userInfo.userName,
    avatarUrl: userInfo.avatarUrl,
    sdkAppId,
    sdkSecretyKey,
    userSig: currentUserInfo?.userSig,
  }));
  show.value = false;
}

function setLiveRoomInfo(action: 'createLive', roomOption: Record<string, any>) {
  sessionStorage.setItem('tuiLive-roomInfo', JSON.stringify({
    action,
    ...roomOption,
  }));
}

async function checkLiveExistWhenCreateLive(roomId: string) {
  try {
    await liveRoom.getRoomEngine()?.fetchRoomInfo({ roomId, roomType: TUIRoomType.kLive });
    return true;
  } catch (error: any) {
    return false;
  }
}

/**
 * Generate liveRoom number when creating a liveRoom
**/
async function generateRoomId(): Promise<string> {
  const roomId = String(Math.ceil(Math.random() * 1000000));
  const isLiveExist = await checkLiveExistWhenCreateLive(String(roomId));
  if (isLiveExist) return await generateRoomId();
  return roomId;
}

/**
 * Processing Click [Create Room]
**/
async function handleCreateLive(roomOption: Record<string, any>) {
  if(!userInfo.sdkAppId || !userInfo.sdkSecretKey) {
     show.value = true;
     return;
  }
  setLiveRoomInfo('createLive',roomOption);
  const roomId = await generateRoomId();
  router.push({
    name: 'live',
    query: {
      roomId,
    }
  });
}

/**
 * Processing Click [Enter Room]
**/
async function handleEnterLive(roomOption: Record<string, any>) {
   if(!userInfo.sdkAppId || !userInfo.sdkSecretKey) {
     show.value = true;
     return;
  }
  router.push({
    name: 'live',
    query: {
      roomId: roomOption.roomId,
    },
  });
}

function handleUpdateUserName(userName: string) {
  try {
    const currentUserInfo = safelyParse(sessionStorage.getItem('tuiLive-userInfo') as string);
    currentUserInfo.userName = userName;
    sessionStorage.setItem('tuiLive-userInfo', JSON.stringify(currentUserInfo));
  } catch (error) {
    console.log('sessionStorage error', error);
  }
}

/**
 * Processing users click [Logout Login] in the upper left corner of the page
**/
async function handleLogOut() {
  sessionStorage.removeItem('tuiLive-roomInfo');
  sessionStorage.removeItem('tuiLive-userInfo');
  sessionStorage.removeItem('sdkAppId');
  sessionStorage.removeItem('sdkSecretKey');
/**
 * The accessor handles the logout method
**/
}

async function handleInit() {
  liveRoom.setLanguage(getLanguage() as LanguageOption);
  liveRoom.setTheme(getTheme() as ThemeOption);
  let currentUserInfo = null;
  if (sessionStorage.getItem('tuiLive-userInfo')) {
    currentUserInfo = safelyParse(sessionStorage.getItem('tuiLive-userInfo') as string);
  } else {
    currentUserInfo && sessionStorage.setItem('tuiLive-userInfo', JSON.stringify(currentUserInfo));
  }
  userInfo.userId = currentUserInfo?.userId;
  userInfo.userName = currentUserInfo?.userName;
  userInfo.avatarUrl = currentUserInfo?.avatarUrl;
  userInfo.sdkAppId = sessionStorage.getItem('sdkAppId') || '';
  userInfo.sdkSecretKey = sessionStorage.getItem('sdkSecretKey') || '';
  const { userId, sdkAppId, userSig } = currentUserInfo;
  await liveRoom.login({ sdkAppId, userId, userSig });
  if (givenRoomId.value) {
    router.push({
      name: 'live',
      query: {
        roomId: givenRoomId.value,
      },
    })
  }
}

const changeLanguage = (language: LanguageOption) => {
  i18n.global.locale.value = language;
  localStorage.setItem('tuiLive-language', language);
};
const changeTheme = (theme: ThemeOption) => {
  localStorage.setItem('tuiLive-currentTheme', theme);
};
onMounted(() => {
  liveRoom.on(RoomEvent.LANGUAGE_CHANGED, changeLanguage);
  liveRoom.on(RoomEvent.THEME_CHANGED, changeTheme);
});

onUnmounted(() => {
  liveRoom.off(RoomEvent.LANGUAGE_CHANGED, changeLanguage);
  liveRoom.off(RoomEvent.THEME_CHANGED, changeTheme);
});

handleInit();

</script>
