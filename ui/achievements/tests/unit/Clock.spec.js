import { describe, expect, test, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Clock from '../../src/components/Clock.vue';

describe('Clock.vue tests', () => {



    test('Renders', () => {

      const wrapper = mount(Clock);
  
      expect(wrapper.find('#sessionTime').text()).toContain('Session ends in:');    //checks that clock text is rendering
      
    })



})