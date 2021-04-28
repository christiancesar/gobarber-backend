"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let updateProfileService;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfileService = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com'
    });
    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@example.com');
  });
  it('should not be able to update the profile from non-existing user', async () => {
    await expect(updateProfileService.execute({
      user_id: 'non-existing-user-id',
      name: 'John Doe',
      email: 'johndoe@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'John Travolta',
      email: 'johntravolta@example.com',
      password: '123456'
    });
    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123'
    });
    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'jhontre@example.com',
      old_password: '123123',
      password: '123123'
    });
    expect(updateUser.password).toBe('123123');
  });
  it('should be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'jhontre@example.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'jhontre@example.com',
      old_password: 'wrong-old-password',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});