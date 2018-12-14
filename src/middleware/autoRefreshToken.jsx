import { isRSAA, RSAA } from 'redux-api-middleware';
import attemptRefresh from 'redux-refresh-token';

import { attemptTokenRefresh } from '../modules/auth/auth.api.actions';
import { setLogout, saveAppToken } from '../modules/auth/auth.actions';

export default store => next => action => {
    if (!isRSAA(action)) {
        return next(action);
    }

    const token = store.getState().auth.authToken;
    const csrf = store.getState().auth.csrf;
    const refreshToken = store.getState().auth.refreshToken;
    const apiUrl = process.env.API_URL || "https://api.vouchr.co/";

    if (!action[RSAA].endpoint.includes(apiUrl)) {
        action[RSAA].endpoint = apiUrl + action[RSAA].endpoint;
    }

    if (!action[RSAA].headers) {
        action[RSAA].headers = {};
    }

    if (typeof token === 'string') {
        action[RSAA].headers.Authorization = `Bearer ${token}`;
        action[RSAA].headers['X-CSRF-Token'] = csrf;
    }

    action[RSAA].headers['Content-Type'] = 'application/json';

    if (action[RSAA].method !== 'GET') {
        if (!action[RSAA].body) {
            action[RSAA].body = {};
        }

        if (typeof action[RSAA].body === 'string') {
            action[RSAA].body = JSON.parse(action[RSAA].body);
        }

        if (action[RSAA].endpoint.includes('auth/refresh_token')) {
            action[RSAA].body.refreshToken = refreshToken;
        }
        action[RSAA].body = JSON.stringify(action[RSAA].body);
    }

    return next(action).then(
        attemptRefresh({
            action,
            failure: setLogout,
            next,
            refreshActionCreator: attemptTokenRefresh,
            setAccessTokenActionCreator: saveAppToken,
            isRefreshCall: (action, refreshAction) => {
                return action[RSAA].endpoint === refreshAction[RSAA].endpoint;
            },
            store,
            token,
        }),
    );
};
