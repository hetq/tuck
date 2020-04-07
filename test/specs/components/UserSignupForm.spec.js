import test from 'ava'

import sinon from 'sinon'

import { mount } from '@vue/test-utils'

import UserSignupForm from '@/components/UserSignupForm'

// assets

const FORM_VALID = {
  name: 'Nyx',
  email: 'nyx@yahoo.com',
  password: 'pwd'
}

const FORM_INVALID = {
  name: '',
  email: 'not email',
  password: ''
}

// hooks

test.beforeEach((t) => {
  const listeners = {
    submit: sinon.spy()
  }

  const wrapper = mount(UserSignupForm, { listeners })

  t.context = {
    listeners,
    wrapper
  }
})

// tests

test('is a Vue instance', (t) => {
  const { wrapper } = t.context

  t.is(wrapper.isVueInstance(), true)
})

test('submit on valid input', (t) => {
  const { wrapper, listeners } = t.context

  wrapper
    .find({ ref: 'name-input' })
    .find('input')
    .setValue(FORM_VALID.name)

  wrapper
    .find({ ref: 'email-input' })
    .find('input')
    .setValue(FORM_VALID.email)

  wrapper
    .find({ ref: 'password-input' })
    .find('input')
    .setValue(FORM_VALID.password)

  wrapper
    .find('button')
    .trigger('click')

  t.true(listeners.submit.calledOnceWith(FORM_VALID))
})

test('not submit empty', (t) => {
  const { wrapper, listeners } = t.context

  wrapper
    .find('button')
    .trigger('click')

  t.true(listeners.submit.notCalled)
})

// TODO: separate each invalid case
test('not submit invalid', (t) => {
  const { wrapper, listeners } = t.context

  wrapper
    .find({ ref: 'name-input' })
    .find('input')
    .setValue(FORM_INVALID.name)

  wrapper
    .find({ ref: 'email-input' })
    .find('input')
    .setValue(FORM_INVALID.email)

  wrapper
    .find({ ref: 'password-input' })
    .find('input')
    .setValue(FORM_INVALID.password)

  wrapper
    .find('button')
    .trigger('click')

  t.true(listeners.submit.notCalled)
})
