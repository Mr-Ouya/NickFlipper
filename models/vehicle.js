

module.exports = function (sequelize, DataTypes) {

  var Vehicle = sequelize.define("vehicle", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true

    },

    make: {
      type: DataTypes.STRING,
      null: false
    },
    model: {
      type: DataTypes.STRING,
      null: false
    },
    price: {
      type: DataTypes.FLOAT(8),
      null: false
    },
    description: {

      type: DataTypes.TEXT,
    },

    modelYear: {
      type: DataTypes.INTEGER(4),
      null: false
    },
    img: {
      type: DataTypes.BLOB,

    },
    kilometers: {
      type: DataTypes.INTEGER(255),
    }



  });

  return Vehicle;


};


