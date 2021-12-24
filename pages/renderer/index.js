import Reconciler from 'react-reconciler';

let notify = null;

const container = {
  root: null,
  data: null,
}

const createTextNode = (content) => {
  const text = {
    id: parseInt(Math.random() * 100000),
    type: '#text',
    props: {},
    content,
    children: null,
  }
  return text
}

const HostConfig = {
  supportsMutation: true,
  getRootHostContext: () => {
  },
  /**
   这是 react-reconciler 想要根据目标创建 UI 元素实例的地方.
   */
  createInstance(
    type,
    newProps,
    rootContainerInstance,
    _currentHostContext,
    workInProgress
  ) {
    const { key } = workInProgress;
    const { children, ...attrs } = newProps;
    const instance = {
      id: parseInt(Math.random() * 100000),
      type,
      props: attrs,
    }
    if (key) {
      instance.key = key;
    }

    // 插入 text 节点
    if (Array.isArray(children)) {
      if (!children.some(item => typeof item === 'object')) {
        instance.children = children.map(str => createTextNode(str))
      }
    } else if (typeof children !== 'object') {
      instance.children = [createTextNode(children)]
    }
    return instance;
  },
  createTextInstance: (
    text,
    rootContainerInstance,
    _currentHostContext,
    workInProgress
  ) => {

  },
  appendChildToContainer: (parent, child) => {
    container.root = child
    container.data = { ...child };
  },
  appendChild(parent, child) {
    if (child === undefined) return;
    parent.children = parent.children || []
    parent.children.push(child)
  },
  appendInitialChild: (parent, child) => {
    HostConfig.appendChild(parent, child);
  },
  removeChild(parent, child) {
    const { children } = parent
    const i = children.indexOf(child)
    if (i > -1) {
      children.splice(i, 1)
    }
  },
  removeChildFromContainer(container, child) {
  },
  insertInContainerBefore(container, child, before) {
  },
  insertBefore(parent, child, before) {
  },
  prepareUpdate(domElement, type, oldProps, newProps) {
    console.log('更新阶段')
    return true;
  },
  commitUpdate(instance, container, type, oldProps, newProps, finishedWork) {
    if (JSON.stringify(oldProps) !== JSON.stringify(newProps)) {
      if (type === 'view') {
        instance.children[0].content = newProps.children;
      }
    }
  },
  commitTextUpdate(textInstance, oldText, newText) {

    textInstance.children = newText
  },
  finalizeInitialChildren() {
  },
  getChildHostContext: () => {
  },
  getPublicInstance() {
  },
  resetAfterCommit(container) {
    if (notify) {
      notify.updated(container.data)
    }
  },
  shouldSetTextContent() {
    return false
  },
  prepareForCommit() {
  },
  clearContainer() {
  },
};

const reconcilerInstance = Reconciler(HostConfig)

let rootContainerInstance = null

export function render(element, { mounted, updated, created }) {
  if (!rootContainerInstance) {
    rootContainerInstance = reconcilerInstance.createContainer(container, false, false)
  }
  return reconcilerInstance.updateContainer(element, rootContainerInstance, null, () => {
    notify = { mounted, updated, created }
    mounted(container.data)
  })
}
