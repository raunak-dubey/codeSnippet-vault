import { HydratedDocument, model, Schema, Types } from 'mongoose';

export interface ISnippet {
  userId: Types.ObjectId;
  title: string;
  code: string;
  programmingLanguage: string;
  description?: string;
  tags?: string[];
  visibility: 'private' | 'public';
}

export type SnippetDocument = HydratedDocument<ISnippet>;

const snippetSchema = new Schema<ISnippet>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: String,

    code: {
      type: String,
      required: true,
    },

    programmingLanguage: {
      type: String,
      required: true,
    },

    tags: [String],

    visibility: {
      type: String,
      enum: ['private', 'public'],
      default: 'private',
    },
  },
  { timestamps: true, versionKey: false },
);

snippetSchema.index({ title: 'text', code: 'text' });
snippetSchema.index({ programmingLanguage: 'text' });

const snippetModel = model<ISnippet>('Snippet', snippetSchema);
export default snippetModel;
