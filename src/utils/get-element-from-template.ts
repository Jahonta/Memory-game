export const getElementFromTemplate = (selector: string): HTMLElement => {
  const template = document.querySelector(selector)! as HTMLTemplateElement;
  const content = template.content;
  const element = content.firstElementChild as Node;
  return element.cloneNode(true) as HTMLElement;
}
