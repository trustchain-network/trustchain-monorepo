import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';
import { MinaService } from '../mina.service';
import { KeysService } from 'src/providers/keys/keys.service';
import { PrivateKey } from 'o1js';

export type TDeploySmartContractInput = {
  userId: string;
  subscriptionId: string;
};

export class DeploySmartContractEvent implements IEvent {
  constructor(readonly payload: TDeploySmartContractInput) {}
}

@EventsHandler(DeploySmartContractEvent)
export class DeploySmartContractEventHandler
  implements IEventHandler<DeploySmartContractEvent>
{
  constructor(
    private readonly mina: MinaService,
    private readonly keys: KeysService,
  ) {}

  async handle({
    payload: { userId, subscriptionId },
  }: DeploySmartContractEvent): Promise<void> {
    const key = await this.keys
      .findOne({ subscriptionId, userId })
      .catch(() => null);
    if (key) {
      return;
    }

    const zkAppKey = PrivateKey.random();

    await this.keys.create({
      key: zkAppKey.toBase58(),
      publicKey: zkAppKey.toPublicKey().toBase58(),
      userId,
      subscriptionId,
    });

    await this.mina.deployContract(zkAppKey);
  }
}
