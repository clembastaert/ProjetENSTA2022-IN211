import typeorm from 'typeorm';

const Comments = new typeorm.EntitySchema({
  name: 'Comments',
  columns: {
    username: { type: String, primary: true },
    description: { type: String },
    id_film: { type: String, primary: true },
    mark: { type: Number },
  },
});

export default Comments;
