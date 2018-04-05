import {combineReducers} from 'redux';
import {indexRedux} from './indexRudex';
import { singersRedux} from './singerRudex';
import { rankRudex} from './rankRudex';
import { detailRudex} from './detailRudex';
import { starsRudex} from './starsRudex';
import { playRudex} from './playRudex';
import { searchRudex} from './searchRudex';


export default combineReducers({ indexRedux, singersRedux, rankRudex, detailRudex, starsRudex, playRudex, searchRudex})
