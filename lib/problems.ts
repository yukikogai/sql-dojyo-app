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
  ('田中 太郎',   'エンジニア',     75000, '2020-04-01'),
  ('鈴木 花子',   '営業',           55000, '2019-07-15'),
  ('佐藤 一郎',   'エンジニア',     82000, '2018-01-10'),
  ('山田 美咲',   'マーケティング', 62000, '2021-03-20'),
  ('伊藤 健太',   '営業',           58000, '2020-10-05'),
  ('渡辺 恵子',   'エンジニア',     91000, '2017-06-30'),
  ('中村 拓也',   'マーケティング', 67000, '2022-01-15'),
  ('小林 さくら', '人事',           52000, '2023-04-01'),
  ('加藤 誠',     'エンジニア',     88000, '2016-09-01'),
  ('吉田 裕子',   '営業',           61000, '2018-05-20'),
  ('佐々木 修',   'マーケティング', 71000, '2019-11-10'),
  ('高橋 めぐみ', '人事',           59000, '2021-08-15'),
  ('松本 健',     '営業',           48000, '2022-03-01'),
  ('井上 奈々',   'エンジニア',     79000, '2023-01-20'),
  ('木村 大輔',   'マーケティング', 68000, '2022-07-01'),
  ('林 美穂',     '人事',           63000, '2020-02-14');
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
  ('東京商事',   'tokyo@example.com'),
  ('大阪物産',   'osaka@example.com'),
  ('名古屋工業', 'nagoya@example.com'),
  ('福岡商店',   'fukuoka@example.com'),
  ('広島産業',   'hiroshima@example.com'),
  ('札幌通商',   'sapporo@example.com'),
  ('仙台商事',   'sendai@example.com');

INSERT INTO orders (customer_id, product, amount, order_date) VALUES
  (1, 'ノートPC',      120000, '2024-01-15'),
  (1, 'マウス',          3500, '2024-02-20'),
  (1, 'モニター',       45000, '2024-04-20'),
  (2, 'キーボード',      8000, '2024-01-10'),
  (2, 'モニター',       45000, '2024-03-05'),
  (2, 'ヘッドセット',   12000, '2024-05-10'),
  (3, 'ノートPC',      130000, '2024-02-01'),
  (3, 'キーボード',      8000, '2024-04-10'),
  (4, 'ヘッドセット',   12000, '2024-03-15'),
  (4, 'ウェブカメラ',    9000, '2024-03-20'),
  (5, 'デスクトップPC', 95000, '2024-01-25'),
  (5, 'SSD',            18000, '2024-02-15');
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
  ('ウェブカメラ',   '周辺機器',  9000),
  ('タブレット',     'PC機器',   68000),
  ('スピーカー',     '周辺機器', 15000);

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
  (8, 9, '2024-06-25'),
  (1, 2, '2024-07-08'),
  (5,18, '2024-07-15'),
  (9, 3, '2024-07-20'),
  (2, 2, '2024-07-28'),
  (3, 4, '2024-08-05'),
  (6,10, '2024-08-12'),
  (10, 5, '2024-08-20'),
  (1, 3, '2024-08-28'),
  (4, 7, '2024-09-05'),
  (7, 6, '2024-09-12'),
  (5,20, '2024-09-18'),
  (9, 4, '2024-09-25'),
  (2, 4, '2024-10-08'),
  (3, 5, '2024-10-15'),
  (8,10, '2024-10-22'),
  (1, 4, '2024-10-28'),
  (6,15, '2024-11-05'),
  (4,10, '2024-11-12'),
  (10, 8, '2024-11-18'),
  (5,25, '2024-11-25'),
  (1, 5, '2024-12-05'),
  (9, 6, '2024-12-10'),
  (7, 7, '2024-12-15'),
  (2, 3, '2024-12-22');
`;

const ORG_SCHEMA = `
CREATE TABLE org (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  manager_id INTEGER REFERENCES org(id)
);

INSERT INTO org VALUES
  (1,  '山本 隆',    '代表取締役',     NULL),
  (2,  '田中 太郎',  '技術部長',       1),
  (3,  '鈴木 次郎',  '営業部長',       1),
  (4,  '佐藤 三郎',  'エンジニア課長', 2),
  (5,  '伊藤 四郎',  'インフラ課長',   2),
  (6,  '渡辺 五郎',  '第1営業課長',   3),
  (7,  '中村 六郎',  '第2営業課長',   3),
  (8,  '小林 七郎',  'エンジニア',     4),
  (9,  '加藤 八郎',  'エンジニア',     4),
  (10, '吉田 九郎',  'エンジニア',     5),
  (11, '佐々木 十',  '営業担当',       6),
  (12, '高橋 一一',  '営業担当',       6),
  (13, '松本 一二',  '営業担当',       7);
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

  // ── MEDIUM (追加) ─────────────────────────────────────────────────────────
  {
    id: "p21",
    title: "注文実績のある顧客を EXISTS で取得",
    description: `1件以上注文したことがある顧客の名前を名前の昇順で取得してください。

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
    solution: "SELECT name FROM customers c WHERE EXISTS (SELECT 1 FROM orders WHERE customer_id = c.id) ORDER BY name;",
    hints: [
      "EXISTS (サブクエリ) はサブクエリが1行以上返すとき TRUE になります",
      "サブクエリで SELECT 1 と書くのが慣例です",
      "外側クエリのカラムをサブクエリ内で参照できます（相関サブクエリ）",
    ],
    ordered: true,
  },
  {
    id: "p22",
    title: "部署ごとのメンバーリスト（STRING_AGG）",
    description: `部署ごとに所属する従業員名をカンマ区切りで連結した一覧（\`members\`）を、部署名の昇順で表示してください。
名前は昇順で並べること。

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
    solution: "SELECT department, STRING_AGG(name, ', ' ORDER BY name) AS members FROM employees GROUP BY department ORDER BY department;",
    hints: [
      "STRING_AGG(カラム, 区切り文字) で文字列を連結できます",
      "STRING_AGG の中でも ORDER BY が使えます",
    ],
    ordered: true,
  },
  {
    id: "p23",
    title: "FILTER で給与レベル別人数を集計",
    description: `部署ごとに以下の条件で従業員数を集計し、部署名の昇順で表示してください。
- \`high\`: 給与 80,000円以上
- \`mid\`: 給与 60,000円以上 80,000円未満
- \`low\`: 給与 60,000円未満

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
      "SELECT department, COUNT(*) FILTER (WHERE salary >= 80000) AS high, COUNT(*) FILTER (WHERE salary >= 60000 AND salary < 80000) AS mid, COUNT(*) FILTER (WHERE salary < 60000) AS low FROM employees GROUP BY department ORDER BY department;",
    hints: [
      "COUNT(*) FILTER (WHERE 条件) で条件を満たす行だけカウントできます",
      "FILTER 句は集計関数に続けて書きます",
    ],
    ordered: true,
  },
  {
    id: "p24",
    title: "部署別給与統計（最高・最低・平均）",
    description: `部署ごとに最高給与（\`max_salary\`）・最低給与（\`min_salary\`）・平均給与（\`avg_salary\`、整数値）を求め、平均給与の高い順に表示してください。

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
      "SELECT department, MAX(salary) AS max_salary, MIN(salary) AS min_salary, ROUND(AVG(salary)) AS avg_salary FROM employees GROUP BY department ORDER BY avg_salary DESC;",
    hints: [
      "MAX()・MIN()・AVG() は同じ SELECT に並べて書けます",
      "ORDER BY には集計した別名カラムも使えます",
    ],
    ordered: true,
  },

  // ── HARD (追加) ──────────────────────────────────────────────────────────
  {
    id: "p25",
    title: "LEAD で翌月売上・差額を表示",
    description: `月ごとの売上合計（\`total\`）と翌月の売上合計（\`next_total\`）、その差額（\`diff\`）を月の昇順（\`month\` は数値）で表示してください。
最終月の \`next_total\` と \`diff\` は NULL で構いません。

### テーブル: products / sales（PRODUCT_SCHEMA）`,
    difficulty: "hard",
    schema: PRODUCT_SCHEMA,
    solution: `WITH monthly AS (
  SELECT EXTRACT(MONTH FROM s.sale_date)::INTEGER AS month,
    SUM(p.price * s.quantity) AS total
  FROM sales s JOIN products p ON s.product_id = p.id
  GROUP BY month
)
SELECT month, total,
  LEAD(total) OVER (ORDER BY month) AS next_total,
  LEAD(total) OVER (ORDER BY month) - total AS diff
FROM monthly
ORDER BY month;`,
    hints: [
      "LEAD(col) OVER (ORDER BY ...) で1行後の値を取得できます",
      "WITH 句で月別集計を先に作ると見やすくなります",
      "最後の行の LEAD は NULL を返します",
    ],
    ordered: true,
  },
  {
    id: "p26",
    title: "NTILE で給与四分位数",
    description: `全従業員の名前・給与と、給与を昇順に並べたときの四分位グループ（\`quartile\`、1〜4）を表示してください。
給与の昇順で並べること。

### テーブル: employees`,
    difficulty: "hard",
    schema: EMPLOYEE_SCHEMA,
    solution:
      "SELECT name, salary, NTILE(4) OVER (ORDER BY salary) AS quartile FROM employees ORDER BY salary;",
    hints: [
      "NTILE(n) OVER (ORDER BY ...) で行をn等分したグループ番号を振ります",
      "グループ番号は1から始まります",
    ],
    ordered: true,
  },
  {
    id: "p27",
    title: "FIRST_VALUE で部署内最高給与者名を付加",
    description: `全従業員の名前・部署・給与と、その従業員が所属する部署の最高給与者の名前（\`top_earner\`）を表示してください。
部署名・給与の降順で並べること。

### テーブル: employees`,
    difficulty: "hard",
    schema: EMPLOYEE_SCHEMA,
    solution:
      "SELECT name, department, salary, FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC) AS top_earner FROM employees ORDER BY department, salary DESC;",
    hints: [
      "FIRST_VALUE(col) OVER (PARTITION BY ... ORDER BY ...) でウィンドウ内の先頭行の値を取得できます",
      "ORDER BY salary DESC にすると最高給与者が先頭になります",
    ],
    ordered: true,
  },
  {
    id: "p28",
    title: "PERCENT_RANK で給与パーセンタイル",
    description: `全従業員の名前・給与と、給与の昇順パーセンタイル（\`percentile\`、0〜100の整数）を表示してください。
給与の昇順で並べること。

### テーブル: employees`,
    difficulty: "hard",
    schema: EMPLOYEE_SCHEMA,
    solution:
      "SELECT name, salary, ROUND(PERCENT_RANK() OVER (ORDER BY salary) * 100)::INTEGER AS percentile FROM employees ORDER BY salary;",
    hints: [
      "PERCENT_RANK() OVER (ORDER BY ...) は 0.0〜1.0 の値を返します",
      "100倍して ROUND()::INTEGER で整数パーセントにします",
    ],
    ordered: true,
  },
  {
    id: "p29",
    title: "再帰 CTE で部下を全員取得",
    description: `技術部長（id = 2）の直属・間接を含むすべての部下の名前・役職・階層の深さ（\`depth\`）を取得してください。
技術部長自身の depth は 1 とし、depth・名前の昇順で表示すること。

### テーブル: org
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 社員ID |
| name | TEXT | 氏名 |
| title | TEXT | 役職 |
| manager_id | INTEGER | 上司ID (FK) |`,
    difficulty: "hard",
    schema: ORG_SCHEMA,
    solution: `WITH RECURSIVE subordinates AS (
  SELECT id, name, title, 1 AS depth
  FROM org WHERE id = 2
  UNION ALL
  SELECT o.id, o.name, o.title, s.depth + 1
  FROM org o
  JOIN subordinates s ON o.manager_id = s.id
)
SELECT name, title, depth FROM subordinates ORDER BY depth, name;`,
    hints: [
      "WITH RECURSIVE cte AS (基底クエリ UNION ALL 再帰クエリ) の構文を使います",
      "基底クエリ: 起点となる行を SELECT",
      "再帰クエリ: CTE に JOIN して深さを +1 しながら展開します",
    ],
    ordered: true,
  },
  {
    id: "p30",
    title: "ROWS BETWEEN で3ヶ月移動平均",
    description: `月ごとの売上合計（\`total\`）と、当月を含む直近3ヶ月の移動平均（\`moving_avg_3m\`、整数値）を月の昇順で表示してください。

### テーブル: products / sales（PRODUCT_SCHEMA）`,
    difficulty: "hard",
    schema: PRODUCT_SCHEMA,
    solution: `WITH monthly AS (
  SELECT EXTRACT(MONTH FROM s.sale_date)::INTEGER AS month,
    SUM(p.price * s.quantity) AS total
  FROM sales s JOIN products p ON s.product_id = p.id
  GROUP BY month
)
SELECT month, total,
  ROUND(AVG(total) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)) AS moving_avg_3m
FROM monthly
ORDER BY month;`,
    hints: [
      "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW で「現在行を含む3行」を指定します",
      "AVG() OVER (...) でウィンドウ内の平均を計算できます",
    ],
    ordered: true,
  },
  {
    id: "p31",
    title: "EXCEPT で注文なし顧客を取得",
    description: `一度も注文していない顧客の名前を取得してください。
EXCEPT を使って解いてください。名前の昇順で表示すること。

### テーブル: customers / orders（ORDER_SCHEMA）`,
    difficulty: "hard",
    schema: ORDER_SCHEMA,
    solution: `SELECT name FROM customers
EXCEPT
SELECT DISTINCT c.name FROM customers c JOIN orders o ON c.id = o.customer_id
ORDER BY name;`,
    hints: [
      "EXCEPT は左クエリから右クエリの結果を除いた差集合を返します",
      "左クエリ: 全顧客の name、右クエリ: 注文がある顧客の name",
    ],
    ordered: true,
  },
  {
    id: "p32",
    title: "複数 CTE：月別売上が商品平均を超える月を抽出",
    description: `各商品の月別売上合計を求め、その商品の全月平均を上回っている月だけを商品名・月・売上合計で表示してください。
商品名・月の昇順で並べること。

### テーブル: products / sales（PRODUCT_SCHEMA）`,
    difficulty: "hard",
    schema: PRODUCT_SCHEMA,
    solution: `WITH monthly_sales AS (
  SELECT p.name, EXTRACT(MONTH FROM s.sale_date)::INTEGER AS month,
    SUM(p.price * s.quantity) AS total
  FROM sales s JOIN products p ON s.product_id = p.id
  GROUP BY p.name, month
),
product_avg AS (
  SELECT name, AVG(total) AS avg_total FROM monthly_sales GROUP BY name
)
SELECT ms.name, ms.month, ms.total
FROM monthly_sales ms
JOIN product_avg pa ON ms.name = pa.name
WHERE ms.total > pa.avg_total
ORDER BY ms.name, ms.month;`,
    hints: [
      "1つ目の CTE で商品・月別の売上合計を計算します",
      "2つ目の CTE でその商品の全月平均を計算します",
      "2つの CTE を JOIN して WHERE で絞り込みます",
    ],
    ordered: true,
  },
  {
    id: "p33",
    title: "自己 JOIN で同入社年の従業員ペアを取得",
    description: `同じ年に入社した従業員のペア（\`emp1\`・\`emp2\`）と入社年（\`hire_year\`）を取得してください。
同一人物のペアや重複（A-B と B-A）は除き、hire_year・emp1 の昇順で表示すること。

### テーブル: employees`,
    difficulty: "hard",
    schema: EMPLOYEE_SCHEMA,
    solution: `SELECT e1.name AS emp1, e2.name AS emp2,
  EXTRACT(YEAR FROM e1.hire_date)::INTEGER AS hire_year
FROM employees e1
JOIN employees e2
  ON EXTRACT(YEAR FROM e1.hire_date) = EXTRACT(YEAR FROM e2.hire_date)
  AND e1.id < e2.id
ORDER BY hire_year, emp1;`,
    hints: [
      "同じテーブルを e1・e2 と別名で JOIN します",
      "e1.id < e2.id とすることで重複ペアを排除できます",
      "EXTRACT(YEAR FROM date) で入社年を取り出します",
    ],
    ordered: true,
  },
  {
    id: "p34",
    title: "相関サブクエリで各顧客の最新注文を取得",
    description: `注文実績がある顧客ごとに、最も新しい注文の顧客名・商品名・注文日を取得してください。
顧客名の昇順で表示すること。

### テーブル: customers / orders（ORDER_SCHEMA）`,
    difficulty: "hard",
    schema: ORDER_SCHEMA,
    solution: `SELECT c.name, o.product, o.order_date
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.order_date = (
  SELECT MAX(order_date) FROM orders WHERE customer_id = c.id
)
ORDER BY c.name;`,
    hints: [
      "WHERE の条件にサブクエリを使い、外側のクエリのカラムを参照できます（相関サブクエリ）",
      "MAX(order_date) で顧客ごとの最新日付を求めます",
    ],
    ordered: true,
  },
  {
    id: "p35",
    title: "CUME_DIST で商品売上の累積分布",
    description: `全期間での商品別売上合計（\`total_sales\`）と、売上の低い方からの累積分布（\`cume_dist_pct\`、0〜100の整数）を表示してください。
売上合計の昇順で並べること。

### テーブル: products / sales（PRODUCT_SCHEMA）`,
    difficulty: "hard",
    schema: PRODUCT_SCHEMA,
    solution: `WITH product_sales AS (
  SELECT p.name, SUM(p.price * s.quantity) AS total_sales
  FROM products p JOIN sales s ON p.id = s.product_id
  GROUP BY p.name
)
SELECT name, total_sales,
  ROUND(CUME_DIST() OVER (ORDER BY total_sales) * 100)::INTEGER AS cume_dist_pct
FROM product_sales
ORDER BY total_sales;`,
    hints: [
      "CUME_DIST() OVER (ORDER BY ...) は 0より大きく1以下の値を返します",
      "100倍して整数にすることでパーセンテージになります",
      "ウィンドウ関数はグループ化した後の結果に使えないため CTE で先に集計します",
    ],
    ordered: true,
  },
  {
    id: "p36",
    title: "再帰 CTE で組織ツリーのパスを生成",
    description: `全社員の名前・役職・階層の深さ（\`depth\`、代表取締役=0）と、ルートからのパス（\`path\`、例: \`山本 隆 > 田中 太郎 > 佐藤 三郎\`）を表示してください。
path の昇順で並べること。

### テーブル: org
| カラム | 型 | 説明 |
|--------|-----|------|
| id | INTEGER | 社員ID |
| name | TEXT | 氏名 |
| title | TEXT | 役職 |
| manager_id | INTEGER | 上司ID (FK) |`,
    difficulty: "hard",
    schema: ORG_SCHEMA,
    solution: `WITH RECURSIVE hierarchy AS (
  SELECT id, name, title, 0 AS depth, name::TEXT AS path
  FROM org WHERE manager_id IS NULL
  UNION ALL
  SELECT o.id, o.name, o.title, h.depth + 1,
    h.path || ' > ' || o.name
  FROM org o
  JOIN hierarchy h ON o.manager_id = h.id
)
SELECT name, title, depth, path FROM hierarchy ORDER BY path;`,
    hints: [
      "基底クエリは manager_id IS NULL（ルート）の行から始めます",
      "path カラムを || 演算子で連結しながら再帰します",
      "depth は再帰のたびに +1 します",
    ],
    ordered: true,
  },
  {
    id: "p37",
    title: "LATERAL JOIN で顧客ごとの最新注文を取得",
    description: `注文実績がある顧客ごとに、最も新しい注文の顧客名・商品名・金額・注文日を取得してください。
顧客名の昇順で表示すること。LATERAL を使って解いてください。

### テーブル: customers / orders（ORDER_SCHEMA）`,
    difficulty: "hard",
    schema: ORDER_SCHEMA,
    solution: `SELECT c.name, latest.product, latest.amount, latest.order_date
FROM customers c
JOIN LATERAL (
  SELECT product, amount, order_date
  FROM orders
  WHERE customer_id = c.id
  ORDER BY order_date DESC
  LIMIT 1
) AS latest ON true
ORDER BY c.name;`,
    hints: [
      "JOIN LATERAL (サブクエリ) AS alias ON true で横方向の結合ができます",
      "LATERAL 内のサブクエリは外側のテーブルのカラムを参照できます",
      "ORDER BY ... LIMIT 1 で最新1件だけ取得します",
    ],
    ordered: true,
  },
  {
    id: "p38",
    title: "PERCENTILE_CONT で部署別給与中央値",
    description: `部署ごとの給与中央値（\`median_salary\`、整数値）を部署名の昇順で表示してください。

### テーブル: employees`,
    difficulty: "hard",
    schema: EMPLOYEE_SCHEMA,
    solution: `SELECT department,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary)::INTEGER AS median_salary
FROM employees
GROUP BY department
ORDER BY department;`,
    hints: [
      "PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY col) で中央値（50パーセンタイル）を求められます",
      "::INTEGER でキャストして整数にします",
    ],
    ordered: true,
  },
  {
    id: "p39",
    title: "月別・カテゴリ別売上ランキング",
    description: `月ごと・カテゴリごとの売上合計（\`total\`）と、その月内でのカテゴリ売上順位（\`rank\`）を月・順位の昇順で表示してください。

### テーブル: products / sales（PRODUCT_SCHEMA）`,
    difficulty: "hard",
    schema: PRODUCT_SCHEMA,
    solution: `WITH monthly_category AS (
  SELECT EXTRACT(MONTH FROM s.sale_date)::INTEGER AS month,
    p.category,
    SUM(p.price * s.quantity) AS total
  FROM sales s JOIN products p ON s.product_id = p.id
  GROUP BY month, p.category
)
SELECT month, category, total,
  RANK() OVER (PARTITION BY month ORDER BY total DESC) AS rank
FROM monthly_category
ORDER BY month, rank;`,
    hints: [
      "CTE で月×カテゴリごとの売上を集計します",
      "RANK() OVER (PARTITION BY month ORDER BY total DESC) で月ごとにリセットされる順位が付きます",
    ],
    ordered: true,
  },
  {
    id: "p40",
    title: "複合 CTE：部署別の入社年度別採用数と累積採用数",
    description: `部署ごと・入社年ごとの採用人数（\`hired\`）と、その部署内での累積採用人数（\`cumulative_count\`）を部署名・入社年の昇順で表示してください。

### テーブル: employees`,
    difficulty: "hard",
    schema: EMPLOYEE_SCHEMA,
    solution: `WITH hire_stats AS (
  SELECT department,
    EXTRACT(YEAR FROM hire_date)::INTEGER AS hire_year,
    COUNT(*) AS hired
  FROM employees
  GROUP BY department, hire_year
)
SELECT department, hire_year, hired,
  SUM(hired) OVER (PARTITION BY department ORDER BY hire_year) AS cumulative_count
FROM hire_stats
ORDER BY department, hire_year;`,
    hints: [
      "CTE で部署×入社年ごとの件数を集計します",
      "SUM() OVER (PARTITION BY department ORDER BY hire_year) で部署ごとにリセットされる累積合計が計算できます",
    ],
    ordered: true,
  },
];
