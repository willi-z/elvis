import { Presentation } from './presentation';
import { TaskProgress } from './task-progress';

let presentation = new Presentation();

let customElements = window.customElements;
customElements.define('task-progress', TaskProgress);

presentation.update();