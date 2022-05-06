import React from 'react'
import {Editor} from './index'

export default {
  title: 'Editor',
  component: Editor,
  argTypes: {},
}

const Template = args => {
  return (
    <Editor {...args} />
  )
}

export const _Editor = Template.bind({})
_Editor.args = {}
