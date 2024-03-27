import { serialHandler } from './serial-handler.js';

class WebSerialDemoApp {
  constructor() {
    this.connectButtonElem = document.getElementById('connect-to-serial');
    this.messageButtons = document.querySelectorAll('.message-button');
    this.messageInput = document.getElementById('message-input');
    this.submitButton = document.getElementById('submit-button');
    this.serialMessagesContainer = document.getElementById('serial-messages-container');

    this.connectButtonElem.addEventListener('pointerdown', async () => {
      await serialHandler.init();
      alert("Testing");

      this.messageButtons.forEach((button) => {
          button.removeAttribute('disabled');
      });
    })

    this.messageButtons.forEach((button) => {
      button.addEventListener('pointerdown', () => {
        serialHandler.write(String(button.dataset.value));
        this.getSerialMessage();
      })
    })
  }
  
  async getSerialMessage() {
    const now = new Date();
    const listElement = document.createElement('li');

    listElement.innerText = `Message received at ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}.${now.getMilliseconds()}: ${await serialHandler.read()}`;
    this.serialMessagesContainer.appendChild(listElement);
  }
}

new WebSerialDemoApp();
