const rules = {
  name: [
    v => !!v || 'Name is required'
  ],
  email: [
    v => !!v || 'E-mail is required',
    v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) || 'E-mail must be valid'
  ],
  password: [
    v => !!v || 'Password is required'
  ]
}

//

const props = {
  isLoading: {
    type: Boolean,
    default: false
  }
}

const data = () => ({
  isValid: false,
  formData: {
    name: null,
    email: null,
    password: null
  },
  rules
})

const methods = {
  submit () {
    const { form } = this.$refs

    if (!form.validate()) {
      return false
    }

    this.$emit('submit', this.formData)
  }
}

export default {
  name: 'SignupForm',
  data,
  props,
  methods
}
