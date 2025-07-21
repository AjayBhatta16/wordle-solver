import { ajax } from 'rxjs/ajax'
import env from '../env'

export default class SessionService {
    constructor() {}

    newSession() {
        return ajax(`${env.API_GATEWAY_URI}/session`);
    }

    getSession(sessionId) {
        return ajax(`${env.API_GATEWAY_URI}/session/${sessionId}`);
    }

    getNextWord(session) {
        return ajax({
            url: `${env.API_GATEWAY_URI}/next-word`,
            method: 'POST',
            body: session,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}