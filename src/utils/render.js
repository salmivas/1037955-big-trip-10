const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREBEGIN: `beforebegin`,
  BEFOREEND: `beforeend`,
};

const containersSelector = {
  AFTERHEADERS: {
    switchMenu: () => document.querySelector(`.trip-controls h2:first-child`),
    filterEvents: () => document.querySelector(`.trip-controls h2:last-child`),
    tripEvents: () => document.querySelector(`.trip-events h2`),
  },
  tripEvents: () => document.querySelector(`.trip-events`),
  tripInfo: () => document.querySelector(`.trip-info`),
  tripDays: () => document.querySelector(`.trip-days`),
  getTripEventsListSelector: (numberOfListElement) => {
    return document.querySelector(`.day:nth-child(${numberOfListElement}) .trip-events__list`);
  },
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element.getElement());
      break;
    case RenderPosition.AFTEREND:
      container.after(element.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(element.getElement());
      break;
    case RenderPosition.BEFOREGEGIN:
      container.before(element.getElement());
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export {
  createElement,
  render,
  remove,
  replace,
  RenderPosition,
  containersSelector,
};
