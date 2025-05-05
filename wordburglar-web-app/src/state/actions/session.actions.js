export const TypeConstants = {
    NEW_SESSION_REQUEST: 'NEW_SESSION_REQUEST',
    NEW_SESSION_SUCCESS: 'NEW_SESSION_SUCCESS',
    NEW_SESSION_FAILURE: 'NEW_SESSION_FAILURE',
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

export const newSessionFailure = (error) => ({
    type: TypeConstants.NEW_SESSION_FAILURE,
    error,
})

export const nextWordRequest = (session) => ({
    type: TypeConstants.NEXT_WORD_REQUEST,
    session
})

export const nextWordSuccess = (session, word) => ({
    type: TypeConstants.NEXT_WORD_SUCCESS,
    session,
    word
})

export const nextWordFailure = (error) => ({
    type: TypeConstants.NEXT_WORD_FAILURE,
    error,
})

export const updateSessionData = (session) => ({
    type: TypeConstants.UPDATE_SESSION_DATA,
    session,
})