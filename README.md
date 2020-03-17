# Form validator for web application or API
If you're building application with ExpressJs and MongoDB then this is definitely something you need to check out.
This is a validation tool that you can use in your every day life as 
The following is also applicable to the whole javascript ecosystem in general

## Summary
- Validation rules
  * custom validation rule
- Usage with Express/MongoDB
  * with repository pattern 
- Usage in general


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
- min_length

## Usage with express 
```ts
import Validator from 'form-validator'

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
    first_name: 'required|min_length:3',
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
  // Your mongo model
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


## Contribute
Feel free to fork, use and contribute as you want.
