import * as mobx from 'mobx'

const mkViewModel = ({ props }) => {
  const vm = mobx.observable({
    showTagInput: false,

    task: mobx.computed(() => props.task),
    tags: mobx.computed(() => props.task.tags),

    handleKeyDown: mobx.action((e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()
        vm.showTagInput = true
      }
    }),

    handleTagInputBlur: mobx.action(() => {
      vm.showTagInput = false
    }),

    focus: () => {
      vm._list.focus()
    },

    _list: null,
    setListRef: mobx.action((ref) => {
      vm._list = ref
    })
  })

  return vm
}

export default mkViewModel
