import { Test, TestingModule } from '@nestjs/testing';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';

const initialPlans = [
  {
    name: 'Free',
    description: 'Free plan',
    price: 0,
    currency: 'usd',
    duration: 1,
    durationType: 'month',
  },
  {
    name: 'Premium',
    description: 'Premium plan',
    price: 9.99,
    currency: 'usd',
    duration: 1,
    durationType: 'month',
  },
  {
    name: 'Enterprise',
    description: 'Enterprise plan',
    price: 99.99,
    currency: 'usd',
    duration: 1,
    durationType: 'month',
  },
];
describe('PlansService', () => {
  let service: PlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlansService],
    }).compile();

    service = module.get<PlansService>(PlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a plan', async () => {
      const createPlanDto: CreatePlanDto = initialPlans[0];
      const plan = await service.create(createPlanDto);
      expect(plan).toBeDefined();
      expect(plan.name).toBe(createPlanDto.name);
      expect(plan.description).toBe(createPlanDto.description);
      expect(plan.price).toBe(createPlanDto.price);
      expect(plan.currency).toBe(createPlanDto.currency);
      expect(plan.duration).toBe(createPlanDto.duration);
      expect(plan.durationType).toBe(createPlanDto.durationType);
    });
  });

  describe('Existing plans', () => {
    beforeAll(async () => {
      for (const plan of initialPlans) {
        await service.create(plan);
      }
    });
    describe('findOne', () => {
      it('should return a plan', async () => {
        const plan = await service.findOne({ name: initialPlans[0].name });
        expect(plan).toBeDefined();
        expect(plan?.name).toBe(initialPlans[0].name);
      });
    });
    describe('findAll', () => {
      it('should return an array of plans', async () => {
        const plans = await service.findAll();
        expect(plans).toBeDefined();
        expect(plans.length).toBe(initialPlans.length);
      });
    });
    describe('update', () => {
      it('should update a plan', async () => {
        const updatedPlan = await service.update(initialPlans[0].name, {
          description: 'New description',
        });
        expect(updatedPlan).toBeDefined();
        expect(updatedPlan?.description).toBe('New description');
      });
    });
  });
});
