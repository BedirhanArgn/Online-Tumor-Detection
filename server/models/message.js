const message = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    message: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    patientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'patients', //tablo adı 
        key: 'id'
      }
    },
    doctorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'doctors', //tablo adı 
        key: 'id'
      }
    },
    sender: {
      type: DataTypes.STRING,
      unique: false
    }
  }, {
    timestamps: false
  });

};

export default message;
