import * as SessionActions from '../actions/session.actions';
import * as ActiveWordActions from '../actions/active-word.actions';

import { ofType, combineEpics } from 'redux-observable';
import { map, withLatestFrom } from 'rxjs/operators'
import { of } from 'rxjs';

function compressStatus(statusCode) {
    switch (statusCode) {
        case ActiveWordActions.GuessStatusTypes.CORRECT:
            return 'c'
        case ActiveWordActions.GuessStatusTypes.MISPLACED:
            return 'm'
        case ActiveWordActions.GuessStatusTypes.INCORRECT:
            return 'w'
    }
}

const notAWordEpic = (action$) => {
    return action$.pipe(
        ofType(ActiveWordActions.TypeConstants.NOT_A_WORD),
        map((action) => SessionActions.updateSessionData({ notAWord: action.word }))
    )
}

const guessSubmitEpic = (action$, state$) => {
    return action$.pipe(
        ofType(ActiveWordActions.TypeConstants.GUESS_SUBMIT),
        withLatestFrom(state$),
        map(([action, state]) => {
            const compressedStatus = state.activeWord.board
                .map((status) => compressStatus(status))
                .join('')

            return SessionActions.updateSessionData({ 
                lastGuessFeedback: compressedStatus,
            });
        })
    )
}

const activeWordEpics = combineEpics(
    notAWordEpic,
    guessSubmitEpic,
)

export default activeWordEpics