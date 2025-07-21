import * as SessionActions from '../actions/session.actions';

const initialState = {
    session: {
        sessionID: null,
        lastGuessFeedback: null,
        guessSequence: [],
        notWords: [],
        correct: {},
        misplaced: [],
        incorrect: []
    },
    loading: false,
    error: null,
}

export const session = (state = initialState, action) => {
    switch (action.type) {
        case SessionActions.TypeConstants.NEW_SESSION_REQUEST:
            console.log('NEW_SESSION_REQUEST - reducer - start')
            return {
                ...state,
                loading: true,
                error: null,
            }
        case SessionActions.TypeConstants.NEW_SESSION_SUCCESS:
            console.log('NEW_SESSION_SUCCESS - reducer - start', action.session)
            return {
                ...state,
                loading: false,
                session: action.session,
            }
        case SessionActions.TypeConstants.NEW_SESSION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case SessionActions.TypeConstants.GET_SESSION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case SessionActions.TypeConstants.GET_SESSION_SUCCESS:
            return {
                ...state,
                loading: false,
                session: action.session,
            }
        case SessionActions.TypeConstants.GET_SESSION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case SessionActions.TypeConstants.NEXT_WORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case SessionActions.TypeConstants.NEXT_WORD_SUCCESS:
            return {
                ...state,
                loading: false,
                session: {
                    ...state.session,
                    ...action.updatedSession,
                }
            } 
        case SessionActions.TypeConstants.NEXT_WORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case SessionActions.TypeConstants.UPDATE_SESSION_DATA:
            return {
                ...state,
                session: {
                    ...state.session,
                    notWords: [
                        ...(state.session.notWords ?? []),
                        action.session.notAWord,
                    ],
                    ...action.session,
                }
            }
        default:
            return state
    }
}