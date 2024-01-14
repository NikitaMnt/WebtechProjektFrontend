import { mount } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils';
import UserTodosView from '@/path-to-UserTodosView-component' // Replace with the actual path to the UserTodosView component

describe('UserTodosView', () => {
    it('speichert ein Todo', async () => {
        const wrapper = mount(UserTodosView)

        // Simulieren Sie das Eingeben eines Todo-Titels
        await wrapper.find('input').setValue('Neues Todo')

        // Simulieren Sie das Klicken auf den Speichern-Button
        await wrapper.find('button[type="submit"]').trigger('click')

        // Überprüfen Sie, ob das Todo in der Liste der Todos angezeigt wird
        expect(wrapper.text()).toContain('Neues Todo')
    })

    it('löscht ein Todo', async () => {
        const wrapper = mount(UserTodosView)

        // Fügen Sie ein Todo zur Liste hinzu
        wrapper.vm.todos.push({ taetigkeit: 'Zu löschendes Todo', isEditing: false })
        await wrapper.vm.$nextTick()

        // Simulieren Sie das Klicken auf den Löschen-Button
        await wrapper.findAll('button').at(2).trigger('click') // Der dritte Button ist der Löschen-Button

        // Überprüfen Sie, ob das Todo nicht mehr in der Liste der Todos angezeigt wird
        expect(wrapper.text()).not.toContain('Zu löschendes Todo')
    })
})