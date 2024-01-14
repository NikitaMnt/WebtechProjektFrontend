import { mount } from '@vue/test-utils'
import RegisterView from '@/path-to-RegisterView-component' 
import axios from 'axios'

jest.mock('axios')

describe('RegisterView', () => {
  it('zeigt eine Fehlermeldung an, wenn die Passwörter nicht übereinstimmen', async () => {
    const wrapper = mount(RegisterView)

    // Füllen Sie die Formularfelder aus
    await wrapper.find('input[type="text"]').setValue('testuser')
    await wrapper.find('input[type="email"]').setValue('testuser@example.com')
    await wrapper.find('input[type="password"]').setValue('password1')
    await wrapper.find('input[type="password"]').setValue('password2')

    // Simulieren Sie das Absenden des Formulars
    await wrapper.find('form').trigger('submit.prevent')

    // Überprüfen Sie, ob die richtige Fehlermeldung angezeigt wird
    expect(window.alert).toHaveBeenCalledWith('Die Passwörter stimmen nicht überein!')
  })

  it('sendet eine Anfrage an die API, wenn das Formular korrekt ausgefüllt ist', async () => {
    const wrapper = mount(RegisterView)

    // Füllen Sie die Formularfelder aus
    await wrapper.find('input[type="text"]').setValue('testuser')
    await wrapper.find('input[type="email"]').setValue('testuser@example.com')
    await wrapper.find('input[type="password"]').setValue('password')
    await wrapper.find('input[type="password"]').setValue('password')

    // Simulieren Sie das Absenden des Formulars
    await wrapper.find('form').trigger('submit.prevent')

    // Überprüfen Sie, ob eine Anfrage an die API gesendet wurde
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/users', {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password',
    })
  })
})