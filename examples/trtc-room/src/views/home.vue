<template>
  <pre-conference-view
    :user-info="userInfo"
    :room-id="givenRoomId"
    :enable-scheduled-conference="true"
    @on-create-room="handleCreateRoom"
    @on-enter-room="handleEnterRoom"
    @on-logout="handleLogOut"
    @on-update-user-name="handleUpdateUserName"
  ></pre-conference-view>
  <t-dialog
    v-model:visible="dialogShow"
    :on-confirm="handleInputComfirm"
    cancelBtn="cancel"
    confirmBtn="confirm"
  >
    <div class="title">SDKAppId:</div>
    <t-input 
      v-model="sdkAppId" lable="test"
      placeholder="Please enter the SDKAppId"
    />

    <div class="title">SDKSecretKey</div>
    <t-input 
      v-model="skdSecretKey"
      placeholder="Please enter the SDKSecretKey"
    />

    <t-alert theme="warning" class="warning">
      <template #message> The SDKAppID and SDKSecretKey can be found in the <a href="https://console.trtc.io/overview" target="_blank">TRTC console↗</a>. Please refer to the <a href="https://trtc.io/document/35166?platform=web&product=conference#.E5.AE.A2.E6.88.B7.E7.AB.AF.E7.A4.BA.E4.BE.8B.E4.BB.A3.E7.A0.81.E8.AE.A1.E7.AE.97-UserSig">document</a> for how to obtain it.</template>
    </t-alert>
  </t-dialog>
</template>

<script setup lang="ts">
import { PreConferenceView, conference, RoomEvent, LanguageOption, ThemeOption } from '@tencentcloud/roomkit-web-vue3';
import { getBasicInfo } from '@/config/basic-info-config';
import router from '@/router';
import { useRoute } from 'vue-router';
import { Ref, ref, reactive, onMounted, onUnmounted } from 'vue';
import i18n from '../locales/index';
import { getLanguage, getTheme } from  '../utils/utils';
import { useUIKit } from '@tencentcloud/uikit-base-component-vue3';

const { theme } = useUIKit();
const dialogShow = ref(false);
const route = useRoute();
const sdkAppId = ref(sessionStorage.getItem('skdAppId'));
const skdSecretKey = ref(sessionStorage.getItem('skdSecretKey'));
const { roomId } = route.query;
const givenRoomId: Ref<string> = ref((roomId) as string);

const userInfo = reactive({
  userId: '',
  userName: '',
  avatarUrl: '',
});


function setTUIRoomData(action: string, roomOption: Record<string, any>) {
  sessionStorage.setItem('tuiRoom-roomInfo', JSON.stringify({
    action,
    ...roomOption,
  }));
}

async function checkRoomExistWhenCreateRoom(roomId: string) {
  let isRoomExist = false;
  const tim = conference.getRoomEngine()?.getTIM();
  try {
    const result = await tim?.searchGroupByID(roomId);
    if(!result) throw new Error('room does not exist');
    isRoomExist = true;
  } catch (error: any) {
    // room does not exist
  }
  return isRoomExist;
}

/**
 * Generate room number when creating a room
**/
async function generateRoomId(): Promise<string> {
  const roomId = String(Math.ceil(Math.random() * 1000000));
  const isRoomExist = await checkRoomExistWhenCreateRoom(String(roomId));
  if (isRoomExist) {
    return await generateRoomId();
  }
  return roomId;
}

/**
 * Processing Click [Create Room]
**/
async function handleCreateRoom(roomOption: Record<string, any>) {
  sdkAppId.value = sessionStorage.getItem('sdkAppId');
  skdSecretKey.value = sessionStorage.getItem('sdkSecretKey');
  if(!sdkAppId.value || !skdSecretKey.value) {
    dialogShow.value = true;
    return;
  }
  setTUIRoomData('createRoom', roomOption);
  const roomId = await generateRoomId();
  router.push({
    path: 'room',
    query: {
      roomId,
    },
  });
}

/**
 * Processing Click [Enter Room]
**/
async function handleEnterRoom(roomOption: Record<string, any>) {
  sdkAppId.value = sessionStorage.getItem('sdkAppId');
  skdSecretKey.value = sessionStorage.getItem('sdkSecretKey');
  if(!sdkAppId.value || !skdSecretKey.value) {
    dialogShow.value = true;
    return;
  }
  setTUIRoomData('enterRoom', roomOption);
  router.push({
    path: 'room',
    query: {
      roomId: roomOption.roomId,
    },
  });
}

function handleInputComfirm() {
  sessionStorage.setItem('sdkAppId', sdkAppId.value);
  sessionStorage.setItem('sdkSecretKey', skdSecretKey.value);
  handleInit();
  dialogShow.value = false;
}

function handleUpdateUserName(userName: string) {
  try {
    const currentUserInfo = JSON.parse(sessionStorage.getItem('tuiRoom-userInfo') as string);
    currentUserInfo.userName = userName;
    currentUserInfo.sdkAppId = sessionStorage.getItem('sdkAppId')
    sessionStorage.setItem('tuiRoom-userInfo', JSON.stringify(currentUserInfo));
  } catch (error) {
    console.log('sessionStorage error', error);
  }
}

/**
 * Processing users click [Logout Login] in the upper left corner of the page
**/
async function handleLogOut() {
/**
 * The accessor handles the logout method
**/
}

async function handleInit() {
  sessionStorage.removeItem('tuiRoom-roomInfo');
  sessionStorage.removeItem('tuiRoom-userInfo');
  conference.setLanguage(getLanguage() as LanguageOption);
  !theme.value && conference.setTheme(getTheme() as ThemeOption);
  const currentUserInfo = getBasicInfo();
  if (!currentUserInfo) {
    return;
  }
  sessionStorage.setItem('tuiRoom-userInfo', JSON.stringify(currentUserInfo));
  userInfo.userId = currentUserInfo.userId;
  userInfo.userName = currentUserInfo.userName;
  userInfo.avatarUrl = currentUserInfo.avatarUrl;
  const { userId, sdkAppId, userSig, userName, avatarUrl } = currentUserInfo;
  await conference.login({ sdkAppId, userId, userSig });
  await conference.setSelfInfo({ userName, avatarUrl });
}

const changeLanguage = (language: LanguageOption) => {
  i18n.global.locale.value = language;
  localStorage.setItem('tuiRoom-language', language);
};
const changeTheme = (theme: ThemeOption) => {
  localStorage.setItem('tuiRoom-currentTheme', theme);
};
const handleAcceptedInvitation = async (roomId: string) => {
  await handleEnterRoom({
    roomId,
    roomParam: {
      isOpenCamera: false,
      isOpenMicrophone: true,
    },
  });
};
onMounted(() => {
  conference.on(RoomEvent.LANGUAGE_CHANGED, changeLanguage);
  conference.on(RoomEvent.THEME_CHANGED, changeTheme);
  conference.on(RoomEvent.CONFERENCE_INVITATION_ACCEPTED, handleAcceptedInvitation);
});

onUnmounted(() => {
  conference.off(RoomEvent.LANGUAGE_CHANGED, changeLanguage);
  conference.off(RoomEvent.THEME_CHANGED, changeTheme);
  conference.off(RoomEvent.CONFERENCE_INVITATION_ACCEPTED, handleAcceptedInvitation);
});

handleInit();

</script>

<style scoped>
:deep(.schedule-room) {
  display: none;
}

:deep(.schedule-room-region) {
  display:none;
}

.title {
  margin: 12px 0 5px 5px;
}

.warning {
  margin-top: 24px;
}
</style>
