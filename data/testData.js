import { faker } from '@faker-js/faker';

export const sunnyUser = {
    userName: 'standard_user',
    password: process.env.PASSWORD,
}

export const lockedUser = {
    userName: 'locked_out_user',
    password: process.env.PASSWORD,
}

export const checkoutDetails={
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode(),
}