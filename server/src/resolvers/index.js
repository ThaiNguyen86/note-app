import fakeData from "../fakeData/index.js";
import FolderModel from "../models/folderModel.js";
import { authResolvers } from "./authResolvers.js";

export const resolvers = {
  Query: {
    folders: async () => {
      const folders = await FolderModel.find();
      return folders;
    },
    folder: (parent, args) => {
      const folderId = args.folderId;
      return fakeData.folders.find((folder) => folder.id === folderId);
    },
    note: (parent, args) => {
      const noteId = args.noteId;
      return fakeData.notes.find((note) => note.id === noteId);
    }
  },
  Folder: {
    author: (parent, args) => {
      console.log({ parent, args });
      const authorId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authorId);
    },
    notes: (parent, args) => {
      return fakeData.notes.filter((note) => note.folderId === parent.id);
    }
  },
  Mutation: {
    ...authResolvers.Mutation,
    addFolder: async (parent, args) => {
      const newFolder = new FolderModel(...args, { authorId: "123" });
      console.log({ newFolder });
      await newFolder.save();
      return newFolder;
    }
  }
};