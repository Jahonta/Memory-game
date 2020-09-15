export const OPTIONS = [4, 6, 8, 10, 12];

export const render = (parent, child) => {
  if (!parent, !child) {
    return;
  }
  parent.append(child);
}

export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};
