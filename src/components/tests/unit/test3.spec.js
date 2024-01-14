import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserTodosView from '@/views/UserTodosView.vue'
import axios from 'axios'

// Mock für axios
let postCalled = false
let getCalled = false
let deleteCalled = false
axios.post = () => { postCalled = true; return Promise.resolve({ data: {} }) }
axios.get = () => { getCalled = true; return Promise.resolve({ data: [] }) }
axios.delete = () => { deleteCalled = true; return Promise.resolve() }

test('UserTodosView.vue', async () => {
  const wrapper = mount(UserTodosView, {
    global: {
      mocks: {
        $route: {
          params: { username: 'testuser' }
        }
      }
    }
  })

  // Test für addTodo Methode
  wrapper.vm.newTodo = 'Test Todo'
  await wrapper.vm.addTodo()
  expect(postCalled).toBe(true)
  expect(wrapper.vm.todos).toHaveLength(1)
  expect(wrapper.vm.newTodo).toBe('')

  // Test für removeTodo Methode
  await wrapper.vm.removeTodo(0)
  expect(deleteCalled).toBe(true)
  expect(wrapper.vm.todos).toHaveLength(0)

  // Test für editTodo und stopEditingTodo Methoden
  wrapper.vm.todos.push({ id: 1, taetigkeit: 'Test Todo', isEditing: false })
  wrapper.vm.editTodo(0)
  expect(wrapper.vm.todos[0].isEditing).toBe(true)
  wrapper.vm.stopEditingTodo(0)
  expect(wrapper.vm.todos[0].isEditing).toBe(false)
})