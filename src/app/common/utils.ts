export function findAncestor(element: any, className: string): any {
    while ((element = element.parentNode) && element.className.indexOf(className) < 0);
    return element;
}