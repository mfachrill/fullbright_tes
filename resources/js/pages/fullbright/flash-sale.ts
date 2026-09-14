const flashWindowMs = 12 * 60 * 60 * 1000;
let memoryFlashStart = 0;

function flashDeadline(): number {
    try {
        const stored = Number(localStorage.getItem('fb_flash_start') || 0);

        if (Number.isFinite(stored) && stored > 0) {
            return stored + flashWindowMs;
        }

        memoryFlashStart ||= Date.now();
        localStorage.setItem('fb_flash_start', String(memoryFlashStart));
    } catch {
        memoryFlashStart ||= Date.now();
    }

    return memoryFlashStart + flashWindowMs;
}

export function flashRemainingMs(): number {
    if (typeof window === 'undefined') {
        return flashWindowMs;
    }

    return Math.max(0, flashDeadline() - Date.now());
}

export function formatCountdown(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const remainingSeconds = String(seconds % 60).padStart(2, '0');

    return `${hours}:${minutes}:${remainingSeconds}`;
}
