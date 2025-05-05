import { combineReducers } from 'redux'
import { session } from './session.reducer'
import { activeWord } from './active-word.reducer'

const reducer = combineReducers({
    session,
    activeWord,
})

export default reducer