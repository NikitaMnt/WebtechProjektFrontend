import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RegisterView from '@/views/RegisterView.vue'
import axios from 'axios'

// Mock für axios
axios.post = () => Promise.resolve({ data: {} })

test('RegisterView.vue', () => {
  // Test, ob das Formular gerendert wird
  const wrapper = mount(RegisterView)
  expect(wrapper.find('.register-form').exists()).toBe(true)

  // Test, ob die Eingabefelder gerendert werden
  expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  expect(wrapper.find('input[type="email"]').exists()).toBe(true)
  expect(wrapper.find('input[type="password"]').exists()).toBe(true)

  // Test, ob der Registrierungsbutton gerendert wird
  expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
})