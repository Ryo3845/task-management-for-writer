"use strict"

{
  const weekItems = ["日", "月", "火", "水", "木", "金", "土"]
  const transactionYear = document.getElementById("transaction-year");
  const transactionMonth = document.getElementById("transaction-month");
  const indicateBtn = document.getElementById("indicate-btn");
  const settingDate = document.getElementById("setting-date");
  const transactionTable = document.getElementById("transaction-table");


  //初期ページの作成
  function initialPage() {
    for (let i = 1; i <= 31; i++) {
      const newRow = transactionTable.insertRow();
      const MonthCell = newRow.insertCell(0);
      const numberOfDeliveryCell = newRow.insertCell(1);
      const earinigsCell = newRow.insertCell(2);
    }
  }

  //取引月のドロップダウンリストに取引月を自動で追加
  function createTransactionMonth() {
    transactionMonth.innerHTML = "";

    for (let i = 1; i <= 12; i++) {
      const options = document.createElement("option");
      options.value = i;
      options.textContent = `${transactionYear.value}年${i}月`;
      transactionMonth.appendChild(options);
    }
  }

  //売上一覧（日別）のタイトル生成
  function createTitileOfEarnigTable() {
    settingDate.textContent = `${transactionYear.value}年${transactionMonth.value}月`
  }

  //ドロップダウンリストで選択した年に該当する売上表データを取得し、自動で表を作成
  function createEarnigTableData() {
    const SelectedYear = transactionYear.value;
    const SelectedMonth = transactionMonth.value - 1;
    const getLastDay = new Date(SelectedYear, SelectedMonth + 1, 0).getDate();

    while (transactionTable.rows.length > 1) {
      transactionTable.deleteRow(1);
    }

    for (let i = 1; i <= getLastDay; i++) {
      const newRow = transactionTable.insertRow();
      const MonthCell = newRow.insertCell(0);
      const numberOfDeliveryCell = newRow.insertCell(1);
      const earinigsCell = newRow.insertCell(2);

      const dayOfWeeek = new Date(SelectedYear, SelectedMonth, i).getDay();

      switch (dayOfWeeek) {
        case 0:
          MonthCell.innerHTML = `${i}日（<span style="color: red;">${weekItems[dayOfWeeek]}</span>）`;
          break;
        case 6:
          MonthCell.innerHTML = `${i}日（<span style="color: blue;">${weekItems[dayOfWeeek]}</span>）`;
          break;
        default:
          MonthCell.textContent = `${i}日（${weekItems[dayOfWeeek]}）`;
          break;
      }

      numberOfDeliveryCell.textContent = "10件";
      earinigsCell.textContent = "10,000円";
    }
  }

  //ページが読み込まれたときに、初期値に設定
  document.addEventListener("DOMContentLoaded", () => {
    initialPage();
    createTransactionMonth()
  });

  transactionYear.addEventListener("change", () => {
    createTransactionMonth();
  });

  //「表示する」ボタンを押した時に、表が自動で生成される
  indicateBtn.addEventListener("click", () => {
    createEarnigTableData();
    createTitileOfEarnigTable();
  });


}
