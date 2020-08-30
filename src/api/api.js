import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "51ff51cd-973e-42e9-80e4-e59bac99ac7f"
    }
})


export const userApi = {
    getUsers(pageSize = 10, currentPage = 1) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.data)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    userProfile(userId) {
        console.warn("this is old method, use new method august 2020")
        return profileApi.userProfile(userId)
    }
}

export const profileApi = {
    userProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    changeStatus(status) {
        return instance.put(`profile/status`, { status })
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfileData(profileData) {
        return instance.put(`profile`, profileData)
    }
}

export const authApi = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const securityApi = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}
