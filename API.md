查看 Cloudflare 账号请求量概览

- 方法：`GET`
- 路径：`/api/cloudflare-usage/summary`
- 用途：给官网展示当前 Cloudflare 账号请求量的大致负载情况
- 数据来源：后端每半小时刷新一次的 Cloudflare 账号请求量缓存；调用本接口时不会实时请求 Cloudflare

成功返回：

```json
{
  "distribution": [
    {
      "range": "0到1万",
      "percentage": 12.5
    },
    {
      "range": "1万到2万",
      "percentage": 18.75
    },
    {
      "range": "2万到3万",
      "percentage": 20.0
    },
    {
      "range": "3万到4万",
      "percentage": 10.0
    },
    {
      "range": "4万到5万",
      "percentage": 8.75
    },
    {
      "range": "5万到6万",
      "percentage": 7.5
    },
    {
      "range": "6万到7万",
      "percentage": 6.25
    },
    {
      "range": "7万到8万",
      "percentage": 5.0
    },
    {
      "range": "8万到9万",
      "percentage": 3.75
    },
    {
      "range": "9万到10万",
      "percentage": 2.5
    },
    {
      "range": "10万+",
      "percentage": 5.0
    }
  ],
  "average_usage": 38500.25
}
```

字段说明：

- `distribution`：请求量区间占比数组
- `distribution[].range`：请求量区间
- `distribution[].percentage`：处于该区间的账号数量占全部已同步账号数量的百分比，单位是 `%`
- `average_usage`：当前已同步账号的平均请求量

区间规则：

- `0到1万` 表示 `[0, 10000)`
- `1万到2万` 表示 `[10000, 20000)`
- 以此类推
- `10万+` 表示 `>= 100000`

如果后端还没有同步到 Cloudflare 用量数据，会返回所有区间 `percentage = 0.0`，并且 `average_usage = 0.0`。

常见错误：

```json
{
  "detail": "Server internal error"
}
```

---