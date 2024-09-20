import { useRef } from 'react';
import { Asset } from 'react-native-image-picker';
import { useMutation } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';
import CustomForm from '@/utils/CustomForm';

interface UseProfileImageMutationReturn {
  postMutate: (image: Asset) => Promise<void>;
  isPostPending: boolean;
  patchMutate: (image: Asset) => Promise<void>;
  isPatchPending: boolean;
}

export default function useProfileImageMutation() {
  const authAxios = useAuthAxios();
  const ref = useRef({} as UseProfileImageMutationReturn);

  const postImage = async (image: Asset) => {
    const customForm = new CustomForm();
    customForm.appendImage('profileImage', image);

    await authAxios.post('/api/user/profile', customForm.getForm(), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const patchImage = async (image: Asset) => {
    const customForm = new CustomForm();
    customForm.appendImage('profileImage', image);

    await authAxios.patch('/api/user/profile', customForm.getForm(), {
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
