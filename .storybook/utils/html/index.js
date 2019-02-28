import addons, { makeDecorator } from '@storybook/addons'

export const withHTML = makeDecorator({
  name: 'withHTML',
  allowDeprecatedUsage: true,
  wrapper: (getStory, context) => {
    const channel = addons.getChannel()

    channel.emit('storybook/html/add_html', getStory(context))

    return getStory(context)
  }
})
