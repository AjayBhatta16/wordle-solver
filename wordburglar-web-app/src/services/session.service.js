import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'

export default class SessionService {
    constructor() {}

    async newSession() {
        return of('test-id')
    }

    async nextWordRequest(session) {
        return of('AROSE')
    }
}