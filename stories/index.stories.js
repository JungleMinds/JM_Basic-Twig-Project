import { storiesOf } from '@storybook/html'
import { text } from '@storybook/addon-knobs'

// load app
import '../src/app'

// load components
import icon from '../src/components/icon/icon.twig'
import button from '../src/components/button/button.twig'

const stories = storiesOf('Demo', module)

stories
  .add('icon', () => icon({ label: 'i' }))
  .add('button', () =>
    button({ arr: [1, 2, 3, 4, text('example', 'testText')] })
  )
