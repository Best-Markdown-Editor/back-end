import { addFile, editFile, deleteFile, publishFile } from "./Files";
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
  // getFolders,
};

export default Mutation;
