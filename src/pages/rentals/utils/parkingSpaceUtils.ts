
export const getOfferStatus = (offers: any[]) => {
  if (!offers.length) return "Intresseanmälningar";
  const latestOffer = offers[offers.length - 1];
  const statusMap: Record<string, string> = {
    "Active": "Erbjudande",
    "Accepted": "Tilldelad / kontrakterad", 
    "Declined": "Nekad",
    "Expired": "Utgången"
  };
  return statusMap[latestOffer.status] || "Intresseanmälningar";
};

export const createMockSpace = (parkingSpaceId: string, listing: any) => ({
  id: parkingSpaceId,
  address: listing.address || "Okänd adress",
  area: listing.area || "Okänt område", 
  type: listing.type || "Okänd typ",
  rent: listing.rent || "Okänd hyra",
  queueType: listing.queueType || "Okänd kötyp",
  seekers: listing.applicants?.length || 0,
  publishedFrom: listing.publishedFrom || "",
  publishedTo: listing.publishedTo || ""
});
