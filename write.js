const fs = require('fs');

// eslint-disable-next-line no-sequences
const data = '[{1: Что-то записать используя стандартный модуль fs},{2: Прочитать},{3: Записать текущий массив задач в файле},{3.1: Использую JSON.stringify записать данные в файл},    {4: На старте сервака прочитать данные из файла},{4.1: Используя JSON.parse распарсить строку и заменить текущий объект tasks на него}]';
JSON.stringify(data);
fs.writeFile('temp.txt', data, (err) => {
  if (err) console.log(err);
  console.log('Successfully Written to File.{a [');
});
