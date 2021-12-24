const componentConfig = {
  properties: {
    data: {
      type: Object,
    },
  },
  data: {
    type: '',
    props: {},
    children: null,
    content: '',
  },
  observers: {
    data(data) {
      if (!data) {
        return
      }
      const { type, props, children } = this.data
      if (type !== data.type) {
        const { type, props = {}, children = null, content = '' } = data
        this.setData({ type, props, children, content })
      } else {
        this.setData(data)
      }
    },
  },
  lifetimes: {
    attached() {
      if (!this.properties.data) {
        return
      }
      const { type, props = {}, children = [], content = '' } = this.properties.data
      this.setData({ type, props, children, content })
    },
  },
  methods: {},
}

// createHandlers
{
  const handlers = [
    'hzmTap',
  ]
  handlers.forEach((name) => {
    componentConfig.methods[name] = function(e) {
      const { props } = this.data
      if (typeof props[name] === 'function') {
        props[name](e)
      }
    }
  })
}

Component(componentConfig)
