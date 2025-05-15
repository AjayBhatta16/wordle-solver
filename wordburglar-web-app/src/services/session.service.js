import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'

export default class SessionService {
    constructor() {}

    newSession() {
        console.log('newSession - start')
        return of({
            sessionId: 'test-id',
            guessSequence: ['AROSE']
        })
    }

    getSession(sessionId) {
        return of({
            sessionId: sessionId,
            guessSequence: ['AROSE']
        })
    }

    getNextWord(session) {
        return of('AROSE')
    }
}