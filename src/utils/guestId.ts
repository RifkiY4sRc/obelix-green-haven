import { v4 as uuidv4 } from 'uuid';

const GUEST_ID_KEY = 'obelix_guest_id';

/**
 * Get or create a guest ID for the current user
 * Stores the ID in localStorage for persistence
 */
export const getOrCreateGuestId = (): string => {
    let guestId = localStorage.getItem(GUEST_ID_KEY);

    if (!guestId) {
        guestId = uuidv4();
        localStorage.setItem(GUEST_ID_KEY, guestId);
    }

    return guestId;
};

/**
 * Clear the stored guest ID
 * Useful for testing or resetting the user session
 */
export const clearGuestId = (): void => {
    localStorage.removeItem(GUEST_ID_KEY);
};

/**
 * Get the current guest ID without creating a new one
 */
export const getGuestId = (): string | null => {
    return localStorage.getItem(GUEST_ID_KEY);
};
