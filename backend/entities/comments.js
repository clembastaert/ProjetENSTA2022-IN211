import typeorm from 'typeorm';

const Comments = new typeorm.EntitySchema({
  name: 'Comments',
  columns: {
    id: { primary: true, generated: 'uuid', type: String },
    username: { type: String },
    description: { type: String },
    id_film: { type: String },
    mark: { type: Number },
  },
});

export default Comments;
