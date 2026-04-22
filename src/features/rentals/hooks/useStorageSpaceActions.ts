import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api';

export const useCloseStorageSpaceListing = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (listingId: string) => {
      const response = await fetch(`${backendUrl}/storage-listings/${listingId}/close`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to close listing');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storageSpaceListings'] });
      toast({
        title: "Listning stängd",
        description: "Förrådsannonsen har stängts framgångsrikt",
      });
    },
    onError: () => {
      toast({
        title: "Fel",
        description: "Kunde inte stänga listningen. Försök igen senare.",
        variant: "destructive",
      });
    }
  });
};

export const useDeleteStorageSpaceListing = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (listingId: string) => {
      const response = await fetch(`${backendUrl}/storage-listings/${listingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete listing');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storageSpaceListings'] });
      toast({
        title: "Annons borttagen",
        description: "Förrådsannonsen har tagits bort",
      });
    },
    onError: () => {
      toast({
        title: "Fel",
        description: "Kunde inte ta bort annonsen. Det finns troligtvis aktiva intresseanmälningar.",
        variant: "destructive",
      });
    }
  });
};

export const useSyncInternalStorageSpaces = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${backendUrl}/storage-spaces/sync-internal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to sync internal storage spaces');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storageSpaceListings'] });
      toast({
        title: "Synkronisering klar",
        description: "Interna förråd har synkroniserats",
      });
    },
    onError: () => {
      toast({
        title: "Synkroniseringsfel",
        description: "Kunde inte synkronisera interna förråd",
        variant: "destructive",
      });
    }
  });
};
