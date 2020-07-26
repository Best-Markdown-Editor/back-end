import {
  addFile,
  editFile,
  deleteFile,
  publishFile,
  unPublishFile,
} from "./Files";
import { login, editUser, subUser, unSubUser } from "./Users";
import { addFolder, editFolder, deleteFolder, addPubToFolder } from "./Folders";

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
  addFolder,
  editFolder,
  deleteFolder,
  addPubToFolder,
};

export default Mutation;
