import { Schema, model } from "mongoose";

interface IUser {
  first_name: String;
  last_name: String;
  email: String;
  password: String | any;
  status: Boolean;
}

const UserSchema = new Schema<IUser>({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

const User = model("user", UserSchema);
export default User;
