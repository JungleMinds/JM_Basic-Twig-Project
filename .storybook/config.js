import { configure, addDecorator } from '@storybook/html'
import { withKnobs } from '@storybook/addon-knobs'
import { withHTML } from './utils/html'

addDecorator(withHTML())

addDecorator(withKnobs())

addDecorator((story, config) => {
  let event
  if (typeof Event === 'function') {
    event = new Event('reload')
  } else {
    event = document.createEvent('Event')
    event.initEvent('reload', true, true)
  }

  window.dispatchEvent(event)

  return story()
})

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
