export const ENDPOINTS = {
    // auth
    LOGIN: "accounts/user/login/",
    REGISTER: "accounts/user/register/",
    VERIFY_OTP: "accounts/user/verify-otp/",
    TOKEN_VERIFY: "accounts/user/token/verify/",
    NEW_REFRESH_TOKEN: "api/user/token/refresh/",
    USERINFO: "accounts/user/profile/",
    // employee
    ALL_EMPLOYEE_LIST: "core/api/employees/",
    DELETE_SPECIFIC_EMPLOYEE: "core/api/employees/",
    ADD_NEW_EMPLOYEE: "core/api/employees/",
    UPDATE_EMPLOYEE: "core/api/employees/",
    // Schedule
    SCHEDULE: "core/api/schedule-settings/",
    CREATE_SCHEDULE: "core/api/ai-schedule/generate-schedule/",
    SAVE_PREVIEW_SCHEDULE: "core/api/ai-schedule/save-preview-schedule/",
    // Dashboard Schedule
    // VIEW_SCHEDULE: (year, month, viewType) => `core/api/ai-schedule/view-schedules/?year=${year}&month=${month}&view_type=${viewType}`,
    VIEW_SCHEDULE: (year,month)=>`core/api/employee-schedules/all-employees/?year=${year}&month=${month}`,
    UPDATE_SCHEDULE: "core/api/ai-schedule/update-last-schedule/"
}