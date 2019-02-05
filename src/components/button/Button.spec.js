import Button from './Button'
import path from 'path'

describe('Button', () => {
  beforeEach(async () => {
    await render(path.join(__dirname, './button.twig'), {
      arr: [1, 2, 3, 4, 'TestButton']
    })
    global.console.log = jest.fn()
  })

  it('should output the innerText to the console', () => {
    new Button()
    expect(global.console.log).toHaveBeenCalledWith('TestButtonTestButton')
  })

  it('should do something', () => {
    const component = new Button()
    component.doSomething()
    expect(global.console.log).toHaveBeenCalledWith('Something!')
  })
})
