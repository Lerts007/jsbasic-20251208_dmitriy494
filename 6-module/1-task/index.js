/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    console.log(this.rows);
    this.render();
  }

  render() {
    this.elem = document.createElement("table");

    const thead = document.createElement("thead");
    thead.innerHTML = `<tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>`;
    this.elem.append(thead);

    const tbody = document.createElement("tbody");
    this.rows.forEach((el, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `<tr>
          <td>${el.name}</td>
          <td>${el.age}</td>
          <td>${el.salary}</td>
          <td>${el.city}</td>
          <td><button data-id="${index}" >X</button></td>
        </tr>`;
      // Обработчик удаления строки
      tr.querySelector("button").addEventListener("click", () => {
        tr.remove();
      });

      tbody.append(tr);
    });

    this.elem.append(tbody);
  }
}
