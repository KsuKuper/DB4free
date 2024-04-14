describe("connect to test db", () => {
  it("connect to the db and create a table", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE user (user_id INT PRIMARY KEY AUTO_INCREMENT, first_name VARCHAR(50), last_name VARCHAR(50), age INT)"
    );
  });

  it("insert users to user's table", () => {
    cy.task(
      "queryDb",
      `INSERT INTO user (first_name, last_name, age) VALUES
      ('Имя1', 'Фамилия1', 25),
      ('Имя2', 'Фамилия2', 30),
      ('Имя3', 'Фамилия3', 28),
      ('Имя4', 'Фамилия4', 35);`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(4);
    });
  });

  it("update user's age", () => {
    cy.task("queryDb", "UPDATE user SET age = 40 WHERE user_id = 1;");
  });

  it("add fifth user to user's table", () => {
    cy.task(
      "queryDb",
      `INSERT INTO user (first_name, last_name, age) VALUES
    ('Имя5', 'Фамилия5', 40);`
    );
  });

  it("verify data in the database", () => {
    cy.task("queryDb", "SELECT * FROM user;").then((result) => {
      cy.log(JSON.stringify(result));
      const expectedData = [
        { user_id: 1, first_name: "Имя1", last_name: "Фамилия1", age: 40 },
        { user_id: 2, first_name: "Имя2", last_name: "Фамилия2", age: 30 },
        { user_id: 3, first_name: "Имя3", last_name: "Фамилия3", age: 28 },
        { user_id: 4, first_name: "Имя4", last_name: "Фамилия4", age: 35 },
        { user_id: 5, first_name: "Имя5", last_name: "Фамилия5", age: 40 },
      ];
      expect(result.length).to.equal(expectedData.length);
    });
  });

  it("delete table's db", () => {
    cy.task("queryDb", "DROP TABLE user");
  });
});
