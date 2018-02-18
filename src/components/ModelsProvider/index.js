import PT from 'prop-types'
import React from 'react'

import mkTasks from '../../models/tasks'

const STORAGE_KEY = 'TIMERS_V2'

class ModelsProvider extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)

    const input = this.restoreModels()

    this.models = {
      tasks: mkTasks({
        input: input
          ? input.tasks
          : null
      })
    }

    window.__MODELS__ = this.models

    window.addEventListener('unload', this.storeModels)
  }

  storeModels = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      tasks: this.models.tasks.serialize()
    }))
  }

  restoreModels = () => {
    const storedValue = window.localStorage.getItem(STORAGE_KEY)
    return storedValue
      ? JSON.parse(storedValue)
      : storedValue
  }

  getChildContext = () => ({
    models: this.models
  })

  render () {
    return this.props.children
  }
}

ModelsProvider.childContextTypes = {
  models: PT.object.isRequired
}

export default ModelsProvider
