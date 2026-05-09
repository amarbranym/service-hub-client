export type StoredAuthUser = {
  fullName?: string;
  email?: string;
  role?: "customer" | "provider" | "admin";
};

const AUTH_CHANGE_EVENT = "servicehub-auth-change";

let cachedRaw: string | null | undefined;

let cachedUser: StoredAuthUser | null | undefined;

function readFromStorage(): StoredAuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("servicehub_user");
  if (raw === cachedRaw && cachedUser !== undefined) {
    return cachedUser;
  }
  cachedRaw = raw ?? null;
  if (!raw) {
    cachedUser = null;
    return null;
  }
  try {
    cachedUser = JSON.parse(raw) as StoredAuthUser;
    return cachedUser;
  } catch {
    cachedUser = null;
    return null;
  }
}

export function getAuthUserSnapshot(): StoredAuthUser | null {
  return readFromStorage();
}

export function subscribeAuthStore(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const invalidateAndNotify = () => {
    cachedRaw = undefined;
    cachedUser = undefined;
    onStoreChange();
  };

  const onStorage = (event: StorageEvent) => {
    if (event.key === "servicehub_user" || event.key === null) {
      invalidateAndNotify();
    }
  };

  const onSameTabAuth = () => {
    invalidateAndNotify();
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(AUTH_CHANGE_EVENT, onSameTabAuth);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(AUTH_CHANGE_EVENT, onSameTabAuth);
  };
}

export function notifyAuthChanged() {
  if (typeof window === "undefined") return;
  cachedRaw = undefined;
  cachedUser = undefined;
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}
