
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CreateInterestApplicationParams {
  parkingSpaceId: string;
  customerNumber: string;
  applicationType?: "Replace" | "Additional";
  notes?: string;
}

export const useCreateInterestApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateInterestApplicationParams) => {
      console.log("Creating interest application:", params);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate occasional errors for testing
      if (Math.random() < 0.1) {
        throw new Error("Något gick fel vid skapande av intresseanmälan");
      }
      
      return { success: true };
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: ['parkingSpaceListing'],
      });
    }
  });
};
