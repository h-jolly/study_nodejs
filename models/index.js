const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config(); // config 읽기
const { DATABASE, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const config = {
  host: DB_HOST,
  dialect: 'mysql',
  //   dialectOptions: {
  //     charset: 'utf8',
  //   },
  timezone: '+09:00', // 한국시간 셋팅
  operatorsAliases: Sequelize.Op,
  pool: {
    min: 5,
    max: 0,
    idle: 10000,
  },
  // logging: false
};

const sequelize = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, config);

let db = [];

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.js') && file !== 'index.js')
  .forEach((file) => {
    //  테이블을 생성해주는 명령어
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  // 모델들 관계도, 참조키 자동 생성
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
