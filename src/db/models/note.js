module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING(1024)
    },
    author_id: {
      type: DataTypes.INTEGER,
      onDelete: 'cascade',
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'notes',
    timestamps: true
  })

  Note.associate = (models) => {
    Note.belongsTo(models.User, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    })
  }
  return Note
}
