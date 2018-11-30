import axios from 'axios'

export const getData = () => ({
    type : 'GET_NOTES'
})

export const addDatas = () => ({
    type : 'ADD_NOTES',
    payload : {
        id : '2',
        date : '12/12/2018',
        notes : 'lorem ipsum jhajshdkjahsdjhasjhdahsdh gagfgsdfagdf ahagewetyte atas asdasdasdasdasdas'
    }
})