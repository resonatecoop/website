/* global fetch */

const html = require('nanohtml')
const Component = require('nanocomponent')
const raw = require('nanohtml/raw')
const input = require('@resonate/input-element')
const Button = require('@resonate/button-component')
const messages = require('../../messages')
const logger = require('nanologger')
const log = logger('form:create')

const isEmpty = require('validator/lib/isEmpty')
const isLength = require('validator/lib/isLength')
const isEmail = require('validator/lib/isEmail')
const validateFormdata = require('validate-formdata')
const nanostate = require('nanostate')
const inputField = require('../../elements/input-field')

/**
 * Little contact form to send a quick message to support team
 */

class ContactForm extends Component {
  constructor (id, state, emit) {
    super(id)

    this.emit = emit
    this.state = state

    this.local = state.components[id] = Object.create({
      machine: nanostate.parallel({
        form: nanostate('idle', {
          idle: { submit: 'submitted' },
          submitted: { valid: 'data', invalid: 'error' },
          data: { reset: 'idle', submit: 'submitted' },
          error: { reset: 'idle', submit: 'submitted', invalid: 'error' }
        }),
        request: nanostate('idle', {
          idle: { start: 'loading' },
          loading: { resolve: 'data', reject: 'error' },
          data: { start: 'loading' },
          error: { start: 'loading', stop: 'idle' }
        }),
        loader: nanostate('off', {
          on: { toggle: 'off' },
          off: { toggle: 'on' }
        })
      })
    })

    this.local.data = {
      reason: 'volunteer'
    }

    this.local.machine.on('form:reset', () => {
      this.validator = validateFormdata()
      this.form = this.validator.state
    })

    this.local.machine.on('request:start', () => {
      this.loaderTimeout = setTimeout(() => {
        this.local.machine.emit('loader:toggle')
      }, 300)
    })

    this.local.machine.on('request:resolve', () => {
      clearTimeout(this.loaderTimeout)
    })

    this.local.machine.on('form:valid', async () => {
      log.info('Form is valid')

      try {
        this.local.machine.emit('request:start')

        const payload = this.local.data
        const url = new URL('/', 'https://contact.api.resonate.coop')

        const response = await (await fetch(url.href, { body: payload, method: 'POST' })).json()

        console.log(response)

        this.local.machine.emit('request:resolve')
      } catch (err) {
        this.local.machine.emit('request:reject')
        this.emit('error', err)
      }
    })

    this.local.machine.on('form:invalid', () => {
      log.info('Form is invalid')

      const invalidInput = document.querySelector('.invalid')

      if (invalidInput) {
        invalidInput.focus({ preventScroll: false }) // focus to first invalid input
      }
    })

    this.local.machine.on('form:submit', () => {
      log.info('Form has been submitted')

      const form = this.element.querySelector('form')

      for (const field of form.elements) {
        const isRequired = field.required
        const name = field.name || ''
        const value = field.value || ''

        if (isRequired) {
          this.validator.validate(name, value)
        }
      }

      this.rerender()

      if (this.form.valid) {
        return this.local.machine.emit('form:valid')
      }

      return this.local.machine.emit('form:invalid')
    })

    this.validator = validateFormdata()
    this.form = this.validator.state
  }

  createElement (props) {
    const pristine = this.form.pristine
    const errors = this.form.errors
    const values = this.form.values
    const state = this.state
    const emit = this.emit

    for (const [key, value] of Object.entries(this.local.data)) {
      values[key] = value
    }

    const data = {
      volunteer: {
        title: 'Volunteering',
        body: 'If you\'d like to help out on the project please fill out the form below, sharing a few details about your background and how you\'d like to get involved.',
        fields: [
          {
            type: 'email',
            labelText: 'E-mail',
            value: values.email
          },
          {
            type: 'textarea',
            value: values.message,
            placeholder: 'Write your message here'
          }
        ]
      },
      feedback: {
        title: 'Beta app Feedback',
        fields: [
          {
            type: 'email',
            labelText: 'E-mail',
            value: values.email
          },
          {
            type: 'textarea',
            value: values.message,
            placeholder: 'Share your thoughts or technical challenges with the beta app here.'
          }
        ]
      },
      general: {
        fields: [
          {
            type: 'text',
            value: values.subject,
            placeholder: 'Subject',
            name: 'subject'
          },
          {
            type: 'textarea',
            value: values.message,
            placeholder: 'Write your message here'
          }
        ]
      },
      copyright: {
        fields: [],
        body: {
          html: `
            <p>If you believe that content on Resonate infringes your copyright, please contact our Copyright Team on copyright [at] resonate.is and include the following  information. </p>
              <ol type="1">
              <li>The full URL and/or name/artist of the track(s) concerned</li>
              <li>Your full name, address, email and telephone number</li>
              <li>Explain how the track(s) infringe(s) your copyright
              Include the following statement: "I have a good faith belief that use of the copyrighted work described above is not authorized by the copyright owner (or by a third party who is legally entitled to do so on behalf of the copyright owner) and is not otherwise permitted by law. </li><li>I hereby confirm that I believe the track(s) identified in this email infringe(s) my copyright"</li>
              <li>Scanned copy of your physical signature</li>
              </ol>
              <p>In accordance with the Digital Millennium Copyright Act (DMCA), we only accept copyright complaints from content owners or someone officially authorized to act on their behalf.</p>

              <p>By submitting this takedown information, you consent to having your information revealed to parties involved in the case. </p>
          `
        }
      }
    }[values.reason]

    const selectInput = (reason) => {
      function renderOptions (handler, options, selected, name) {
        const option = ({ value, label, disabled = false }) => {
          return html`
            <option value=${value} disabled=${disabled} selected=${selected === value}>
              ${label}
            </option>
          `
        }
        return html`
          <select class="form-control" onchange=${handler} name=${name}>
            ${options.map(option)}
          </select>
        `
      }

      const options = [
        { value: 'feedback', label: 'Feedback' },
        { value: 'volunteer', label: 'Volunteer' },
        { value: 'general', label: 'General' },
        { value: 'copyright', label: 'Copyright Violation' }
      ]

      const onchange = (e) => {
        this.validator.validate(e.target.name, e.target.value)
        this.local.data.reason = e.target.value
        this.rerender()
      }

      return renderOptions(onchange, options, reason, 'reason')
    }

    const submitButton = new Button('submit-button', state, emit)

    const renderForm = (data) => {
      const body = typeof data.body === 'object' ? raw(data.body.html) : data.body
      const fields = []

      data.fields.forEach(field => {
        if (field.type === 'textarea') {
          const invalid = errors.message && !pristine.message

          const attrs = {
            name: 'message',
            maxlength: 200,
            rows: 4,
            class: `w-100 db bn bg-black white pa2 ma0 ba bw1 ${invalid ? 'invalid' : 'valid'}`,
            placeholder: field.placeholder,
            required: true,
            text: values.message,
            onchange: (e) => {
              this.validator.validate(e.target.name, e.target.value)
              this.local.data[e.target.name] = e.target.value
              this.rerender()
            }
          }

          const el = inputField(html`<textarea ${attrs}>${values.message}</textarea>`, this.form)({
            labelText: 'Message',
            inputName: 'message',
            displayErrors: true
          })

          fields.push(el)
        } else {
          const name = field.name || field.type
          const el = inputField(input({
            type: field.type,
            name: name,
            invalid: errors[name] && !pristine[name],
            placeholder: field.placeholder,
            value: values[name],
            onchange: (e) => {
              this.validator.validate(e.target.name, e.target.value)
              this.local.data[e.target.name] = e.target.value
              this.rerender()
            }
          }), this.form)({
            labelText: field.labelText,
            inputName: name,
            displayErrors: true
          })
          fields.push(el)
        }
      })

      if (fields.length) {
        const el = submitButton.render({
          type: 'submit',
          prefix: 'bg-white ba bw b--dark-gray f5 b pv3 ph5 grow',
          style: 'none',
          size: 'none',
          text: 'Send',
          onClick: (e) => {
            setTimeout(() => submitButton.disable('Please wait...'), 0)
          }
        })

        fields.push(el)
      }

      return html`
        <div class="form-body">
          ${body}
          ${fields.map((elem) => elem)}
        </div>
      `
    }

    return html`
      <div class="flex flex-column w-100 pt3 pb6">
        ${messages(this.state, this.form)}

        <form novalidate onsubmit=${(e) => { e.preventDefault(); this.local.machine.emit('form:submit') }}>
          <fieldset class="bn ma0 pa0">
            <legend class="lh-title f3 fw4 mb3">Contact</legend>
            ${selectInput(values.reason)}
            ${renderForm(data)}
          </fieldset>
        </form>
      </div>
    `
  }

  load () {
    this.validator.field('reason', (data) => {
      if (isEmpty(data)) return new Error('Reason is required')
      if (!['feedback', 'volunteer', 'general', 'copyright'].includes(data)) {
        return new Error('Reason is invalid')
      }
    })
    this.validator.field('subject', { required: false })
    this.validator.field('email', (data) => {
      if (isEmpty(data)) return new Error('Email is required')
      if (!isEmail(data)) return new Error('Email is invalid')
    })
    this.validator.field('message', (data) => {
      if (isEmpty(data)) return new Error('Message is required')
      if (!isLength(data, { min: 0, max: 200 })) return new Error('Message should be no more than 200 characters')
    })
  }

  unload () {
    if (this.local.machine.state.form !== 'idle') {
      this.local.machine.emit('form:reset')
    }
  }

  update (props) {
    return false
  }
}

module.exports = ContactForm
