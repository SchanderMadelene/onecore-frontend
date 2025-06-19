
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAcceptOffer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (params: { offerId: number; listingId: number }) => {
      console.log("Accepting offer:", params);
      // Mock API call
      return Promise.resolve();
    },
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: ['parkingSpaceListing', params.listingId],
      });
    }
  });
};

export const useDenyOffer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (params: { offerId: number; listingId: number }) => {
      console.log("Denying offer:", params);
      // Mock API call
      return Promise.resolve();
    },
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: ['parkingSpaceListing', params.listingId],
      });
    }
  });
};

export const useCreateOffer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (params: { listingId: number }) => {
      console.log("Creating offer for listing:", params.listingId);
      // Mock API call
      return Promise.resolve();
    },
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: ['parkingSpaceListing', params.listingId],
      });
    }
  });
};

export const useRemoveApplicant = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (params: { applicantId: number; listingId: number }) => {
      console.log("Removing applicant:", params);
      // Mock API call
      return Promise.resolve();
    },
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: ['parkingSpaceListing', params.listingId],
      });
    }
  });
};
