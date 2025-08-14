const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const net = require('net');
const { exec } = require('child_process');
require('dotenv').config();

const { connectDB } = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: '*',
  credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'LearnMates API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Utility Functions
const isPortFree = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(true); // Port trống
      });
      server.close();
    });
    
    server.on('error', () => {
      resolve(false); // Port đã được sử dụng
    });
  });
};

const findAvailablePort = async (startPort = 5000) => {
  let port = startPort;
  
  while (port < startPort + 100) { // Tìm trong range 100 ports
    if (await isPortFree(port)) {
      return port;
    }
    port++;
  }
  
  throw new Error('Không tìm thấy port trống trong range 5000-5099');
};

const killProcessOnPort = async (port) => {
  return new Promise((resolve) => {
    // Windows
    if (process.platform === 'win32') {
      exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
        if (stdout) {
          const lines = stdout.split('\n');
          const pids = lines
            .filter(line => line.includes('LISTENING'))
            .map(line => line.trim().split(/\s+/).pop())
            .filter(pid => pid && pid !== '0');
          
          if (pids.length > 0) {
            exec(`taskkill /PID ${pids[0]} /F`, () => {
              console.log(`🔄 Đã dừng process cũ trên port ${port}`);
              setTimeout(resolve, 1000); // Đợi 1s để port được giải phóng
            });
          } else {
            resolve();
          }
        } else {
          resolve();
        }
      });
    } else {
      // macOS/Linux
      exec(`lsof -ti :${port}`, (error, stdout) => {
        if (stdout) {
          const pid = stdout.trim();
          exec(`kill -9 ${pid}`, () => {
            console.log(`🔄 Đã dừng process cũ trên port ${port}`);
            setTimeout(resolve, 1000);
          });
        } else {
          resolve();
        }
      });
    }
  });
};

const startListening = (port) => {
  const server = app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
    console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${port}/api/health`);
  });

  // Graceful shutdown
  const gracefulShutdown = async (signal) => {
    console.log(`\n🔄 Nhận signal ${signal}, đang tắt server...`);
    
    server.close(() => {
      console.log('🔄 HTTP server đã đóng');
      
      // Đóng database connection
      const { sequelize } = require('./config/database');
      sequelize.close().then(() => {
        console.log('🔄 Database connection đã đóng');
        process.exit(0);
      });
    });

    // Force close sau 10 giây
    setTimeout(() => {
      console.error('⚠️  Force shutdown sau 10 giây');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  return server;
};

// Main Server Startup Function
const startServer = async () => {
  try {
    // Kết nối database trước
    await connectDB();
    
    const preferredPort = parseInt(process.env.PORT) || 5000;
    
    // Kiểm tra port ưa thích có trống không
    if (await isPortFree(preferredPort)) {
      // Port trống, sử dụng luôn
      startListening(preferredPort);
    } else {
      console.log(`⚠️  Port ${preferredPort} đang được sử dụng`);
      
      // Kiểm tra có auto kill không
      if (process.env.AUTO_KILL === 'true') {
        console.log(`🔄 Đang dừng process cũ trên port ${preferredPort}...`);
        await killProcessOnPort(preferredPort);
        startListening(preferredPort);
      } else {
        // Tìm port trống khác
        console.log('🔍 Đang tìm port trống...');
        const availablePort = await findAvailablePort(preferredPort + 1);
        console.log(`✅ Tìm thấy port trống: ${availablePort}`);
        startListening(availablePort);
      }
    }
  } catch (error) {
    console.error('❌ Lỗi khởi động server:', error.message);
    process.exit(1);
  }
};

// Chỉ start server nếu file này được chạy trực tiếp
if (require.main === module) {
  startServer();
}

module.exports = app;