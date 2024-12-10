import mongoose, { Document, Schema } from "mongoose";

export interface ISnippet extends Document {
  snippetName: string;
  category: string;
  codeSnippet: string;
  keywords: string[];
  isPublic: boolean;
  createdBy: string;
  userName: string;
  userImage: string;
  likes: string[];
  createdAt: Date;
}

const snippetSchema: Schema = new Schema(
  {
    snippetName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
    },
    codeSnippet: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],
      default: [],
      required: true,
    },
    isPublic: {
      type: Boolean,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Snippet =
  mongoose.models.Snippet || mongoose.model<ISnippet>("Snippet", snippetSchema);

export default Snippet;
