import React from 'react'

export default class Panel extends React.PureComponent {
  constructor(...args) {
    super(...args)
    this.state = { html: '' }
    this.onAddHTML = this.onAddHTML.bind(this)
  }

  componentDidMount() {
    const { channel, api } = this.props
    // Listen to the html and render it.
    channel.on('storybook/html/add_html', this.onAddHTML)

    // Clear the current html on every story change.
    this.stopListeningOnStory = api.onStory(() => {
      this.onAddHTML('')
    })
  }

  // This is some cleanup tasks when the html panel is unmounting.
  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory()
    }

    this.unmounted = true
    const { channel } = this.props
    channel.removeListener('storybook/html/add_html', this.onAddHTML)
  }

  onAddHTML(html) {
    this.setState({ html })
  }

  render() {
    const { active } = this.props

    return active
      ? React.createElement(
          'pre',
          {
            className: 'addon-html-container',
            style: {
              padding: 10,
              boxSizing: 'border-box',
              width: 'calc(100% - 20px)',
              background: 'rgba(0,0,0,0.05)',
              borderRadius: 4,
              margin: 10
            }
          },
          this.state.html
        )
      : null
  }
}
