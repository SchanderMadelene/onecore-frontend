import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CreateHousingApplicationParams {
  housingSpaceId: string;
  customerNumber: string;
  notes?: string;
}

export const useCreateHousingApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateHousingApplicationParams) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate occasional errors for testing
      if (Math.random() < 0.1) {
        throw new Error("Något gick fel vid skapande av bostadsansökan");
      }
      
      return { success: true };
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: ['housingListing'],
      });
    }
  });
};