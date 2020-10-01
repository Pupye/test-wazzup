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
    }
  }, {
    tableName: 'notes',
    timestamps: true
  })

  Note.associate = (models) => {
    Note.belongsTo(models.User, {
      foreignKey: 'authorId',
      targetKey: 'id',
      onDelete: 'cascade'
    })
  }
  return Note
}
