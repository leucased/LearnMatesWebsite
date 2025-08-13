const { Sequelize } = require('sequelize');

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

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ PostgreSQL Connected: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'learnmates'}`);
    
    // Sync database dựa trên môi trường
    if (process.env.NODE_ENV === 'development') {
      // Development: Reset và tạo lại bảng (xóa dữ liệu cũ)
      await sequelize.sync({ force: true });
      console.log('🔄 Database reset and synchronized (Development mode)');
    } else {
      // Production: Chỉ tạo bảng mới, không thay đổi bảng hiện có
      await sequelize.sync();
      console.log('🔄 Database synchronized (Production mode)');
    }
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('🔄 Shutting down gracefully...');
      await sequelize.close();
      console.log('🔄 Database connection closed through app termination');
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      console.log('🔄 Shutting down gracefully...');
      await sequelize.close();
      console.log('🔄 Database connection closed through app termination');
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Error connecting to PostgreSQL:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };