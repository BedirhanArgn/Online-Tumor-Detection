const doctor = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('doctor', {
    name_surname: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    tckn: {
      type: DataTypes.STRING(11),
      unique: true,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
  }, {
    timestamps: false
  });

};

export default doctor;
