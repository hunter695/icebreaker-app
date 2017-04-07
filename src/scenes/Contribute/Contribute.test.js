import React from 'react'
import renderer from 'react-test-renderer'
import Contribute from './'

describe('<Contribute />', () => {
  it('renders UI', () => {
    const tree = renderer.create(<Contribute />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
