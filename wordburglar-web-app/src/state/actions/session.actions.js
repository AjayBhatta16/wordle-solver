export const TypeConstants = {
    NEW_SESSION_REQUEST: 'NEW_SESSION_REQUEST',
    NEW_SESSION_SUCCESS: 'NEW_SESSION_SUCCESS',
    NEW_SESSION_FAILURE: 'NEW_SESSION_FAILURE',
    GET_SESSION_REQUEST: 'GET_SESSION_REQUEST',
    GET_SESSION_SUCCESS: 'GET_SESSION_SUCCESS',
    GET_SESSION_FAILURE: 'GET_SESSION_FAILURE',
    NEXT_WORD_REQUEST: 'NEXT_WORD_REQUEST',
    NEXT_WORD_SUCCESS: 'NEXT_WORD_SUCCESS',
    NEXT_WORD_FAILURE: 'NEXT_WORD_FAILURE',
    UPDATE_SESSION_DATA: 'UPDATE_SESSION_DATA',
}

export const newSessionRequest = () => ({
    type: TypeConstants.NEW_SESSION_REQUEST,
})

export const newSessionSuccess = (session) => ({
    type: TypeConstants.NEW_SESSION_SUCCESS,
    session,
})

export const getSessionRequest = (sessionId) => ({
    type: TypeConstants.GET_SESSION_REQUEST,
    sessionId,
})

export const getSessionSuccess = (session) => ({
    type: TypeConstants.GET_SESSION_SUCCESS,
    session,
})

export const getSessionFailure = (error) => ({
    type: TypeConstants.GET_SESSION_FAILURE,
    error,
})

export const newSessionFailure = (error) => ({
    type: TypeConstants.NEW_SESSION_FAILURE,
    error,
})

export const nextWordRequest = (session) => ({
    type: TypeConstants.NEXT_WORD_REQUEST,
    session
})

export const nextWordSuccess = (updatedSession) => ({
    type: TypeConstants.NEXT_WORD_SUCCESS,
    updatedSession
})

export const nextWordFailure = (error) => ({
    type: TypeConstants.NEXT_WORD_FAILURE,
    error,
})

export const updateSessionData = (session) => ({
    type: TypeConstants.UPDATE_SESSION_DATA,
    session,
})