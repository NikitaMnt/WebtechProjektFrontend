import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })

  // Test, um zu überprüfen, ob die Komponente existiert
  it('component is a Vue instance', () => {
    const wrapper = mount(HelloWorld)
    expect(wrapper.vm).toBeTruthy()
  })

  // Test, um zu überprüfen, ob die richtige Nachricht angezeigt wird
  it('displays the correct message', () => {
    const message = 'Test Message'
    const wrapper = mount(HelloWorld, { props: { msg: message } })
    expect(wrapper.text()).toContain(message)
  })

  // Test, um zu überprüfen, ob die Nachricht in der richtigen HTML-Tag angezeigt wird
  it('displays the message in a h1 tag', () => {
    const message = 'Test Message'
    const wrapper = mount(HelloWorld, { props: { msg: message } })
    expect(wrapper.get('h1').text()).toBe(message)
  })
})