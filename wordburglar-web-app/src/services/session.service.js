import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'

export default class SessionService {
    constructor() {}

    newSession() {
        console.log('newSession - start')
        return of({
            sessionId: 'test-id',
            guessSequence: [],
            notWords: [],
            correct: {},
            misplaced: [],
            incorrect: []
        })
    }

    getSession(sessionId) {
        return of({
            sessionId: sessionId,
            guessSequence: [],
            notWords: [],
            correct: {},
            misplaced: [],
            incorrect: []
        })
    }

    getNextWord(session) {
        return of('AROSE')
    }
}