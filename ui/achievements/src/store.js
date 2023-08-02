import { createStore } from 'vuex'
import streamStore from './modules/streamStore.js'
import dataStore from './modules/dataStore.js'
import uiStore from './modules/uiStore.js'
import commandStore from './modules/commandStore.js'
import loggingStore from './modules/logging.js'
import achievementStore from './modules/achievementStore.js'

const store = createStore({
    modules:{
        stream: streamStore,
        data: dataStore,
        ui: uiStore,
        command: commandStore,
        logging: loggingStore,
        achievements: achievementStore
    }
})

export default store;