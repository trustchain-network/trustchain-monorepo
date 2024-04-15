class FakeProducts {
  list = jest.fn();
}

class FakeSubscriptions {
  list = jest.fn();
}

export class StripeMock {
  readonly products = new FakeProducts();
  readonly subscriptions = new FakeSubscriptions();
}
