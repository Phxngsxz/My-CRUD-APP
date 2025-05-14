// src/database/database.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
      console.log('📦 Database initialized');
    }
  }

  async query(sql: string, params?: any[]) {
    return this.dataSource.query(sql, params);
  }

  getDataSource(): DataSource {
    return this.dataSource;
  }
}
