import { UserEntity } from './user.entity';

describe('UserEntity', () => {
  it('should make an user with no fields', () => {
    const user = new UserEntity();
    expect(user).toBeTruthy();
    expect(user.id).toBeUndefined();
    expect(user.email).toBeUndefined();
    expect(user.password).toBeUndefined();
    expect(user.previousPassword).toBeUndefined();
    expect(user.provider).toBeUndefined();
    expect(user.socialId).toBeUndefined();
    expect(user.firstName).toBeUndefined();
    expect(user.lastName).toBeUndefined();
    expect(user.photo).toBeUndefined();
    expect(user.role).toBeUndefined();
    expect(user.status).toBeUndefined();
    expect(user.countryCode).toBeUndefined();
    expect(user.createdAt).toBeUndefined();
    expect(user.updatedAt).toBeUndefined();
    expect(user.deletedAt).toBeUndefined();
  });
});
