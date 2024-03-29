export class FakeMailer {
  protected queue: any[] = [];

  public getQueue() {
    return this.queue;
  }

  public getLastEmail() {
    return this.queue.pop();
  }

  public cleanQueue() {
    this.queue = [];
  }

  get queueSize(): number {
    return this.queue.length;
  }

  async sendMail(email): Promise<void> {
    this.queue.push(email);
    await Promise.resolve({});
  }
}
