import Abstract from "./abstract.js";

const getRecordTemplate = (score, date) => {
  const liveDate = new Date(date);
  const day = addPad(liveDate.getDate());
  const month = addPad(liveDate.getMonth() + 1);
  const year = liveDate.getFullYear();
  const hour = addPad(liveDate.getHours());
  const minutes = addPad(liveDate.getMinutes());
  const formattedDate = `${day}.${month}.${year} at ${hour}:${minutes}`;

  return (
    `<tr><td>${score}</td><td>${formattedDate}</td></tr>`
  );
};

const getRecordsTemplate = (records = []) => {
  const recordsList = records.map((record) => {
    getRecordTemplate(record);
  });

  return (
    `<section class="modal__records">
      <h2 class="modal__title">The Game remembers!</h2>
      <div class="modal__table-box">
        <table class="modal__table-score">
          <thead>
            <tr>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>${recordsList}</tbody>
        </table>
      </div>
      <button class="btn modal__clear">Forget me!</button>
    </section>`
  );
}

export default class Records extends Abstract {
  constructor(records) {
    super();

    this.records = records;
  }

  getTemplate() {
    return getRecordsTemplate(this.records);
  }
}
