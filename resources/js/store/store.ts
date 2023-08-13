import { defineStore } from 'pinia';

export const useStores = defineStore('store', {
    state: () => {
        return {
            locale: 'kh',
            ip: '',
            authorisation: {
                token: '',
                type: '',
                expires_in: 0,
            },
            auth: false,
            toggleBar: false,
            server: 'http://127.0.0.1:8000/',
        }
    },
    actions: {
        toggleSideBar() {
            // alert(1)
            this.toggleBar = !this.toggleBar;
        }
        // updateLocale(lang: string) {
        //     this.locale = lang;
        // },
        // updateAuthorisation(authorisation: IAuthorisation) {
        //     this.authorisation = authorisation;
        // },
        // removeAuthorisation(authorisation: string) {
        //     this.authorisation.token = authorisation;
        //     this.auth = false;
        // },
        // updateUser(user: IUpdateUser) {
        //     this.user = user;
        // },
        // updateAuth(auth: boolean) {
        //     this.auth = auth;
        // },
    },
    getters: {
        // userInfo: (state) => state.user,
        // isAuth: (state) => {
        //     let auth = state.auth;
        //     if (state.authorisation.token) {
        //         auth = true;
        //     }
        //     return auth;
        // },
        apiServer: (state) => {
            // const config = useRuntimeConfig().public;
            // let server = state.server;
            // return 'http://127.0.0.1:8000/';
            return 'https://server-kh.com/';
        },
    },
    persist: {
        enabled: true,
        strategies: [
            { storage: sessionStorage },
            // { storage: localStorage },
        ],
    }
});
