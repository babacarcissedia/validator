# Form validator for web application or API
Inspired from [Laravel validation](https://github.com/laravel/docs/blob/7.x/validation.md).

Dependency free.

If you're building application with ExpressJs and MongoDB then this is definitely something you need to check out.
This is a validation tool that you can use in your every day life as 
The following is also applicable to the whole javascript ecosystem in general

[NPM](https://www.npmjs.com/package/buddy-validator)

![npm](https://img.shields.io/npm/dm/buddy-validator)

## Summary
- Installation
- Validation rules
- Hooks
- Usage on CommonJS
- Usage with VueJS
- Usage with Express/MongoDB
  * with repository pattern 
- Usage in general

## Installation
```bash
// with yarn
yarn add buddy-validator

// with npm
npm install buddy-validator
```

### Add typings for typescript users
```bash
// with yarn
yarn add -D @types/buddy-validator

// with npm
npm install --save-dev @types/buddy-validator
```


## Validation rules
- required
- email
- confirmed
- between
- unique
- exists
- required_unless
- required_with
- greater_than
- after
- regex
- in_array
- min

## Hooks
- after validation
```ts
const v = Validator.make({
    data: {login: '', password: 's€cr€t'},
    rules: { 
        login: 'required',
        password: 'required'
    }
}
v.afterHook((validator) => {
    validator.addError('auth', 'Something is wrong with your credentials input')
})
if (v.fails()) {
    const errors = v.getErrors()
    // would contain
    // {
    //    login: 'Login field is required',
    //    auth: 'something is wrong with your credentials input'
    // }
}

```

## Usage on CommonJS
```js
const { Validator } = require('buddy-validator')
const v = await Validator.make({
  data: {
    name: 'John Doe',
    age: 20,
    
  },
  rules: {
    name: 'required',
    age: 'min:18',
    email: 'required|email'
  }
})
if (v.fails()) {
  const errors = v.getErrors()
}
```


## Usage with VueJS
```vue
// component.vue => template
<template lang="pug">
  .register-page
    h1 Créer votre compte
    form.form(action="/user" method='POST' @submit.prevent="onSubmit")
      .form-field.has-input
        label(for="phone_number") Phone number 
        input(type="text" name="phone_number" id="phone_number" v-model="user.phone_number")
      .form-field.has-input
        label(for="password") Password
        input(type="password" name="password" id="password" v-model="user.password")
      .form-field.has-input
        label(for="password_confirmation") Password confirmation
        input(type="password" name="password_confirmation" id="password_confirmation" v-model="user.password_confirmation")
      .form-actions
        button.button(type="submit") Register
      p
        a(href="/user/login") Already a member ? Login here
</template>
```

```js
// component.vue => script
import Validator from 'buddy-validator'
export default {
  data () {
    return {
      user: {
        phone_number: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  methods: {
    async onSubmit () {
      const v = await Validator.make({
        data: this.user,
        rules: {
            phone_number: 'required|regex:^[0-9]{9,10}$',
            password: 'required|confirmed' 
        },
      })
      if (v.fails()) {
        this.errors = v.getErrors()
        return
      }
      // your axios request here
    }
  }
}
```

## Usage with express 
```ts
import Validator from 'buddy-validator'

const formData = request.body // {first_name, last_name, age}
const v = await Validator.make({
  data: formData,
  rules: {
   note: 'greater_than:10',
   age: function (age) { // 'greater_than:18'
     return new Promise((resolve, reject) => {
       if (age < 18) {
         reject(new Error('Come back next year young blood'))
       } else {
         resolve()
       }  
     })
   },
    first_name: 'required|min:3',
    email: ['required', 'unique:Users'],
    email: function (filter) {
        const email = filter.value        
        if (!value) {
            return Promise.reject(new Error('Email is required'))
        }
        const exists = users.findIndex(user => user.email === value) !== -1
        if (exists) {
            // return Promise.resolve(false) // will know there is an error but will not use your custom error like the line below
            return Promise.reject(new Error(`Email ${value} already exists`))
        }
        return Promise.resolve(true)
    }
  },
  models: {
    Users: {
        exists (filter) {
            const value = filter.email 
            return users.findIndex(user => user.email === value) !== -1
        }
    }
  }
)
```

## Usage with MongoDB ?
```ts
  // Your mongo model
  import Restaurants from './model/Restaurants'
  // await because contains async codes
  const v = await Validator.make({
    data: request.body,
    rules: {
      name: 'required',
      price: 'greater_than:0',
      restaurant: 'required|exists:Restaurants'
    },
    models: {
      Restaurants: {
        exists (filters) {
          return new Promise((resolve, reject) => {
            Restaurant.find(filters)
            .then(restaurants => resolve(restaurants.length > 0))
            .catch(error => reject(error))
          })
        }
      }
    }
  })

```
### With repository pattern
If you're implementing the repository pattern then you will most likely have something like this
```ts
  // Your mongo model
  import Restaurant from './model/Restaurant'
  class RestaurantRepository {
    // ... 
    static exists (filters) {
      return new Promise((resolve, reject) => {
        Restaurant.find(filters)
        .then(restaurants => resolve(restaurants.length > 0))
        .catch(error => reject(error))
      })
    }
  }
```
```ts
  import RestaurantRepository from './model/RestaurantRepository'
  // await because contains async codes
  const v = await Validator.make({
    data: requrest.body,
    rules: {
      name: 'required',
      price: 'greater_than:0',
      restaurant: 'required|exists:Restaurants'
    },
    models: {
      Restaurants: RestaurantRepository
    }
  })
```

I also wrote about the repository pattern: [insert:devto link]


## TODO
- support customer message like 
```js
const message = { email: { required: 'Your email is required if you wish like to use this app' } }
```
- make it work with commonJS by transpiling (babel or something)
- implement rules from https://github.com/laravel/docs/blob/7.x/validation.md#available-validation-rules


## Contribute
Feel free to fork, use and contribute as you want.
