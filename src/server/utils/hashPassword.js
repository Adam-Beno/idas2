import bcrypt from 'bcryptjs';

export default password => bcrypt.hashSync(password, process.env.SALT);
