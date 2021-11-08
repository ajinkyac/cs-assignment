export function findAncestor(element: any, className: string): any {
    element = element.parentNode;
    while ((element) && element.className.indexOf(className) < 0) {
        return element;
    }
}
