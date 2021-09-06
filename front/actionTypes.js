// AUTH

export const register = {
    REQUEST:'FETCH_REGISTER_REQUEST',
    RESPONSE:'FETCH_REGISTER_RESPONSE'
};
export const login = {
    REQUEST:'FETCH_LOGIN_REQUEST',
    RESPONSE:'FETCH_LOGIN_RESPONSE'
};
export const setUser = {
    REQUEST:'FETCH_setUser_REQUEST',
    RESPONSE:'FETCH_setUser_RESPONSE'
};

//AUTH END


//HOME

export const getHome = {
    REQUEST:'FETCH_GETHOME_REQUEST',
    RESPONSE:'FETCH_GETHOME_RESPONSE'
};

//HOME END


//LESSON

export const getList = {
    REQUEST:'FETCH_GET_LIST_REQUEST',
    RESPONSE:'FETCH_GET_LIST_RESPONSE'
};
export const getListEish = {
    REQUEST:'FETCH_GET_LISTEish_REQUEST',
    RESPONSE:'FETCH_GET_LISTEish_RESPONSE'
};
export const getLesson = {
    REQUEST:'FETCH_GET_LESSOINSINGLE_REQUEST',
    RESPONSE:'FETCH_GET_LESSOINSINGLE_RESPONSE'
};
export const addWish = {
    REQUEST:'addWish_REQ',
    RESPONSE:'addWish_RES'
};
export const clearLesson = {
    REQUEST:'clearLesson_REQ'
};
export const getViewArea = {
    REQUEST:'FETCH_GET_LESSOINVIEW_REQUEST',
    RESPONSE:'FETCH_GET_LESSOINVIEW_RESPONSE'
};
export const setProgress = {
    REQUEST:'FETCH_GET_setProgress_REQUEST',
    RESPONSE:'FETCH_GET_setProgress_RESPONSE'
};
export const verifyDevice ={
    REQUEST: 'verifyDevice_REQ',
    RESPONSE: 'verifyDevice_RES'
};

//LESSON END
//TestLaunch START
export const getTest = {
    REQUEST:'getTest_REQUEST',
    RESPONSE:'getTest_RESPONSE'
};
export const postAnswers = {
    REQUEST:'postAnswers_REQUEST',
    RESPONSE:'postAnswers_RESPONSE'
};
export const endTest = {
    REQUEST:'endTest_REQUEST',
    RESPONSE:'endTest_RESPONSE'
};
export const selectedAnswer = {
    REQUEST:'selectedAnswer_REQUEST',
};

//TestLaunch END

//Test START
export const getTests = {
    REQUEST:'getTests_REQUEST',
    RESPONSE:'getTests_RESPONSE'
};
export const declineOpenTest = {
    REQUEST:'declineOpenTest_REQUEST',
    RESPONSE:'declineOpenTest_RESPONSE'
};
export const checkTransaction = {
    REQUEST:'checkTransaction_REQUEST',
    RESPONSE:'checkTransaction_RESPONSE'
};
export const componentWillUnmountTest = {
    REQUEST:'componentWillUnmountTest_REQUEST',
    RESPONSE:'componentWillUnmountTest_RESPONSE'
};
//Test END

//ResultSingle start
export const getTestSingle = {
    REQUEST:'getTestSingle_REQUEST',
    RESPONSE:'getTestSingle_RESPONSE'
};
//ResultSingle end
//ResultSingle start
export const getResults = {
    REQUEST:'getResults_REQUEST',
    RESPONSE:'getResults_RESPONSE'
};
//ResultSingle end


//PROFILE

export const getHistory = {
    REQUEST:'FETCH_GET_HISTORY_REQUEST',
    RESPONSE:'FETCH_GET_HISTORY_RESPONSE'
};
export const getLessonsProf = {
    REQUEST:'FETCH_GET_LESSONS_PROF_REQUEST',
    RESPONSE:'FETCH_GET_LESSONS_PROF_RESPONSE'
};
export const getWishlist = {
    REQUEST:'FETCH_GET_WISHLIST_REQUEST',
    RESPONSE:'FETCH_GET_WISHLIST_RESPONSE'
};

//PROFILE END


//AUDIO

export const getListAudio = {
    REQUEST: 'getListAudio_REQ',
    RESPONSE: 'getListAudio_RES',
};
export const clearAudio = {
    REQUEST: 'clearAudio_REQ',
    RESPONSE: 'clearAudio_RES',
};
export const setProgressAudio = {
    REQUEST: 'setProgressAudio_REQ',
    RESPONSE: 'setProgressAudio_RES',
};
export const getViewAreaAudio = {
    REQUEST: 'getViewAreaAudio_REQ',
    RESPONSE: 'getViewAreaAudio_RES',
};
export const getAudio = {
    REQUEST: 'getAudio_REQ',
    RESPONSE: 'getAudio_RES',
};

//AUDIO END


//PAYMENT


export const closePayment = {
    REQUEST: 'closePayment_REQ',
};
export const openPayment = {
    REQUEST: 'openPayment_REQ',
};
export const setStepPayment = {
    REQUEST: 'setStepPayment_REQ',
};
export const setMethodPayment = {
    REQUEST: 'setMethodPayment_REQ',
};
export const setPayment = {
    REQUEST: 'setPayment_REQ',
    RESPONSE: 'setPayment_RES',
};
export const setPaymentOld = {
    REQUEST: 'setPaymentOld_REQ',
    RESPONSE: 'setPaymentOld_RES',
};
export const checkBankPayment = {
    REQUEST: 'checkBankPayment_REQ',
    RESPONSE: 'checkBankPayment_RES',
};
export const checkQpayPayment = {
    REQUEST: 'checkQpayPayment_REQ',
    RESPONSE: 'checkQpayPayment_RES',
};

//PAYMENT END

//JOBPOST
export const getJobPost = {
    REQUEST:'getJobPost_REQUEST',
    RESPONSE:'getJobPost_RESPONSE'
};
//JOBPOST END

//TEACHER REQUEST
export const submitTeacherRequest = {
    REQUEST: 'submitTeacher_REQUEST',
    RESPONSE: 'submitTeacher_RESPONSE',
}
//TEACHER REQUEST END

//FEEDBACK
export const submitFeedback = {
    REQUEST: 'submitFeedback_REQUEST',
    RESPONSE: 'submitFeedback_RESPONSE',
}
//FEEDBACK END
//PROMOCODES
export const validatePromoCode = {
    REQUEST: 'validatePromoCode_REQUEST',
    RESPONSE: 'validatePromoCode_RESPONSE',
}
export const clearPromoCode = {
    REQUEST: 'clearPromoCode_REQUEST',
    RESPONSE: 'clearPromoCode_RESPONSE',
}