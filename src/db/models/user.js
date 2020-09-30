module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNULL: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNULL: false
    }
  }, {
    tableName: 'users',
    timestamps: false
  })

  User.associate = function (models) {
    User.hasMany(models.Note, {
      foreignKey: 'id',
      as: 'notes'
    })
  }
  return User
}
