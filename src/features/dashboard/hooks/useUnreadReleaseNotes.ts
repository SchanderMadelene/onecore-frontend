import { useState, useCallback } from "react";
import { releaseNotes } from "@/data/releaseNotes";

const STORAGE_KEY = "release-notes-last-seen-id";

export const useUnreadReleaseNotes = () => {
  const getUnreadCount = () => {
    const lastSeenId = localStorage.getItem(STORAGE_KEY);
    if (!lastSeenId) return releaseNotes.length;
    const lastSeenIndex = releaseNotes.findIndex((n) => n.id === lastSeenId);
    return lastSeenIndex === -1 ? releaseNotes.length : lastSeenIndex;
  };

  const [unreadCount, setUnreadCount] = useState(getUnreadCount);

  const markAllAsRead = useCallback(() => {
    if (releaseNotes.length > 0) {
      localStorage.setItem(STORAGE_KEY, releaseNotes[0].id);
      setUnreadCount(0);
    }
  }, []);

  return { unreadCount, markAllAsRead };
};
