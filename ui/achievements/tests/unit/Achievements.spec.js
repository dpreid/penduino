import { describe, expect, test, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex';
import Achievements from '../../src/components/Achievements.vue';

import achievementStore from '../../src/modules/achievementStore.js'
import loggingStore from '../../src/modules/logging.js';


const createVuexStore = () => 

    createStore({
        modules:{
            achievements: achievementStore,
            logging: loggingStore,
        }
    });


describe('Achievements.vue tests', () => {

    test('Renders', () => {

        const store = createVuexStore();
        const wrapper = mount(Achievements, {
        global:{
            plugins: [store]
            }
        });
  
      expect(wrapper.find('#achievements-button').exists()).toBe(true);
    
    })

    test('Achievement renders notification after achievement reached', async () => {
        const store = createVuexStore();
        const wrapper = mount(Achievements, {
        global:{
            plugins: [store]
            }
        });

        expect(wrapper.find('#achievement-notification').exists()).toBe(false);

        await store.dispatch('setAchievementCompleted', 'data-max');

        expect(wrapper.find('#achievement-notification').exists()).toBe(true);
        expect(store.getters.getAchievementsCompleted).toContainEqual('data-max');
        
    })

    test('Achievement gets checkbox ticked', async () => {
        const store = createVuexStore();
        const wrapper = mount(Achievements, {
        global:{
            plugins: [store]
            }
        });

        await store.dispatch('setAchievementCompleted', 'data-max');

        const checkbox = wrapper.find('#data-max');
        expect(checkbox.element.checked).toBe(true);
    })


    test('Hardware investigator badge - only 1 achieved', async() => {
        const store = createVuexStore();
        const wrapper = mount(Achievements, {
        global:{
            plugins: [store]
            }
        });
        await store.dispatch('setAchievementCompleted', 'drive-range');
        
        expect(wrapper.vm.hardwareInvestigatorComplete).toBe(false)

    })

    test('Hardware investigator badge - only 3 achieved', async() => {
        const store = createVuexStore();
        const wrapper = mount(Achievements, {
        global:{
            plugins: [store]
            }
        });
        
        await store.dispatch('setAchievementCompleted', 'drive-range');
        await store.dispatch('setAchievementCompleted', 'brake-range');
        await store.dispatch('setAchievementCompleted', 'sampling-range');

        expect(wrapper.vm.hardwareInvestigatorComplete).toBe(false)

    })

    test('Hardware investigator badge - all achieved', async() => {
        const store = createVuexStore();
        const wrapper = mount(Achievements, {
        global:{
            plugins: [store]
            }
        });
        await store.dispatch('setAchievementCompleted', 'drive-range');
        await store.dispatch('setAchievementCompleted', 'brake-range');
        await store.dispatch('setAchievementCompleted', 'sampling-range');
        await store.dispatch('setAchievementCompleted', 'multiple-starts');
        await store.dispatch('setAchievementCompleted', 'multiple-brakes');
        await store.dispatch('setAchievementCompleted', 'calibrate-hardware');
        await store.dispatch('setAchievementCompleted', 'set-load');
        
        expect(wrapper.vm.hardwareInvestigatorComplete).toBe(true)

    })


    test('Data analyst badge - only 1 achieved', async() => {
        const store = createVuexStore();
        const wrapper = mount(Achievements, {
        global:{
            plugins: [store]
            }
        });
        
        await store.dispatch('setAchievementCompleted', 'plot-trig');

        expect(wrapper.vm.dataAnalystComplete).toBe(false)

    })

    test('Data analyst badge - all achieved', async() => {
        const store = createVuexStore();
        const wrapper = mount(Achievements, {
        global:{
            plugins: [store]
            }
        });
        
        await store.dispatch('setAchievementCompleted', 'plot-trig');
        await store.dispatch('setAchievementCompleted', 'plot-correct');
        await store.dispatch('setAchievementCompleted', 'data-max');
        await store.dispatch('setAchievementCompleted', 'download-data');
        await store.dispatch('setAchievementCompleted', 'plot-free');
        await store.dispatch('setAchievementCompleted', 'plot-decay');

        expect(wrapper.vm.dataAnalystComplete).toBe(true)

    })

    test('UI explorer badge - only 1 achieved', async() => {
        const store = createVuexStore();
        const wrapper = mount(Achievements, {
        global:{
            plugins: [store]
            }
        });
        
        await store.dispatch('setAchievementCompleted', 'ruler-size');

        expect(wrapper.vm.uiExplorerComplete).toBe(false)

    })

    test('UI explorer badge - all achieved', async() => {
        const store = createVuexStore();
        const wrapper = mount(Achievements, {
        global:{
            plugins: [store]
            }
        });
        
        await store.dispatch('setAchievementCompleted', 'ruler-size');
        await store.dispatch('setAchievementCompleted', 'auto-command');
        

        expect(wrapper.vm.uiExplorerComplete).toBe(true)

    })



})