import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api';

export const useCloseParkingSpaceListing = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (listingId: string) => {
      const response = await fetch(`${backendUrl}/listings/${listingId}/close`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to close listing');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parkingSpaceListings'] });
      toast({
        title: "Listning stängd",
        description: "Bilplatsannonsen har stängts framgångsrikt",
      });
    },
    onError: (error) => {
      toast({
        title: "Fel",
        description: "Kunde inte stänga listningen. Försök igen senare.",
        variant: "destructive",
      });
    }
  });
};

export const useDeleteParkingSpaceListing = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (listingId: string) => {
      const response = await fetch(`${backendUrl}/listings/${listingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete listing');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parkingSpaceListings'] });
      toast({
        title: "Annons borttagen",
        description: "Bilplatsannonsen har tagits bort",
      });
    },
    onError: (error) => {
      toast({
        title: "Fel",
        description: "Kunde inte ta bort annonsen. Det finns troligtvis aktiva intresseanmälningar.",
        variant: "destructive",
      });
    }
  });
};

export const useSyncInternalParkingSpaces = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${backendUrl}/parking-spaces/sync-internal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to sync internal parking spaces');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parkingSpaceListings'] });
      toast({
        title: "Synkronisering klar",
        description: "Interna bilplatser har synkroniserats",
      });
    },
    onError: (error) => {
      toast({
        title: "Synkroniseringsfel",
        description: "Kunde inte synkronisera interna bilplatser",
        variant: "destructive",
      });
    }
  });
};
