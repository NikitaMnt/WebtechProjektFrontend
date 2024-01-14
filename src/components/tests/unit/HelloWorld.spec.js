import { test, expect } from 'vitest'
import { shallowMount} from '@vue/test-utils'
import RegisterView from '@/views/RegisterView.vue'
import axios from 'axios'



// Erstellen Sie eine Spionfunktion für axios.post


test('RegisterView.vue', () => {
  let wrapper = shallowMount(RegisterView)
  const textelements = wrapper.find("h2").text()
  expect(textelements).toEqual("Registrierung")
})




    