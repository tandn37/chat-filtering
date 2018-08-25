module.exports = {
  //filePath: 'assets\\badwords.csv',
  filePath: 'assets\\full-list-of-bad-words_csv-file.csv',
  server: {
    port: 8080
  },
  mongo: {
    uri: 'mongodb://localhost/chat-filtering',
    database: 'user-bad-word-records'
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 0,
    prefix: 'chat:filtering:'
  }
}