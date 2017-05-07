import React from 'react'
import renderer from 'react-test-renderer'
import webdriver, { By } from 'selenium-webdriver'
import { path } from 'chromedriver'
import chrome from 'selenium-webdriver/chrome'
import Home from './'


const service = new chrome.ServiceBuilder(path).build()
chrome.setDefaultService(service)

const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build()

describe('<Home />', () => {
  it('renders initial UI', () => {
    const tree = renderer.create(<Home />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('doesn\'t have a LineDisplayCard until the "break the ice" button is clicked', async () => {
    driver.navigate().to('http://localhost:8080')
    expect(await driver.findElements(By.css('.line-display-card')).length === 0)
    driver.findElement(By.css('button')).click()
    expect(await driver.findElements(By.css('.line-display-card')).length === 1)
  })
})
