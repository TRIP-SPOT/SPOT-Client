import { useRef } from 'react';
import { Platform } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';
import { getDateString, normalizeDate } from '@/utils/date';

interface UseProfileImageMutationReturn {
  postMutate: (imageUrl: string) => Promise<void>;
  isPostPending: boolean;
  patchMutate: (imageUrl: string) => Promise<void>;
  isPatchPending: boolean;
}

export default function useProfileImageMutation() {
  const authAxios = useAuthAxios();
  const ref = useRef({} as UseProfileImageMutationReturn);

  const postImage = async (imageUrl: string) => {
    const form = new FormData();

    form.append('profileImage', {
      name: `${getDateString(normalizeDate())}.jpg`,
      type: 'image/jpg',
      uri: Platform.OS === 'ios' ? imageUrl.replace('file://', '') : imageUrl,
    });

    await authAxios.post('/api/user/profile', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const patchImage = async (imageUrl: string) => {
    const form = new FormData();

    form.append('profileImage', {
      name: `${getDateString(normalizeDate())}.jpg`,
      type: 'image/jpg',
      uri: Platform.OS === 'ios' ? imageUrl.replace('file://', '') : imageUrl,
    });

    await authAxios.patch('/api/user/profile', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const { mutateAsync: postMutate, isPending: isPostPending } = useMutation({
    mutationFn: postImage,
  });

  const { mutateAsync: patchMutate, isPending: isPatchPending } = useMutation({
    mutationFn: patchImage,
  });

  ref.current.postMutate = postMutate;
  ref.current.isPostPending = isPostPending;
  ref.current.patchMutate = patchMutate;
  ref.current.isPatchPending = isPatchPending;

  return ref.current;
}
