// src/services/user.ts
import { apiCall } from "./api";

export function getUserInfo() {
  return apiCall("nexara.api.user_settings.get_user_info");
}

export function getUserSettings() {
    return apiCall("nexara.api.user_settings.get_or_create_user_settings")
}