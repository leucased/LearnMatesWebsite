const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'learnmates',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'Ptdt0307@',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  }
);

// Object để lưu trữ models
const db = {};

// Function để load tất cả models
const loadModels = () => {
  const modelsPath = path.join(__dirname, '../models');
  
  // Kiểm tra xem thư mục models có tồn tại không
  if (!fs.existsSync(modelsPath)) {
    console.log('📁 Models directory not found');
    return db;
  }

  // Đọc tất cả files trong thư mục models
  fs.readdirSync(modelsPath)
    .filter(file => {
      return (file.indexOf('.') !== 0) && 
             (file !== 'index.js') && 
             (file.slice(-3) === '.js');
    })
    .forEach(file => {
      try {
        const model = require(path.join(modelsPath, file));
        if (model && model.name) {
          db[model.name] = model;
          console.log(`📋 Model loaded: ${model.name} from ${file}`);
        }
      } catch (error) {
        console.error(`❌ Error loading model from ${file}:`, error.message);
      }
    });

  // Thiết lập associations
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
      console.log(`🔗 Associations set for ${modelName}`);
    }
  });

  // Thêm sequelize instance vào db object
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};

const connectDB = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log(`✅ PostgreSQL Connected: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'learnmates'}`);
    
    // Load all models
    console.log('📋 Loading models...');
    const models = loadModels();
    console.log(`📋 Loaded ${Object.keys(models).length - 2} models`);
    
    // ⚠️ KHÔNG BAO GIỜ DÙNG FORCE: TRUE
    // Chỉ tạo bảng mới nếu chưa tồn tại
    const syncOptions = {
      force: false,  // KHÔNG BAO GIỜ XÓA BẢNG
      alter: false   // KHÔNG THAY ĐỔI CẤU TRÚC
    };
    
    console.log(`🔄 Syncing database safely...`);
    await sequelize.sync(syncOptions);
    console.log('✅ Database synchronized safely (only new tables created)');

    // Log các bảng hiện có
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log('📋 Current tables:', tables);
    
    return models;
    
  } catch (error) {
    console.error('❌ Error connecting to PostgreSQL:', error.message);
    console.error('❌ Full error:', error);
    process.exit(1);
  }
};

// Setup graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Shutting down gracefully...');
  try {
    await sequelize.close();
    console.log('🔄 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  console.log('🔄 Shutting down gracefully...');
  try {
    await sequelize.close();
    console.log('🔄 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
});

module.exports = { sequelize, connectDB, loadModels };