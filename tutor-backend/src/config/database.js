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
    
    // Chỉ sync theo điều kiện cụ thể - MẶC ĐỊNH KHÔNG SYNC
    const shouldSync = process.env.DB_SYNC === 'true';
    const syncMode = process.env.DB_SYNC_MODE || 'safe';
    
    if (shouldSync) {
      console.log(`🔄 Database sync enabled - Mode: ${syncMode}`);
      
      switch (syncMode) {
        case 'force':
          // XÓA VÀ TẠO LẠI TẤT CẢ BẢNG (MẤT DỮ LIỆU)
          console.log('⚠️  WARNING: FORCE MODE sẽ xóa toàn bộ dữ liệu!');
          await sequelize.sync({ force: true });
          console.log('🔄 Database reset and synchronized (FORCE MODE - DỮ LIỆU ĐÃ BỊ XÓA)');
          break;
          
        case 'alter':
          // THAY ĐỔI CẤU TRÚC BẢNG ĐỂ KHỚP VỚI MODEL
          console.log('🔧 ALTER MODE: Đang cập nhật cấu trúc bảng...');
          await sequelize.sync({ alter: true });
          console.log('🔄 Database synchronized (ALTER MODE - Cấu trúc đã được cập nhật)');
          break;
          
        case 'safe':
        default:
          // CHỈ TẠO BẢNG MỚI, KHÔNG THAY ĐỔI BẢNG HIỆN CÓ
          await sequelize.sync();
          console.log('🔄 Database synchronized (SAFE MODE - Chỉ tạo bảng mới)');
          break;
      }
    } else {
      console.log('📋 Database connection established (NO SYNC - Dữ liệu được bảo toàn)');
    }
    
  } catch (error) {
    console.error('❌ Error connecting to PostgreSQL:', error.message);
    throw error;
  }
};

module.exports = { sequelize, connectDB };