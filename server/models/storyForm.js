const storyForm = (sequelize, DataTypes) => {
  const StoryForm = sequelize.define('storyform', {
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
    share_confirm: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    question_answers: {
      type: DataTypes.STRING,
      allowNull: true
    },
    trueness_confirm: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    sent_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    patientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'patients', //tablo adı 
        key: 'id'
      }
    },
  }, {
    timestamps: false
  });
};

export default storyForm;
