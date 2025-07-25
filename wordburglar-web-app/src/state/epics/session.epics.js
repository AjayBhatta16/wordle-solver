import * as SessionActions from '../actions/session.actions';
import * as ActiveWordActions from '../actions/active-word.actions';
import SessionService from '../../services/session.service';

import { ofType, combineEpics } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators'
import { of } from 'rxjs';

const newSessionEpic = (action$) => {
    console.log('newSessionEpic - start')
    return action$.pipe(
        ofType(SessionActions.TypeConstants.NEW_SESSION_REQUEST),
        switchMap(() => {
            const sessionService = new SessionService();
            return sessionService.newSession().pipe(
                map((session) => SessionActions.newSessionSuccess(session)),
                catchError((error) => of(SessionActions.newSessionFailure(error)))
            )
        })
    )
}

const getSessionEpic = (action$) => {
    return action$.pipe(
        ofType(SessionActions.TypeConstants.GET_SESSION_REQUEST),
        switchMap((action) => {
            const sessionService = new SessionService();
            return sessionService.getSession(action.sessionId).pipe(
                map((session) => SessionActions.getSessionSuccess(session)),
                catchError((error) => of(SessionActions.getSessionFailure(error)))
            )
        })
    )
}

const nextWordEpic = (action$) => {
    return action$.pipe(
        ofType(SessionActions.TypeConstants.NEXT_WORD_REQUEST),
        switchMap((action) => {
            const sessionService = new SessionService();
            return sessionService.getNextWord(action.session).pipe(
                map((session) => SessionActions.nextWordSuccess(session)),
                catchError((error) => of(SessionActions.nextWordFailure(error)))
            )
        })
    )
}

const nextWordSuccessEpic = (action$) => {
    return action$.pipe(
        ofType(SessionActions.TypeConstants.NEXT_WORD_SUCCESS),
        map((action) => ActiveWordActions.resetBoard([...action.updatedSession.guessSequence].reverse()[0]))
    )
}

const updateSessionDataEpic = (action$) => {
    return action$.pipe(
        ofType(SessionActions.TypeConstants.UPDATE_SESSION_DATA),
        map((action) => SessionActions.nextWordRequest(action.session))
    )
}

const sessionEpics = combineEpics(
    newSessionEpic,
    getSessionEpic,
    nextWordEpic,
    nextWordSuccessEpic,
    updateSessionDataEpic
)

export default sessionEpics;