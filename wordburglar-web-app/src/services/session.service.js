import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'

export default class SessionService {
    constructor() {}

    newSession() {
        return of('test-id')
    }

    async nextWordRequest(session) {
        return of('AROSE')
    }
}