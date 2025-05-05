import { combineEpics } from 'redux-observable'
import sessionEpics from './session.epics'
import activeWordEpics from './active-word.epics'

const rootEpic = combineEpics(
    sessionEpics,
    activeWordEpics
)

export default rootEpic