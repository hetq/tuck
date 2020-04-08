import test from 'ava'

import sinon from 'sinon'

import { mount } from '@vue/test-utils'

import UserLoginForm from '@/components/UserLoginForm'

// assets

const FORM_VALID = {
  email: 'nyx@yahoo.com',
  password: 'pwd'
}

const FORM_INVALID = {
  email: 'not email',
  password: ''
}

// hooks

test.beforeEach((t) => {
  const listeners = {
    submit: sinon.spy()
  }

  const wrapper = mount(UserLoginForm, { listeners })

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
    .find({ ref: 'email-input' })
    .find('input')
    .setValue(FORM_VALID.email)

  wrapper
    .find({ ref: 'password-input' })
    .find('input')
    .setValue(FORM_VALID.password)

  wrapper
    .find('form')
    .trigger('submit')

  t.true(listeners.submit.calledOnceWith(FORM_VALID))
})

test('not submit empty', (t) => {
  const { wrapper, listeners } = t.context

  wrapper
    .find('button')
    .trigger('click')

  t.true(listeners.submit.notCalled)
})

test('not submit invalid', (t) => {
  const { wrapper, listeners } = t.context

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
