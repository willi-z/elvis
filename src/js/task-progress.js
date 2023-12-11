const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max);
};

export class TaskProgress extends HTMLElement {
  
  constructor() {
    // Always call super first in constructor
    super();
  }
  
  connectedCallback() {
    let now = new Date(this.getAttribute('now') || Date.now());
    let start = new Date(this.getAttribute('start') || Date.now());
    let end = new Date(this.getAttribute('end') || Date.now());
    let avaibleTime = Math.ceil(end.getTime() - start.getTime());
    let pastTime = Math.floor(now.getTime() - start.getTime());
    let status = pastTime /avaibleTime*100;
    status = Math.round(status);
    status = clamp(status, 0, 100);
    let content = `${status}%`;
    if (status < 100) {
      let day2ms = 1000 * 60 * 60 * 24;
      let monthLeft = Math.floor((avaibleTime - pastTime) / day2ms / 31);
      content += ` (${monthLeft} M)`;
    }
    this.innerHTML = content;
  }

  static get observedAttributes() {
    return ['start', 'end', 'now'];
  }
}