export default class EventHandler {
  constructor() {
    const event = {
      event: 'createGAEvent',
      eventCategory: 'Home page interaction',
      eventAction: 'I want to',
      eventLabel: 'Example category',
      eventValue: 23
    };

    dataLayer.push(event);

    console.log(event);
  }
}
