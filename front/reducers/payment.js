import {
    closePayment,
    setStepPayment,
    setPayment,
    setPaymentOld,
    setMethodPayment,
    openPayment,
    checkBankPayment,
    checkQpayPayment,
    buyEishFree
} from "../actionTypes";
import config from "../config";
const initialState = {
    visible: false,
    type: '',
    lesson: {},
    step: 1,
    method: '',
    paymentLaoding: true,
    transaction: {},
	buyingEishFree: false,
	buyEishFreeSuccess: false
};

export default(state = initialState, action) => {
    switch (action.type) {
        case openPayment.REQUEST:
            return {
                ...state,
                visible:true,
                type: action.json.type,
                lesson: action.json.lesson || {},
                duration: action.json.duration,
            };
        case closePayment.REQUEST:
            return {
                ...initialState
            };
        case setStepPayment.REQUEST:
            if(action.json.step === 2) {
                return {
                    ...state,
                    step: action.json.step,
                    method: '',
                    paymentLaoding: true,
                    transaction: {},
                }
            } else {
                return {
                    ...state,
                    step: action.json.step,
                    method: '',
                };
            }
        case setMethodPayment.REQUEST:
            return {
                ...state,
                method: action.json.method
            };
        case setPayment.REQUEST:
            return {
                ...state,
                step: 3,
                paymentLaoding: true,
            };
        case setPayment.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    paymentLaoding: false,
                    transaction: action.json.transaction || {},
                };
            } else {
                return {
                    ...state,
                    step: 2,
                    paymentLaoding: false,
                };
            }
        case setPaymentOld.REQUEST:
            return {
                ...state,
                step: 3,
                paymentLaoding: true,
                visible:true,
                method: action.json.method,
                type: action.json.type,
                lesson: action.json.lesson || {}
            };
        case setPaymentOld.RESPONSE:
            if(action.json.success) {
                return {
                    ...state,
                    paymentLaoding: false,
                    transaction: action.json.transaction || {},
                };
            } else {
                return {
                    ...state,
                    step: 2,
                    paymentLaoding: false,
                };
            }
        case checkBankPayment.REQUEST:
            return {
                ...state,
                paymentLaoding: true,
            };
        case checkBankPayment.RESPONSE:
            if(action.json.success) {
                config.get('emitter').emit('closedPayment');
                return {
                    ...initialState,
                };
            } else {
                return {
                    ...state,
                    paymentLaoding: false,
                };
            }
        case checkQpayPayment.REQUEST:
            return {
                ...state,
                paymentLaoding: true,
            };
        case checkQpayPayment.RESPONSE:
            if(action.json.success) {
                config.get('emitter').emit('closedPayment');
                return {
                    ...initialState,
                };
            } else {
                if(action.json.reset) {
                    return {
                        ...state,
                        paymentLaoding: false,
                        step: 2,
                        transaction: {},
                        method: '',
                    };
                } else {
                    return {
                        ...state,
                        paymentLaoding: false,
                    };
                }
            }
        case buyEishFree.REQUEST:
            return {
                ...state,
                buyingEishFree: true
            }
        case buyEishFree.RESPONSE:
            if (action.json.success) {
                config.get('emitter').emit('success', 'ЭЕШ багц идэвхжлээ!')
                return {
                    ...state,
                    buyEishFreeSuccess: true,
                    buyingEishFree: false,
                    // visible: false
                }
            } else {
                return {
                    ...state,
                    buyingEishFree: false
                }
            }
        default:
            return state;
    }
};