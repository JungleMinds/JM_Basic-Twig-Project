import Button from '../components/button/Button'

const DEV = process.env.NODE_ENV === 'development'
const COMMIT = process.env.COMMIT || 'N.A.'
const VERSION = process.env.VERSION || 'N.A.'

function ready(init) {
  const motd = () => {
    console.info(`
    __            __        _                __   __
     | |  | |\\ | / _\` |    |__  |\\/| | |\\ | |  \\ /__\`
  \\__/ \\__/ | \\| \\__> |___ |___ |  | | | \\| |__/ .__/
  by: Jungle Minds
  Version: ${VERSION}
  Commit: ${COMMIT}
  `)
    init()
  }
  if (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  ) {
    motd()
  } else {
    document.addEventListener('DOMContentLoaded', motd)
  }
  if (DEV) {
    window.addEventListener('reload', init)
  }
}

ready(function() {
  console.info('New version loaded.')
  new Button()
})
