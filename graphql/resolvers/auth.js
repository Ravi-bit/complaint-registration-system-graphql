import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user';

export default {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({
        $or: [
          { email: args.userInput.email },
          { identification_number: args.userInput.identification_number }
        ]
      });
      if (existingUser) {
        throw new Error('EmailId or Identification number is already exists.');
      }
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        
      let user_options = {
        name: args.userInput.name,
        identification_number: args.userInput.identification_number, 
        email: args.userInput.email,
        password: hashedPassword
      }

      if (args.userInput?.role && args.userInput.role === 'dean') {
          user_options = {...user_options, role: 'dean'} 
      }
      const user = new User(user_options);

      const result = await user.save();
        return {
            name: result._doc.name,
            _id: result.id,
            identification_number: result._doc.identification_number,
            email: result._doc.email
        };
    } catch (err) {
      throw err;
    }
  },
  
    login: async args => {
        let input_role = (args.logInput?.role &&
            args.logInput.role === 'student') ? 'student' : 'dean'

        const user = await User.findOne(
            {
                identification_number: args.logInput.identification_number,
                role: input_role
            }
        );
        if (!user) {
        throw new Error('Incorrect Account');
        }
        const isEqual = await bcrypt.compare( args.logInput.password, user.password);
        if (!isEqual) {
        throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                identification_number: user.identification_number,
                role: user.role
            },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1h'
        }
        );
        return { token };
  }
};