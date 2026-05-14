import { Problem } from "@/types";

const EMPLOYEE_SCHEMA = `
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  salary INTEGER NOT NULL,
  hire_date DATE NOT NULL
);

INSERT INTO employees (name, department, salary, hire_date) VALUES
  ('田中 太郎', 'エンジニア', 75000, '2020-04-01'),
  ('鈴木 花子', '営業', 55000, '2019-07-15'),
  ('佐藤 一郎', 'エンジニア', 82000, '2018-01-10'),
  ('山田 美咲', 'マーケティング', 62000, '2021-03-20'),
  ('伊藤 健太', '営業', 58000, '2020-10-05'),
  ('渡辺 恵子', 'エンジニア', 91000, '2017-06-30'),
  ('中村 拓也', 'マーケティング', 67000, '2022-01-15'),
  ('小林 さくら', '人事', 52000, '2023-04-01');
`;

const ORDER_SCHEMA = `
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  product TEXT NOT NULL,
  amount INTEGER NOT NULL,
  order_date DATE NOT NULL
);

INSERT INTO customers (name, email) VALUES
  ('東京商事', 'tokyo@example.com'),
  ('大阪物産', 'osaka@example.com'),
  ('名古屋工業', 'nagoya@example.com'),
  ('福岡商店', 'fukuoka@example.com');

INSERT INTO orders (customer_id, product, amount, order_date) VALUES
  (1, 'ノートPC', 120000, '2024-01-15'),
  (1, 'マウス', 3500, '2024-02-20'),
  (2, 'キーボード', 8000, '2024-01-10'),
  (2, 'モニター', 45000, '2024-03-05'),
  (3, 'ノートPC', 130000, '2024-02-01'),
  (4, 'ヘッドセット', 12000, '2024-03-15'),
  (4, 'ウェブカメラ', 9000, '2024-03-20');
`;

const PRODUCT_SCHEMA = `
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL
);

CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  sale_date DATE NOT NULL
);

INSERT INTO products (name, category, price) VALUES
  ('ノートPC',       'PC機器',  120000),
  ('デスクトップPC', 'PC機器',   85000),
  ('モニター',       'PC機器',   45000),
  ('SSD',            'PC機器',   18000),
  ('マウス',         '周辺機器',  3500),
  ('キーボード',     '周辺機器',  8000),
  ('ヘッドセット',   '周辺機器', 12000),
  ('ウェブカメラ',   '周辺機器',  9000);

INSERT INTO sales (product_id, quantity, sale_date) VALUES
  (1, 3, '2024-01-15'),
  (2, 2, '2024-01-20'),
  (5,10, '2024-01-25'),
  (1, 2, '2024-02-10'),
  (3, 5, '2024-02-14'),
  (6, 8, '2024-02-20'),
  (7, 4, '2024-02-28'),
  (1, 4, '2024-03-05'),
  (4, 6, '2024-03-12'),
  (5,15, '2024-03-18'),
  (8, 7, '2024-03-22'),
  (2, 3, '2024-04-08'),
  (3, 4, '2024-04-15'),
  (6,12, '2024-04-20'),
  (1, 5, '2024-05-03'),
  (7, 6, '2024-05-15'),
  (4, 8, '2024-05-20'),
  (5,20, '2024-06-10'),
  (3, 3, '2024-06-18'),
  (8, 9, '2024-06-25');
`;

export const problems: Problem[] = [
  // ── EASY ────────────────────────────────────────────────────────────────
  {
    id: "p01",
    title: "従業員の名前と部署を取得",
    description: `\`employees\` テーブルから、すべての従業員の名前と部署を取得してください。

### テーブル: employees
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 従業員ID |
| name | TEXT | 氏名 |
| department | TEXT | 部署 |
| salary | INTEGER | 給与 |
| hire_date | DATE | 入社日 |`,
    difficulty: "easy",
    schema: EMPLOYEE_SCHEMA,
    solution: "SELECT name, department FROM employees;",
    hints: ["SELECT で取得したいカラムを指定します", "複数のカラムはカンマ区切りで指定します"],
  },
  {
    id: "p02",
    title: "給与60,000円以上の従業員",
    description: `\`employees\` テーブルから、給与が 60,000円以上 の従業員を全カラム取得してください。

### テーブル: employees
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 従業員ID |
| name | TEXT | 氏名 |
| department | TEXT | 部署 |
| salary | INTEGER | 給与 |
| hire_date | DATE | 入社日 |`,
    difficulty: "easy",
    schema: EMPLOYEE_SCHEMA,
    solution: "SELECT * FROM employees WHERE salary >= 60000;",
    hints: ["WHERE 句で条件を指定します", "以上は >= を使います"],
  },
  {
    id: "p03",
    title: "給与が高い上位3人",
    description: `\`employees\` テーブルから、給与の高い順に上位3人の名前と給与を取得してください。

### テーブル: employees
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 従業員ID |
| name | TEXT | 氏名 |
| department | TEXT | 部署 |
| salary | INTEGER | 給与 |
| hire_date | DATE | 入社日 |`,
    difficulty: "easy",
    schema: EMPLOYEE_SCHEMA,
    solution: "SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 3;",
    hints: ["ORDER BY で並び替えができます", "DESC で降順になります", "LIMIT で件数を絞れます"],
    ordered: true,
  },
  {
    id: "p04",
    title: "部署ごとの従業員数",
    description: `\`employees\` テーブルから、部署ごとの従業員数を求めてください。
結果のカラム名は \`department\`、\`count\` とすること。

### テーブル: employees
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 従業員ID |
| name | TEXT | 氏名 |
| department | TEXT | 部署 |
| salary | INTEGER | 給与 |
| hire_date | DATE | 入社日 |`,
    difficulty: "easy",
    schema: EMPLOYEE_SCHEMA,
    solution: "SELECT department, COUNT(*) AS count FROM employees GROUP BY department;",
    hints: ["GROUP BY で部署ごとにまとめます", "COUNT(*) で件数を数えられます", "AS で別名をつけます"],
  },

  // ── MEDIUM ───────────────────────────────────────────────────────────────
  {
    id: "p05",
    title: "顧客と注文商品のJOIN",
    description: `どの顧客がどの商品を注文したか、顧客名と商品名の一覧を取得してください。

### テーブル: customers
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 顧客ID |
| name | TEXT | 顧客名 |
| email | TEXT | メールアドレス |

### テーブル: orders
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 注文ID |
| customer_id | INTEGER | 顧客ID (FK) |
| product | TEXT | 商品名 |
| amount | INTEGER | 金額 |
| order_date | DATE | 注文日 |`,
    difficulty: "medium",
    schema: ORDER_SCHEMA,
    solution: "SELECT c.name, o.product FROM customers c JOIN orders o ON c.id = o.customer_id;",
    hints: ["JOIN でテーブルを結合します", "ON で結合条件を指定します", "テーブルに別名 (c, o) をつけると楽になります"],
  },
  {
    id: "p06",
    title: "顧客ごとの注文合計金額",
    description: `顧客ごとの注文合計金額を求め、顧客名の昇順で表示してください。
合計金額のカラム名は \`total\` とすること。

### テーブル: customers
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 顧客ID |
| name | TEXT | 顧客名 |
| email | TEXT | メールアドレス |

### テーブル: orders
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 注文ID |
| customer_id | INTEGER | 顧客ID (FK) |
| product | TEXT | 商品名 |
| amount | INTEGER | 金額 |
| order_date | DATE | 注文日 |`,
    difficulty: "medium",
    schema: ORDER_SCHEMA,
    solution:
      "SELECT c.name, SUM(o.amount) AS total FROM customers c JOIN orders o ON c.id = o.customer_id GROUP BY c.name ORDER BY c.name;",
    hints: ["JOIN + GROUP BY を組み合わせます", "SUM() で合計を計算できます"],
    ordered: true,
  },
  {
    id: "p07",
    title: "平均給与より高い従業員",
    description: `全従業員の平均給与を上回る給与をもらっている従業員の名前と給与を取得してください。

### テーブル: employees
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 従業員ID |
| name | TEXT | 氏名 |
| department | TEXT | 部署 |
| salary | INTEGER | 給与 |
| hire_date | DATE | 入社日 |`,
    difficulty: "medium",
    schema: EMPLOYEE_SCHEMA,
    solution: "SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
    hints: ["WHERE の条件にサブクエリが使えます", "AVG() で平均値を計算できます"],
  },
  {
    id: "p08",
    title: "部署内給与ランキング",
    description: `各従業員の名前・部署・給与と、部署内での給与順位（\`rank\`）を表示してください。
同じ給与には同じ順位を付け、次の順位は詰めないこと。

### テーブル: employees
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 従業員ID |
| name | TEXT | 氏名 |
| department | TEXT | 部署 |
| salary | INTEGER | 給与 |
| hire_date | DATE | 入社日 |`,
    difficulty: "hard",
    schema: EMPLOYEE_SCHEMA,
    solution:
      "SELECT name, department, salary, RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank FROM employees;",
    hints: [
      "RANK() ウィンドウ関数を使います",
      "OVER (PARTITION BY department ORDER BY salary DESC) で部署ごとに順位付けします",
    ],
  },
  {
    id: "p09",
    title: "CASE WHEN で給与レベルを分類",
    description: `各従業員の名前・給与と、給与水準を示す \`level\` を給与の高い順に表示してください。

- 80,000以上 → 高
- 60,000以上 → 中
- それ未満 → 低

### テーブル: employees
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 従業員ID |
| name | TEXT | 氏名 |
| department | TEXT | 部署 |
| salary | INTEGER | 給与 |
| hire_date | DATE | 入社日 |`,
    difficulty: "medium",
    schema: EMPLOYEE_SCHEMA,
    solution:
      "SELECT name, salary, CASE WHEN salary >= 80000 THEN '高' WHEN salary >= 60000 THEN '中' ELSE '低' END AS level FROM employees ORDER BY salary DESC;",
    hints: [
      "CASE WHEN 条件 THEN 値 WHEN ... ELSE 値 END の構文を使います",
      "条件は上から順に評価されます",
    ],
    ordered: true,
  },
  {
    id: "p10",
    title: "平均給与65,000円以上の部署",
    description: `平均給与が65,000円以上の部署と、その平均給与（\`avg_salary\`、整数値）を求めてください。
平均給与の高い順に並べること。

### テーブル: employees
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 従業員ID |
| name | TEXT | 氏名 |
| department | TEXT | 部署 |
| salary | INTEGER | 給与 |
| hire_date | DATE | 入社日 |`,
    difficulty: "medium",
    schema: EMPLOYEE_SCHEMA,
    solution:
      "SELECT department, ROUND(AVG(salary)) AS avg_salary FROM employees GROUP BY department HAVING AVG(salary) >= 65000 ORDER BY avg_salary DESC;",
    hints: [
      "GROUP BY でグループ化した後に HAVING で集計条件を絞れます",
      "WHERE は集計前のフィルタ、HAVING は集計後のフィルタです",
      "ROUND() で整数に丸められます",
    ],
    ordered: true,
  },
  {
    id: "p11",
    title: "一度も注文していない顧客",
    description: `一度も注文実績のない顧客の名前を取得してください。

### テーブル: customers
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 顧客ID |
| name | TEXT | 顧客名 |
| email | TEXT | メールアドレス |

### テーブル: orders
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 注文ID |
| customer_id | INTEGER | 顧客ID (FK) |
| product | TEXT | 商品名 |
| amount | INTEGER | 金額 |
| order_date | DATE | 注文日 |`,
    difficulty: "medium",
    schema: ORDER_SCHEMA,
    solution:
      "SELECT c.name FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.id IS NULL;",
    hints: [
      "LEFT JOIN は右テーブルに一致しない行も残します",
      "注文がない顧客は orders 側が NULL になります",
      "WHERE o.id IS NULL で一致しない行だけ抽出できます",
    ],
  },
  {
    id: "p12",
    title: "2件以上注文した顧客",
    description: `2回以上注文している顧客の名前と注文件数を求めてください。
注文件数のカラム名は \`order_count\` とすること。

### テーブル: customers
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 顧客ID |
| name | TEXT | 顧客名 |
| email | TEXT | メールアドレス |

### テーブル: orders
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 注文ID |
| customer_id | INTEGER | 顧客ID (FK) |
| product | TEXT | 商品名 |
| amount | INTEGER | 金額 |
| order_date | DATE | 注文日 |`,
    difficulty: "medium",
    schema: ORDER_SCHEMA,
    solution:
      "SELECT c.name, COUNT(o.id) AS order_count FROM customers c JOIN orders o ON c.id = o.customer_id GROUP BY c.name HAVING COUNT(o.id) >= 2;",
    hints: [
      "JOIN して GROUP BY でまとめます",
      "HAVING で集計後の件数に条件を付けられます",
      "COUNT(o.id) で注文件数を数えます",
    ],
  },
  {
    id: "p13",
    title: "カテゴリ別売上合計",
    description: `カテゴリ別の売上合計金額（\`total\`）を求め、金額の高い順に表示してください。

### テーブル: products
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 商品ID |
| name | TEXT | 商品名 |
| category | TEXT | カテゴリ |
| price | INTEGER | 単価 |

### テーブル: sales
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 売上ID |
| product_id | INTEGER | 商品ID (FK) |
| quantity | INTEGER | 数量 |
| sale_date | DATE | 売上日 |`,
    difficulty: "medium",
    schema: PRODUCT_SCHEMA,
    solution:
      "SELECT p.category, SUM(p.price * s.quantity) AS total FROM products p JOIN sales s ON p.id = s.product_id GROUP BY p.category ORDER BY total DESC;",
    hints: [
      "price と quantity を掛け算して売上金額を出します",
      "SUM() で合計を集計します",
      "GROUP BY category でカテゴリごとにまとめます",
    ],
    ordered: true,
  },
  {
    id: "p14",
    title: "月別売上合計",
    description: `月ごとの売上合計金額を求め、月の昇順で表示してください。
月は数値で表し、カラム名は \`month\`、\`total\` とすること。

### テーブル: products
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 商品ID |
| name | TEXT | 商品名 |
| category | TEXT | カテゴリ |
| price | INTEGER | 単価 |

### テーブル: sales
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 売上ID |
| product_id | INTEGER | 商品ID (FK) |
| quantity | INTEGER | 数量 |
| sale_date | DATE | 売上日 |`,
    difficulty: "medium",
    schema: PRODUCT_SCHEMA,
    solution:
      "SELECT EXTRACT(MONTH FROM s.sale_date)::INTEGER AS month, SUM(p.price * s.quantity) AS total FROM sales s JOIN products p ON s.product_id = p.id GROUP BY month ORDER BY month;",
    hints: [
      "EXTRACT(MONTH FROM date) で月番号を取り出せます",
      "::INTEGER でキャストできます",
      "GROUP BY month で月ごとにまとめます",
    ],
    ordered: true,
  },
  {
    id: "p15",
    title: "WITH句（CTE）で部署平均と全体平均を比較",
    description: `部署ごとの平均給与を集計し、全体平均を上回っている部署の名前と平均給与（\`avg_salary\`、整数値）を表示してください。

### テーブル: employees
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 従業員ID |
| name | TEXT | 氏名 |
| department | TEXT | 部署 |
| salary | INTEGER | 給与 |
| hire_date | DATE | 入社日 |`,
    difficulty: "medium",
    schema: EMPLOYEE_SCHEMA,
    solution: `WITH dept_avg AS (
  SELECT department, AVG(salary) AS avg_salary
  FROM employees
  GROUP BY department
)
SELECT department, ROUND(avg_salary) AS avg_salary
FROM dept_avg
WHERE avg_salary > (SELECT AVG(salary) FROM employees);`,
    hints: [
      "WITH cte_name AS (SELECT ...) の構文でCTEを定義します",
      "CTE の結果は通常のテーブルと同じように使えます",
      "全体平均はサブクエリで求めます",
    ],
  },

  // ── HARD ─────────────────────────────────────────────────────────────────
  {
    id: "p16",
    title: "DENSE_RANK で給与順位",
    description: `全従業員の名前・給与と、給与の高い順の順位（\`rank\`）を表示してください。
同じ給与には同じ順位を付け、次の順位は詰めること。

### テーブル: employees
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 従業員ID |
| name | TEXT | 氏名 |
| department | TEXT | 部署 |
| salary | INTEGER | 給与 |
| hire_date | DATE | 入社日 |`,
    difficulty: "hard",
    schema: EMPLOYEE_SCHEMA,
    solution:
      "SELECT name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rank FROM employees;",
    hints: [
      "DENSE_RANK() は同順位があっても次の順位をスキップしません（RANK は2位が2人なら次は4位になる）",
      "OVER (ORDER BY salary DESC) で給与降順の順位になります",
    ],
  },
  {
    id: "p17",
    title: "ROW_NUMBER で部署内入社順",
    description: `部署ごとに入社日の早い順で連番（\`entry_order\`）を付け、名前・部署・入社日とともに表示してください。
連番は各部署で1から始まること。

### テーブル: employees
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 従業員ID |
| name | TEXT | 氏名 |
| department | TEXT | 部署 |
| salary | INTEGER | 給与 |
| hire_date | DATE | 入社日 |`,
    difficulty: "hard",
    schema: EMPLOYEE_SCHEMA,
    solution:
      "SELECT name, department, hire_date, ROW_NUMBER() OVER (PARTITION BY department ORDER BY hire_date) AS entry_order FROM employees;",
    hints: [
      "ROW_NUMBER() は同じ値でも必ず異なる連番を振ります",
      "PARTITION BY department で部署ごとにリセットされます",
      "ORDER BY hire_date で入社日の早い順に番号が振られます",
    ],
  },
  {
    id: "p18",
    title: "SUM OVER で累積売上",
    description: `売上日・取引金額（\`amount\`）・その時点までの累積売上合計（\`cumulative\`）を、売上日の昇順で表示してください。

### テーブル: products
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 商品ID |
| name | TEXT | 商品名 |
| category | TEXT | カテゴリ |
| price | INTEGER | 単価 |

### テーブル: sales
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 売上ID |
| product_id | INTEGER | 商品ID (FK) |
| quantity | INTEGER | 数量 |
| sale_date | DATE | 売上日 |`,
    difficulty: "hard",
    schema: PRODUCT_SCHEMA,
    solution: `SELECT
  s.sale_date,
  p.price * s.quantity AS amount,
  SUM(p.price * s.quantity) OVER (ORDER BY s.sale_date) AS cumulative
FROM sales s
JOIN products p ON s.product_id = p.id
ORDER BY s.sale_date;`,
    hints: [
      "SUM() OVER (ORDER BY ...) で累積合計が計算できます",
      "OVER 句に ORDER BY を指定すると「その行まで」の合計になります",
      "ウィンドウ関数はSELECT句で使い、GROUP BY は不要です",
    ],
    ordered: true,
  },
  {
    id: "p19",
    title: "LAG で前月比を計算",
    description: `月ごとの売上合計（\`total\`）と前月からの差額（\`diff\`）を、月の昇順（\`month\` は数値）で表示してください。
最初の月の差額は NULL で構いません。

### テーブル: products
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 商品ID |
| name | TEXT | 商品名 |
| category | TEXT | カテゴリ |
| price | INTEGER | 単価 |

### テーブル: sales
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 売上ID |
| product_id | INTEGER | 商品ID (FK) |
| quantity | INTEGER | 数量 |
| sale_date | DATE | 売上日 |`,
    difficulty: "hard",
    schema: PRODUCT_SCHEMA,
    solution: `WITH monthly AS (
  SELECT
    EXTRACT(MONTH FROM s.sale_date)::INTEGER AS month,
    SUM(p.price * s.quantity) AS total
  FROM sales s
  JOIN products p ON s.product_id = p.id
  GROUP BY month
)
SELECT
  month,
  total,
  total - LAG(total) OVER (ORDER BY month) AS diff
FROM monthly
ORDER BY month;`,
    hints: [
      "LAG(col) OVER (ORDER BY ...) で1行前の値を取得できます",
      "WITH 句で月別集計を作ってから LAG を適用するとシンプルになります",
      "最初の行の LAG は NULL を返します",
    ],
    ordered: true,
  },
  {
    id: "p20",
    title: "CTE で部署最高給与の従業員を抽出",
    description: `各部署で最も高い給与をもらっている従業員を全員取得し、名前・部署・給与を部署名の昇順で表示してください。
同給与が複数人いる場合はすべて含めること。

### テーブル: employees
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 従業員ID |
| name | TEXT | 氏名 |
| department | TEXT | 部署 |
| salary | INTEGER | 給与 |
| hire_date | DATE | 入社日 |`,
    difficulty: "hard",
    schema: EMPLOYEE_SCHEMA,
    solution: `WITH dept_max AS (
  SELECT department, MAX(salary) AS max_salary
  FROM employees
  GROUP BY department
)
SELECT e.name, e.department, e.salary
FROM employees e
JOIN dept_max dm ON e.department = dm.department AND e.salary = dm.max_salary
ORDER BY e.department;`,
    hints: [
      "WITH 句で部署ごとの MAX(salary) を先に求めます",
      "元テーブルと CTE を JOIN して、給与が最高値と一致する行を抽出します",
      "複数人が最高給与の場合もすべて出力されます",
    ],
    ordered: true,
  },
];
