# Express-crud

## 起步

- 初始化 
- 模块管理

## 路由设计

| 请求方法 |     请求路径      | get 参数 | post 参数 | 备注 |
|--------|------------------|---------|------------|-----|
| GET    | /students        | get 参数 |            | 渲染首页 |
| GET    | /students/new    | get 参数 |            | 渲染添加学生信息页面 |
| POST   | /students/post   |         | name，age，hobbies, gender | 处理输入学生信息页面 |
| GET    | /students/edit   | id      |            | 渲染编辑页面 |
| POST   | /students/edit   |         | id, name，age，hobbies, gender  | 处理编辑请求 |
| GET    | /students/delete | id      |            | 渲染首页 |


凡事要得到一个函数中的异步操作的结果，必须通过回调函数来获取！

```js

```
