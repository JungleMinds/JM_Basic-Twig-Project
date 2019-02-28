import { createElement } from 'react'
import addons, { makeDecorator } from '@storybook/addons'
import Panel from './Panel'

addons.register('storybook/html', api => {
  const channel = addons.getChannel()
  addons.addPanel('storybook/html/panel', {
    title: 'HTML',
    render: ({ active }) =>
      createElement(Panel, {
        channel,
        api,
        active
      })
  })
})
