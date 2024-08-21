import * as opsService from "./Ops";
// import * as dataConstants from "../constants/Data.constant";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// const get_url = async (data, url) => {
//     // try {
//     //     let result = await opsService.postData(
//     //                        dataConstants.base.mainUrl +

//     //             `api/api/MobileLogin/Check_IsExist_BaseURL`,
//     //         data
//     //     );
//     //     return result;
//     // } catch (e) {
//     //     return { status: false, data: {}, message: e.message };
//     // }
//     try {
//         console.log("dataat", data);
//         // let result = await opsService.postData(`https://demo.finnaux.com/api/api/MobileLogin/Check_IsExist_BaseURL`,
//         //     data
//         // );
//         // let result = await opsService.postData(`https://` + data + `/api/api/MobileLogin/Check_IsExist_BaseURL`)
//         let result = await opsService.postData(`https://` + url + `/api/api/MobileLogin/Check_IsExist_BaseURL`, data);
//         console.log("urlll", url);
//         console.log("resultt", result);
//         return result;
//     } catch (e) {
//         return { status: false, data: {}, message: e.message };
//     }
// },
const get_url = async (data, url) => {
    console.log(url)
    try {
        let result = await opsService.postData(`https://` + url + `/api/api/MobileLogin/Check_IsExist_BaseURL`,
            data
        );
        console.log("urlll", url);
        console.log("resultt", result);
        return result;
    } catch (e) {
        return { status: false, data: {}, message: e.message };
    }
},
    // imageUpload = async (data) => {
    //     try {
    //         let result = await opsService.postData(
    //             dataConstants.base.mainUrl +
    //             `uploadDoc/api/UploadDoc/UploadOthersDoc`,
    //             data
    //         );
    //         return result;
    //     } catch (e) {
    //         return { status: false, data: {}, message: e.message };
    //     }
    // },
    // profileUpload = async (data) => {
    //     try {
    //         let result = await opsService.postData(
    //             dataConstants.base.mainUrl +
    //             `uploadDoc/api/UploadDoc/UploadCustomerDoc`,
    //             data
    //         );
    //         return result;
    //     } catch (e) {
    //         return { status: false, data: {}, message: e.message };
    //     }
    // },
    // profilePic = async (data) => {
    //     try {
    //         let result = await opsService.postData(
    //             dataConstants.base.mainUrl +
    //             `uploadDoc/api/UploadDoc/UploadProfilePic`,
    //             data
    //         );
    //         return result;
    //     } catch (e) {
    //         return { status: false, data: {}, message: e.message };
    //     }
    // },
    // applicationImageUpload = async (data) => {
    //     try {
    //         let result = await opsService.postData(
    //             dataConstants.base.mainUrl +

    //             `uploadDoc/api/UploadDoc/UploadApplicationDoc`,
    //             data
    //         );
    //         return result;
    //     } catch (e) {
    //         return { status: false, data: {}, message: e.message };
    //     }
    // },
    postApiCall = async (url, request) => {
        let base_url = await AsyncStorage.getItem("base_url");
        console.log("base_urlll", base_url + url);
        let token = await AsyncStorage.getItem("token");
        // console.log(token); 
        try {
            let result = await opsService.postData(
                base_url + url,
                request,
                token
            );
            // console.log("resultPostdata", result);
            return result;
        } catch (e) {
            return { status: false, data: {}, message: e.message };
        }
    },
    getApiCall = async (url) => {
        let base_url = await AsyncStorage.getItem("base_url");
        let token = await AsyncStorage.getItem("token");
        // console.log(token); image upload ka h ye
        try {
            let result = await opsService.getData(
                base_url + url,
                token
            );
            return result;
        } catch (e) {
            return { status: false, data: {}, message: e.message };
        }
    };
export { get_url, imageUpload, postApiCall, getApiCall, profileUpload, profilePic, applicationImageUpload };
