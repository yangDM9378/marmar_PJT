/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from '@tanstack/react-query';
import { evaluateApi } from '../../api/liveClassApi';

export default function useEvaluate() {
  const useEvaluation = useMutation(evaluateApi, {
    onMutate: variable => {
      // console.log('onMutate', variable);
    },
    onSuccess: async (data, variables) => {
      // console.log('success', data, variables);
    },
    onError: (error, variable, context) => {
      // console.log('error', error, variable);
    },
    onSettled: () => {
      // console.log('end');
    },
  });

  return { useEvaluation };
}
