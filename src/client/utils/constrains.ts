export const constraints = {
    email: {
      presence: {
        allowEmpty: false,
        message: "^Please enter an email address"
      },
      email: {
        message: "^Please enter a valid email address"
      }
    },
    password: {
        presence: true,
        length: {
            minimum: 6
        }
    },
    firstname: {
        presence: true,
        length: {
            minimum: 4
        }
    },
    lastname: {
        presence: true,
        length: {
            minimum: 4
        }
    }
  };
  
  export default constraints;