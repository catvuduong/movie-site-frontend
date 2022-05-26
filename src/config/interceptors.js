import axios from 'axios'
axios.defaults.baseURL = 'https://localhost:5001';

axios.interceptors.request.use(
    async function (config) {
        const user = JSON.parse(localStorage.getItem("Admin"));
        if (user && user.accessToken) {
            const token = user.accessToken;
            config.headers["Authorization"] = "Bearer " + token;
        }
        // console.log("[Request] " + config.url);
        // console.log(token);
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// axios.interceptors.response.use(
//     async function (response) {
//         return response;
//     },
//     async function (error) {
//         console.log(`[Response][Error] ${error.response.config.url} - ${error.response.status} - ${error.response.data.message}`);
//         if (error.response.status === 401) {
//             await AsyncStorage.removeItem("user_info");
//             await AsyncStorage.removeItem("access_token");
//             RootNavigation.navigate(Screens.LOGIN);
//         }
//         return Promise.reject(error);
//     }
// );