export default class GoogleAnalytics {
  static eventHandler(eventCategory, eventAction, eventLabel, eventValue) {
    const event = {
      event: 'createGAEvent',
      eventCategory,
      eventAction,
      eventLabel,
      eventValue
    };
    return dataLayer.push(event);
  }
}
