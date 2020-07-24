import {
  addFile,
  editFile,
  deleteFile,
  publishFile,
  unPublishFile,
} from "./Files";
import { login, editUser, subUser, unSubUser } from "./Users";
// import { getFolders } from "./Folders";

const Mutation = {
  login,
  editUser,
  addFile,
  editFile,
  deleteFile,
  publishFile,
  subUser,
  unSubUser,
  unPublishFile,
};

export default Mutation;
