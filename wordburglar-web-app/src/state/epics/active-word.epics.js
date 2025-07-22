import * as SessionActions from '../actions/session.actions';
import * as ActiveWordActions from '../actions/active-word.actions';

import { ofType, combineEpics } from 'redux-observable';
import { map, withLatestFrom } from 'rxjs/operators'
import { of } from 'rxjs';

function compressStatus(statusCode) {
    switch (statusCode) {
        case ActiveWordActions.GuessStatusTypes.CORRECT:
            return '0'
        case ActiveWordActions.GuessStatusTypes.MISPLACED:
            return '1'
        case ActiveWordActions.GuessStatusTypes.INCORRECT:
            return '2'
    }
}

const notAWordEpic = (action$, state$) => {
    return action$.pipe(
        ofType(ActiveWordActions.TypeConstants.NOT_A_WORD),
        withLatestFrom(state$),
        map(([action, state]) => SessionActions.updateSessionData({ 
            ...state.session.session,
            notWords: [
                ...state.session.session.notWords ?? [],
                action.word,
            ] 
        }))
    )
}

const guessSubmitEpic = (action$, state$) => {
    return action$.pipe(
        ofType(ActiveWordActions.TypeConstants.GUESS_SUBMIT),
        withLatestFrom(state$),
        map(([action, state]) => {
            console.log('guessSubmitEpic', state)
            const compressedStatus = state.activeWord.board
                .map((status) => compressStatus(status))
                .join('');

            let requestSession = state.session.session;

            state.activeWord.board.forEach((ch, idx) => {
                const letter = [...state.session.session.guessSequence ?? []].reverse()[0][idx];

                if (ch === ActiveWordActions.GuessStatusTypes.CORRECT) {
                    requestSession.correct[`ch_${idx+1}`] = letter;
                } else if (ch === ActiveWordActions.GuessStatusTypes.MISPLACED) {
                    requestSession.misplaced.push({
                        pos: idx,
                        value: letter,
                    });
                } else if (ch === ActiveWordActions.GuessStatusTypes.INCORRECT) {
                    requestSession.incorrect.push({
                        value: letter,
                    });
                }
            });

            return SessionActions.updateSessionData({ 
                ...requestSession,
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