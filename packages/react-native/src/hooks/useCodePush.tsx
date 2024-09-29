import { useEffect, useState } from 'react';
import CodePush from 'react-native-code-push';

export default function useCodePush() {
  const [isRecent, setRecent] = useState<boolean>();
  const [downloadProgress, setDownloadProgress] = useState(0);

  const checkUpdate = async () => {
    const update = await CodePush.checkForUpdate();
    setRecent(!update);
    if (update) {
      const newPackage = await update.download(
        ({ receivedBytes, totalBytes }) => {
          setDownloadProgress(receivedBytes / totalBytes);
        },
      );
      await newPackage.install(CodePush.InstallMode.IMMEDIATE);
      CodePush.notifyAppReady();
      CodePush.restartApp();
    }
  };

  useEffect(() => {
    checkUpdate();
  }, []);

  return {
    downloadProgress,
    isRecent,
  };
}
