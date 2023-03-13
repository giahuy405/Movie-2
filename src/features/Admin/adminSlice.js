import { produce } from 'immer'
import * as actionTypes from './constants'

const initialState = {
    moviesList: [],
    movieDetail: null
}

export const adminReducer = (state = initialState, { type, payload }) => {
    return produce(state, draft => {
        if (type === actionTypes.FETCH_MOVIES_ADMIN) {
            draft.moviesList = payload
        }
        if (type === actionTypes.GET_MOVIE_DETAIL) {
            draft.movieDetail = payload
        }
    })
}