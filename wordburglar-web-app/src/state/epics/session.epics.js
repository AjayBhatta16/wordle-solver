import * as SessionActions from '../actions/session.actions';
import * as ActiveWordActions from '../actions/active-word.actions';
import SessionService from '../../services/session.service';

import { ofType, combineEpics } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators'
import { of } from 'rxjs';

const newSessionEpic = (action$) => {
    return action$.pipe(
        ofType(SessionActions.TypeConstants.NEW_SESSION_REQUEST),
        switchMap(() => {
            const sessionService = new SessionService();
            return sessionService.createSession().pipe(
                map((session) => SessionActions.newSessionSuccess(session)),
                catchError((error) => of(SessionActions.newSessionFailure(error)))
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
                map((word) => SessionActions.nextWordSuccess(action.session, word)),
                catchError((error) => of(SessionActions.nextWordFailure(error)))
            )
        })
    )
}

const nextWordSuccessEpic = (action$) => {
    return action$.pipe(
        ofType(SessionActions.TypeConstants.NEXT_WORD_SUCCESS),
        map((action) => ActiveWordActions.resetBoard(action.word))
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
    nextWordEpic,
    nextWordSuccessEpic,
    updateSessionDataEpic
)

export default sessionEpics;