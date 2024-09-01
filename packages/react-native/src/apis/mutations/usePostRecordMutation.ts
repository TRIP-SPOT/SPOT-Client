import { useMutation } from '@tanstack/react-query';

interface PostRecordRequest {
  record: {
    name: string;
    description: string;
    region: string;
  };
  images: string[];
}

export default function usePostRecordMutation() {
  return useMutation({
    mutationFn: async (requestParams: PostRecordRequest) => {
      return requestParams;
    },
  });
}
