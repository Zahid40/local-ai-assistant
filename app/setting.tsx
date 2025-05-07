import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  NativeModules, ToastAndroid, ScrollView, ActivityIndicator, Image, TouchableOpacity, Linking,
} from 'react-native';
import React, { useEffect, useRef, useState } from "react";
import { Link, Stack, useNavigation } from "expo-router";
import { CpuSetting } from "iconsax-react-native";
import BackButton from "😎/components/backButton";
import { logger } from "😎/utils/LogUtils";

const { OllamaConfigModule, OllamaServiceModule  } = NativeModules;

const setting = () => {

  const log = logger.createModuleLogger('SettingsPage');
  const navigation = useNavigation();
  const DEEPSEEK = 'deepseek-r1:1.5b';
  const [modelName, setModelName] = useState(DEEPSEEK);
  const [downloadModelVisible, setDownloadModelVisible] = useState(false);
  const [startingServerDialogVisible, setStartingServerDialogVisible] = useState(false)
  const [closeServerVisible, setCloseServerVisible] = useState(false)
  const [serverRunning, setServerRunning] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadProgressModelVisible, setDownloadProgressModelVisible] = useState(false);
  const [downloadInfo, setDownloadInfo] = useState('');
  const [modelListDialogVisible, setModelListDialogVisible] = useState(false)
  const [modelList, setModelList] = useState<OllamaModel[]>([])
  // 删除模型确认对话框
  const [deleteModelDialogVisible, setDeleteModelDialogVisible] = useState(false)
  // 删除模型名称
  const [deleteModelName, setDeleteModelName] = useState('');
  // 删除模型中对话框
  const [deletingModelDialogVisible, setDeletingModelDialogVisible] = useState(false)
  // 正在运行的模型对话框
  const [runningModelDialogVisible, setRunningModelDialogVisible] = useState(false)
  // 正在运行的模型
  const [runningModelList, setRunningModelList] = useState<OllamaRunningModel[]>([])
  // 关闭正在运行模型对话框
  const [unloadModelDialogVisible, setUnloadModelDialogVisible] = useState(false)
  // 关于对话框
  const [aboutDialogVisible, setAboutDialogVisible] = useState(false)
  // 模型推荐对话框
  const [modelRecommendDialogVisible, setModelRecommendDialogVisible] = useState(false)
  // 下载模型session引用
  const pullSessionRef = useRef<PullSessionType | null>(null);
  // 是否启用局域网监听
  const [lanListeningEnabled, setLanListeningEnabled] = useState(false);

  const checkServerStatus = async (): Promise<boolean> => {
      try {
          const response = await fetch(OLLAMA_SERVER);
          return response.ok;
      } catch (error) {
          log.error(`Error checking server status: ${error}`);
          return false;
      }
  };

  useEffect(() => {
      const initializeServerStatus = async () => {
          const isRunning = await checkServerStatus();
          setServerRunning(isRunning);
      };

      initializeServerStatus();

      const intervalId = setInterval(async () => {
          const isRunning = await checkServerStatus();
          setServerRunning(isRunning);
      }, 60000);

      return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
      const loadConfig = async () => {
          const enabled = await OllamaConfigModule.getLanListeningEnabled();
          setLanListeningEnabled(enabled);
      };
      loadConfig();
  }, []);

  const handleServerStatus = async () => {
      if (serverRunning) {
          setCloseServerVisible(true)
      } else {
          await OllamaServiceModule.startService();
          setStartingServerDialogVisible(true);
          // 轮询检测Ollama服务是否启动
          const pollingInterval = setInterval(async () => {
              if (await checkServerStatus()) {
                  clearInterval(pollingInterval);
                  clearTimeout(timeoutId);
                  setServerRunning(true);
                  setStartingServerDialogVisible(false);
              }
          }, 1000); // 每秒检测一次
          // 超时处理
          const timeoutId = setTimeout(() => {
              clearInterval(pollingInterval);
              setStartingServerDialogVisible(false);
              ToastAndroid.show('Ollama Server start timeout', ToastAndroid.SHORT)
              log.error('Ollama Server start timeout')
          }, 10000); // 10秒超时
          // 清理函数
          return () => {
              clearInterval(pollingInterval);
              clearTimeout(timeoutId);
          };
      }
  };

  const handleCloseServer = async () => {
      setCloseServerVisible(false)
      await OllamaServiceModule.stopService();
      setServerRunning(false)
  };
  
  return (
    <>
      <Stack.Screen
        name="setting"
        options={{
          title: "Settings",
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View className="px-4 py-2 items-center justify-center gap-2 flex-row">
              <CpuSetting size="18" variant="Bulk" color="#737373" />
              <Text className="text-lg ">Settings</Text>
            </View>
          ),
          headerRight: () => <View className="size-12 " />,
        }}
      />

      <View>
        <Text>setting</Text>
        <Link href={'/log'}>Logs</Link>
      </View>
    </>
  );
};

export default setting;
